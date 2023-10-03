<template>
  <v-main class="mr-7 ml-7 pb-4">
    <loading-container
      :error="error"
      errorMessage="Stream not found. Please make sure you are signed into the correct server."
      :loading="loading"
      @retry="loadStreams"
    >
      <template v-slot="{ loaded }">
        <v-container v-if="loaded">
          <v-data-iterator
            :items="projectData"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="search"
            hide-default-footer
          >
            <template v-slot:header>
              <stream-reports-header
                :streamName="streamName"
                v-model="search"
                @openComparison="openComparison"
                @openHistory="openHistory"
                @openAddData="openAddData"
              />
            </template>
            <template v-slot:default="props">
              <v-row class="d-flex align-stretch">
                <v-col
                  v-for="item in props.items"
                  :key="item.title"
                  cols="12"
                  md="6"
                  lg="4"
                  style="display: flex"
                >
                  <new-assessment-card
                    v-if="item.title === 'New Assessment'"
                    @newAssessment="newAssessment"
                  />
                  <project-card
                    v-else
                    :project="item"
                    @delete="checkDelete"
                    @edit="edit"
                    @open="openViewAssessment"
                    @share="openShare"
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
      </template>
    </loading-container>
    <confirm-dialog
      :dialog="dialog"
      @agree="agreeDelete"
      @cancel="cancelDelete"
      message="Are you sure you want to permanently delete this report for all users? This action is irreversible!"
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
      :textError="deleteSnackTextError"
      :timeout="snackTimeout"
      textSuccess="Report deleted!"
    />
    <excel-import-dialog
      :key="excelImportKey"
      :dialog="excelImportDialog"
      :streamId="streamid"
      @close="closeAddData"
    />
    <share-report-dialog
      :dialog="shareReportDialog"
      :shareLink="shareLink"
      :streamid="streamid"
      :reportName="shareReportName"
      @close="closeShareReportDialog"
    />
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { Project } from "@/models/project";
import { DeleteStreamData, StreamName } from "@/models/graphql";

import { DeleteBranchInput, GetAllReportObjectsOutputs } from "@/store";
import { CarbonBranch } from "@/models/landing";

import ProjectCard from "@/components/landing/ProjectCard.vue";
import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import QuickReport from "@/components/landing/QuickReport.vue";

import ConfirmDialog from "@/components/shared/ConfirmDialog.vue";
import SESnackBar from "@/components/shared/SESnackBar.vue";
import LoadingContainer from "@/components/shared/LoadingContainer.vue";
import ShareReportDialog from "@/components/shared/ShareReportDialog.vue";

import ExcelImportDialog from "@/components/shared/ExcelImportDialog.vue";

import StreamReportsHeader from "@/components/streamReports/StreamReportsHeader.vue";

@Component({
  components: {
    ProjectCard,
    NewAssessmentCard,
    LandingFooter,
    ConfirmDialog,
    SESnackBar,
    QuickReport,
    LoadingContainer,
    ExcelImportDialog,
    StreamReportsHeader,
    ShareReportDialog,
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
  deleteSnackTextError = "";
  snackTimeout = 4000;
  streamid = "";
  streamName = "";
  excelImportDialog = false;
  excelImportKey = 1; // used to force refresh the modal
  shareReportDialog = false;
  shareLink = "";
  shareReportName = "";

  async mounted() {
    this.token = this.$store.state.token.token;
    this.streamid = this.$route.params.streamid;

    this.$store
      .dispatch("getStreamName", this.streamid)
      .then((res: StreamName) => (this.streamName = res.data.stream.name));

    if (this.streamid) this.loadStreams();
  }

  openAddData() {
    this.excelImportDialog = true;
  }
  closeAddData() {
    this.excelImportKey++;
    this.excelImportDialog = false;
  }

  openHistory() {
    this.$router.push({
      name: "AssessmentHistory",
      params: { streamId: this.streamid },
    });
  }
  openComparison() {
    this.$router.push({
      name: "Comparison",
      params: { streamId: this.streamid },
    });
  }

  edit(branchName: string) {
    // REMOVING QUICK REPORT FOR NOW, NEEDS MORE WORK BEFORE IT'S FIT FOR PURPOSE
    // this.quickStreamid = this.streamid;
    // this.quickBranchName = branchName;
    // this.quickReport = true;
    // this.$router.push({ name: "UpdateAssessmentBranch"})
    this.$router.push(`assessment/${this.streamid}/${branchName}`);
  }
  quickReportClose() {
    this.quickReport = false;
  }

  openViewAssessment(branchName: string) {
    this.$router.push(`/assessment/view/${this.streamid}/${branchName}`);
  }

  newAssessment() {
    this.$router.push(`/assessment/${this.streamid}`);
  }

  get numberOfPages() {
    const items = this.projects.length;
    if (!items) return 1;
    return Math.ceil(items / this.itemsPerPage);
  }

  get projectData() {
    return [{ title: "New Assessment" }, ...this.projects];
  }

  openShare(project: Project) {
    this.shareLink = `${window.origin}/assessment/view/${this.streamid}/${project.id}`;
    this.shareReportName = project.name;
    this.shareReportDialog = true;
  }
  closeShareReportDialog() {
    this.shareReportDialog = false;
  }

  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1;
  }

  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1;
  }

  checkDelete(branchid: string) {
    this.deleteid = branchid;
    this.dialog = true;
  }
  async agreeDelete() {
    this.dialog = false;
    const input: DeleteBranchInput = {
      streamid: this.streamid,
      branchid: this.deleteid,
    };
    try {
      const deleted: DeleteStreamData = await this.$store.dispatch(
        "deleteBranch",
        input
      );
      if (deleted?.data?.branchDelete) {
        this.snackTimeout = 4000;
        this.deleteSuccess = true;
        this.deleteSnack = true;
        this.loadStreams();
      } else {
        this.snackTimeout = 30000;
        this.deleteSuccess = false;
        this.deleteSnackTextError =
          "Something went wrong:" + deleted.errors[0].message;
        this.deleteSnack = true;
      }
    } catch (err) {
      this.deleteSnackTextError = "Something went wrong here";
      this.deleteSuccess = false;
      this.deleteSnack = true;
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
      const mainBranch = reportObjects.find((o) => o.branch.name === "main");
      if (mainBranch) {
        const reportObjectsReorder = [
          mainBranch,
          ...reportObjects.filter((o) => o.branch.name !== "main"),
        ];
        this.projects = reportObjectsReorder.map((o) => ({
          title: `${o.data.data.projectInfo.name} - ${o.branch.name}`,
          name: o.data.data.projectInfo.name,
          id: o.branch.name,
          branchId: o.branch.id,
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
      console.error(err);
      this.error = true;
      this.loading = false;
    }
  }
}
</script>
