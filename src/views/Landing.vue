<template>
  <v-main class="mr-7 ml-7">
    <landing-header />
    <v-container v-if="!loading && !error">
      <v-data-iterator
        :items="projectData"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar flat rounded outlined class="my-4">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:default="props" class="my-2">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.title"
              cols="12"
              md="6"
              lg="4"
            >
              <new-assessment-card v-if="item.title === 'New Assessment'" />
              <project-card
                v-else
                :project="item"
                @delete="checkDelete"
              ></project-card>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <landing-footer
            :numberOfPages="numberOfPages"
            :page="page"
            @formerPage="formerPage"
            @nextPage="nextPage"
          />
        </template>
      </v-data-iterator>
    </v-container>
    <div
      v-else-if="loading && !error"
      style="width: 100%"
      class="d-flex justify-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        :size="200"
      ></v-progress-circular>
    </div>
    <div v-else>
      <landing-error @retry="loadStreams" />
    </div>
    <confirm-dialog
      :dialog="dialog"
      @agree="agreeDelete"
      @cancel="cancelDelete"
      message="Are you sure you want to permanently delete this report for all users? This action is not reversible"
    />
    <SESnackBar
      @close="deleteSnackClose"
      :success="deleteSuccess"
      :model="deleteSnack"
      textError="Something went wrong, please retry"
      textSuccess="Report deleted!"
    />
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { Project } from "@/models/project";
import {
  StreamData,
  DeleteStreamData,
  StreamReferenceBranches,
} from "@/models/graphql";

import { DeleteBranchInput } from "@/store";
import { extractCo2Data } from "../views/utils/viewAssessmentUtils";

import ProjectCard from "@/components/landing/ProjectCard.vue";
import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import LandingHeader from "@/components/landing/LandingHeader.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import LandingError from "@/components/landing/LandingError.vue";

import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import SESnackBar from "@/components/shared/SESnackBar.vue";
@Component({
  components: {
    ProjectCard,
    NewAssessmentCard,
    LandingHeader,
    LandingFooter,
    LandingError,
    ConfirmDialog,
    SESnackBar,
  },
})
export default class Landing extends Vue {
  carbonBranches: { id: string; name: string; branchid: string }[] = [];
  branchData: { id: string; name: string; data: StreamData }[] = [];
  token = "";
  itemsPerPage = 8;
  search = "";
  page = 1;
  projects: Project[] = [];
  loading = true;
  error = false;
  dialog = false;
  deleteid = "";
  deleteSuccess = true;
  deleteSnack = false;

  async mounted() {
    this.token = this.$store.state.token.token;
    this.loadStreams();
  }

  get numberOfPages() {
    const items = this.projects.length;
    if (!items) return 1;
    return Math.ceil(items / this.itemsPerPage);
  }

  get projectData() {
    return [{ title: "New Assessment" }, ...this.projects];
  }

  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1;
  }

  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1;
  }

  checkDelete(streamid: string) {
    this.deleteid = streamid;
    this.dialog = true;
  }
  async agreeDelete() {
    this.dialog = false;
    const stream = this.carbonBranches.find((c) => c.id === this.deleteid);
    if (stream) {
      const input: DeleteBranchInput = {
        streamid: stream.id,
        branchid: stream.branchid,
      };
      try {
        const deleted: DeleteStreamData = await this.$store.dispatch(
          "deleteBranch",
          input
        );
        if (deleted.data.branchDelete) {
          this.deleteSuccess = true;
          this.deleteSnack = true;
          this.loadStreams();
        } else {
          this.deleteSuccess = false;
          this.deleteSnack = true;
        }
      } catch (err) {
        this.deleteSuccess = false;
        this.deleteSnack = true;
      }
    }
    return;
  }
  cancelDelete() {
    this.dialog = false;
    this.deleteid = "";
  }
  deleteSnackClose() {
    this.error = false;
    this.deleteSnack = false;
  }

  async loadStreams() {
    this.loading = true;
    this.error = false;
    this.projects = [];
    this.carbonBranches = [];
    this.branchData = [];
    try {
      // get all of the user's streams
      const streams = await this.$store.dispatch("getUserStreams");
      // format the streams into a more usable format
      const streamID: { name: string; id: string }[] =
        streams.data.user.streams.items.map((stream: any) => {
          return { name: stream.name, id: stream.id };
        });
      // get all of the branches that are on each stream
      const streamBranches: {
        branches: StreamReferenceBranches;
        stream: { id: string; name: string };
      }[] = [];
      for (let i = 0; i < streamID.length; i++) {
        const branches: StreamReferenceBranches = await this.$store.dispatch(
          "getStreamBranches",
          streamID[i].id
        );
        streamBranches.push({ branches, stream: streamID[i] });
      }
      // filter those branches to only the "actcarbonreport" branches
      for (let i = 0; i < streamBranches.length; i++) {
        streamBranches[i].branches.data.stream.branches.items.forEach(
          (branch) => {
            if (branch.name === "actcarbonreport") {
              this.carbonBranches.push({
                ...streamBranches[i].stream,
                branchid: branch.id,
              });
            }
          }
        );
      }
      // get the most recent commit and the data from that commit
      for (let i = 0; i < this.carbonBranches.length; i++) {
        const branchCommit = await this.$store.dispatch(
          "getStreamCommit",
          this.carbonBranches[i].id
        );
        var carbonCommit = "";
        if (branchCommit.data.stream.branch) {
          carbonCommit =
            branchCommit.data.stream.branch.commits.items[0].referencedObject;
        }
        const branch: StreamData = await this.$store.dispatch("getBranchData", [
          this.carbonBranches[i].id,
          carbonCommit,
        ]);
        if (!Object.prototype.hasOwnProperty.call(branch, "errors")) {
          this.branchData.push({
            id: this.carbonBranches[i].id,
            name: this.carbonBranches[i].name,
            data: branch,
          });
        }
      }
      // convert the data into the format that this page needs it to be in
      this.projects = this.branchData.map((proj) => {
        const co2Data = extractCo2Data(proj.data).materials;

        const projName = proj.data.data.stream.object.data.projectData.name;
        return {
          title: `${projName} - ${proj.name}`,
          id: `${proj.id}`,
          co2Values: co2Data,
          totalCO2e: proj.data.data.stream.object.data.totalCO2,
          link: "",
          category: `${proj.data.data.stream.object.data.projectData.component}`,
        };
      });

      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
    }
  }
}
</script>
