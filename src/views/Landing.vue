<template>
  <v-main class="page">
    <landing-header />
    <v-container v-if="!loading && !error">
      <v-data-iterator
        :items="displayProjects"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        hide-default-footer
      >
        <template v-slot:header>
          <landing-search :projects="projects" @projectSearch="projectSearch" />
        </template>
        <template v-slot:default="props" class="my-2">
          <v-row>
            <v-col cols="12" md="6" lg="4" v-if="page === 1">
              <new-assessment-card />
            </v-col>
            <v-col
              v-for="item in props.items"
              :key="item.id"
              cols="12"
              md="6"
              lg="4"
            >
              <project-card
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
      message="Are you sure you want to delete this report?"
    />
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Project } from "@/models/project";

import ProjectCard from "@/components/landing/ProjectCard.vue";
import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import LandingHeader from "@/components/landing/LandingHeader.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import LandingSearch from "@/components/landing/LandingSearch.vue";
import LandingError from "@/components/landing/LandingError.vue";
import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import {
  DeleteStreamData,
  StreamReferenceBranches,
  StreamReferenceObjects,
} from "@/models/graphql";
import { StreamData } from "@/models/graphql/StreamData.interface";
import { DeleteBranchInput } from "@/store";

@Component({
  components: {
    ProjectCard,
    NewAssessmentCard,
    LandingHeader,
    LandingFooter,
    LandingSearch,
    LandingError,
    ConfirmDialog,
  },
})
export default class Landing extends Vue {
  carbonBranches: { id: string; name: string; branchid: string }[] = [];
  branchData: { id: string; name: string; data: StreamData }[] = [];
  token = "";
  itemsPerPage = 8;
  search = "";
  page = 1;
  displayProjects: Project[] = [];
  projects: Project[] = [];
  loading = true;
  error = false;
  dialog = false;
  deleteid = "";

  async mounted() {
    this.token = this.$store.state.token.token;
    this.loadStreams();
  }

  get numberOfPages() {
    const items = this.projects.length;
    return Math.ceil(items / this.itemsPerPage);
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
    const stream = this.carbonBranches.find(c => c.id === this.deleteid);
    if (stream) {
      const input: DeleteBranchInput = {
        streamid: stream.id,
        branchid: stream.branchid
      }
      const deleted: DeleteStreamData = await this.$store.dispatch("deleteBranch", input);
      if (deleted.data.branchDelete) {
        this.loadStreams();
      } // else, TODO: ADD ERROR HANDLING
    }
    return;
  }
  cancelDelete() {
    this.dialog = false;
    this.deleteid = "";
  }

  projectSearch(project: Project | undefined) {
    if (project) {
      this.displayProjects = [project];
    } else {
      this.displayProjects = this.projects;
    }
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
        const co2Obj: {
          [key: string]: { value: number; color: string };
        } = {};
        const children = proj.data.data.stream.object.children.objects;
        children.forEach((material: any) => {
          const materialValue =
            parseFloat(material.data.act.reportData.productStageCarbonA1A3) +
            parseFloat(material.data.act.reportData.transportCarbonA4) +
            parseFloat(material.data.act.reportData.constructionCarbonA5.site) +
            parseFloat(
              material.data.act.reportData.constructionCarbonA5.value
            ) +
            parseFloat(material.data.act.reportData.constructionCarbonA5.waste);
          const materialKey = material.data.act.formData.material.name;
          const materialColor = material.data.act.formData.material.color;
          if (Object.prototype.hasOwnProperty.call(co2Obj, materialKey)) {
            co2Obj[materialKey] = {
              value: co2Obj[materialKey].value + materialValue,
              color: materialColor,
            };
          } else {
            co2Obj[materialKey] = {
              value: materialValue,
              color: materialColor,
            };
          }
        });
        const co2Arr = Object.entries(co2Obj);
        const co2Data = co2Arr.map((obj) => ({
            label: obj[0],
            value: obj[1].value,
            color: obj[1].color,
        }));
        return {
          title: `${proj.name}`,
          id: `${proj.id}`,
          co2Values: co2Data,
          totalCO2e: proj.data.data.stream.object.data.totalCO2,
          link: "",
          category: `${proj.data.data.stream.object.data.projectData.component}`,
        };
      });

      this.displayProjects = this.projects;
      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
    }
  }
}
</script>
<style scoped>
.titles {
  width: 70%;
}
.page {
  margin-left: 4rem;
  margin-right: 4rem;
}

.grid {
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>
