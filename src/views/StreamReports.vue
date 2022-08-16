<template>
  <v-main class="mr-7 ml-7 pb-4">
    <loading-container :error="error" :loading="loading" @retry="loadStreams">
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
              <v-toolbar flat rounded outlined class="my-4">
                <v-toolbar-title class="mr-4 ml-2">
                  {{ streamName }}
                </v-toolbar-title>
                <v-text-field
                  v-model="search"
                  clearable
                  flat
                  solo
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                ></v-text-field>
                <v-btn @click="openComparison">Open comparison</v-btn>
                <v-btn @click="openHistory">Open history</v-btn>
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

@Component({
  components: {
    ProjectCard,
    NewAssessmentCard,
    LandingFooter,
    ConfirmDialog,
    SESnackBar,
    QuickReport,
    LoadingContainer,
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
  streamName = "";

  async mounted() {
    this.token = this.$store.state.token.token;
    this.streamid = this.$route.params.streamid;

    this.$store
      .dispatch("getStreamName", this.streamid)
      .then((res: StreamName) => (this.streamName = res.data.stream.name));

    if (this.streamid) this.loadStreams();
  }

  openHistory() {
    this.$router.push(`assessment/history/${this.streamid}`);
  }
  openComparison() {
    this.$router.push(`comparison/${this.streamid}`);
  }

  edit(branchName: string) {
    this.quickStreamid = this.streamid;
    this.quickBranchName = branchName;
    this.quickReport = true;
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
          id: o.branch.name,
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