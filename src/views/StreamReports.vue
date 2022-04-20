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
                @edit="edit"
                @open="openViewAssessment"
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
    <quick-report
      @close="quickReportClose"
      :dialog="quickReport"
      :streamid="quickStreamid"
      :branchName="quickBranchName"
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

import {
  DeleteBranchInput,
  GetAllReportObjectsOutputs,
  GetStreamBranchesOutput,
  LoadActReportDataInput,
} from "@/store";
import { loadParent, LoadStreamOut } from "../views/utils/viewAssessmentUtils";
import {
  CarbonBranch,
  BranchData,
  StreamId,
  StreamBranches,
  StreamFolder,
} from "@/models/landing";

import ProjectCard from "@/components/landing/ProjectCard.vue";
import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import LandingHeader from "@/components/landing/LandingHeader.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import LandingError from "@/components/landing/LandingError.vue";
import QuickReport from "@/components/landing/QuickReport.vue";
import ProjectFolderCard from "@/components/landing/ProjectFolderCard.vue";

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
    QuickReport,
    ProjectFolderCard,
  },
})
export default class StreamReports extends Vue {
  carbonBranches: CarbonBranch[] = [];
  token = "";
  itemsPerPage = 8;
  search = "";
  page = 1;
  projects: Project[] = [];
  loading = true;
  error = false;
  dialog = false;
  quickReport = false;
  quickStreamid = "";
  quickBranchName = "";
  deleteid = "";
  deleteSuccess = true;
  deleteSnack = false;
  streamid = "";

  async mounted() {
    this.token = this.$store.state.token.token;
    this.streamid = this.$route.params.streamid;

    if (this.streamid) this.loadStreams();
  }

  edit(streamid: string) {
    this.quickStreamid = streamid;
    this.quickBranchName = "main";
    this.quickReport = true;
  }
  quickReportClose() {
    this.quickReport = false;
  }

  openViewAssessment(streamid: string) {
    this.$router.push(`/assessment/view/${streamid}/main`);
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
    try {
      const reportObjects: GetAllReportObjectsOutputs =
        await this.$store.dispatch("getAllReportObjects", this.streamid);
      // make sure that the "main" branch is first in the array so that it appears at the top
      const mainBranch = reportObjects.find((o) => o.branch === "main");
      if (mainBranch) {
        const reportObjectsReorder = [
          mainBranch,
          ...reportObjects.filter((o) => o.branch !== "main"),
        ];
        this.projects = reportObjectsReorder.map((o) => ({
          title: `${o.data.data.projectInfo.name} - ${o.branch}`,
          id: o.branch,
          co2Values: o.data.data.materialBreakdown.materials,
          totalCO2e: o.data.data.projectInfo.totalCO2e,
          link: "",
          category: o.data.data.projectInfo.components,
          projectDate: o.data.data.projectInfo.reportDate.toString(),
          newMainAvailable: false,
        }));
      }

      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
    }
  }
}
</script>
