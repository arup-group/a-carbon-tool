<template>
  <v-main class="mr-7 ml-7 pb-4">
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
          <v-row class="d-flex align-stretch">
            <v-col
              v-for="item in props.items"
              :key="item.title"
              cols="12"
              md="6"
              lg="4"
              style="display: flex"
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
import {
  extractCo2Data,
  loadParent,
  getChildren,
  LoadStreamOut,
} from "../views/utils/viewAssessmentUtils";

import ProjectCard from "@/components/landing/ProjectCard.vue";
import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import LandingHeader from "@/components/landing/LandingHeader.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import LandingError from "@/components/landing/LandingError.vue";

import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import SESnackBar from "@/components/shared/SESnackBar.vue";
import { HTTPStreamDataParent } from "@/models/graphql/";
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
  carbonBranches: { id: string; name: string; branchid: string, mainBranchID: string | undefined;}[] = [];
  branchData: { id: string; name: string;  projectDate: string;  newMainAvailable: boolean; data: LoadStreamOut }[] = [];
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
      const streamID: { name: string; id: string; createdAt: string }[] =
        streams.data.user.streams.items.map((stream: any) => {
          return { name: stream.name, id: stream.id};
        });

      // get all of the branches that are on each stream
      const streamBranches: {
        branches: StreamReferenceBranches;
        stream: { id: string; name: string; createdAt: string };
      }[] = [];

      for (let i = 0; i < streamID.length; i++) {
        const branches: StreamReferenceBranches = await this.$store.dispatch(
          "getStreamBranches",
          streamID[i].id
        );
        streamBranches.push({ branches, stream: streamID[i] });
      }

      // filter those branches to only the "actcarbonreport" branches
      // add any stream in its entiry if it contains a branch called 'actcarbonreport'
      for (let i = 0; i < streamBranches.length; i++) {
        // go through all items on streamBranches
        streamBranches[i].branches.data.stream.branches.items.forEach(
          (branch) => {
            if (branch.name === "actcarbonreport") {
              const mainBranch = streamBranches[i].branches.data.stream.branches.items.find(element => element.name === 'main');
              this.carbonBranches.push({
                ...streamBranches[i].stream,
                branchid: branch.id,
                mainBranchID: mainBranch?.id,
              });
            }
          }
        );
      }

      // get the most recent commit and the data from that commit
      this.branchData = await Promise.all(
        this.carbonBranches.map(async (cb) => {

          const branchCommit = await this.$store.dispatch(
            "getStreamCommit",
            cb.id
          );

          const mainBranchCommits = await this.$store.dispatch(
            "getMainStreamCommit",
            cb.id
          );

          let carbonCommit = "";
          if (branchCommit.data.stream.branch) {
            carbonCommit =
              branchCommit.data.stream.branch.commits.items[0].referencedObject;
          }
          let latestMainCommitObj = "";
          if (mainBranchCommits.data.stream.branch) {
            latestMainCommitObj =
              mainBranchCommits.data.stream.branch.commits.items[0].referencedObject;
          }

          // Get data from the most recent arupcarbon branch
          const latestCarbonBranchData: StreamData = await this.$store.dispatch("getBranchData", [
            cb.id,
            carbonCommit,
          ]);

          const latestMainBranchData: StreamData = await this.$store.dispatch("getBranchData", [
            cb.id,
            latestMainCommitObj,
          ]);

          const latestCarbonBranchCommit = new Date(latestCarbonBranchData.data.stream.object.createdAt).getTime();
          const latestMainBranchCommit = new Date(latestMainBranchData.data.stream.object.createdAt).getTime();

          const parent = await loadParent(
            this.$store.state.selectedServer.url,
            cb.id,
            carbonCommit,
            this.$store.state.token.token
          );
          const data: LoadStreamOut = await this.$store.dispatch("loadActReportData", cb.id);


          return {
            id: cb.id,
            name: cb.name,
            data,
            projectDate: latestCarbonBranchData.data.stream.object.createdAt,
            newMainAvailable: latestMainBranchCommit > latestCarbonBranchCommit,
          };
        })
      );
      // convert the data into the format that this page needs it to be in
      this.projects = await Promise.all(
        this.branchData.map(async (proj) => {
          // const childrenData = await getChildren(
          //   this.$store.state.selectedServer.url,
          //   this.$store.state.token.token,
          //   proj.id,
          //   proj.data
          // );
          // const co2Data = extractCo2Data(proj.data, childrenData).materials;

        const projName = proj.data.data.projectInfo.name;
        console.log("data:", proj.data)
        return {
          title: `${projName} - ${proj.name}`,
          id: `${proj.id}`,
          co2Values: proj.data.data.materialBreakdown.materials,
          totalCO2e: proj.data.data.projectInfo.totalCO2e,
          link: "",
          category: proj.data.data.projectInfo.components,
          projectDate: proj.projectDate,
          newMainAvailable: proj.newMainAvailable,
        };
      }));
      console.log("this.projects:", this.projects);

      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
    }
  }
}
</script>
