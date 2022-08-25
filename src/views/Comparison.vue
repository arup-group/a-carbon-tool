<template>
  <v-main class="mr-7 ml-7">
    <loading-container :error="error" :loading="loading" @retry="load">
      <template v-slot="{ loaded }">
        <v-container v-if="loaded">
          <v-data-iterator
            :items="displayReports"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            hide-default-footer
          >
            <template v-slot:header>
              <v-toolbar class="mb-2" flat>
                <v-toolbar-title class="d-flex">
                  {{ streamName }}
                </v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:default="props">
              <div class="d-flex overflow-auto align-center">
                <history-project-card
                  v-for="report in props.items"
                  @removeReport="removeReport"
                  :style="historyProjectCardStyle"
                  :key="report.id"
                  :project="report"
                  :filters="filters"
                  :comparison="true"
                />
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  outlined
                  x-large
                  color="primary"
                  @click="addReport"
                >
                  <v-icon> mdi-plus </v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-iterator>
        </v-container>
      </template>
    </loading-container>
    <add-report-dialog
      :key="dialogKey"
      :dialog="addReportDialog"
      :branches="branchesToAdd"
      @cancel="cancelDialog"
      @agree="addReportAgree"
    />
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { GetStreamNameReportBranchesOutput } from "@/store";

import { loadStream } from "./utils/viewAssessmentUtils";

import {
  HistoryFilterOptions,
  HistoryProjectCardDirection,
  ProjectAVals,
} from "@/models/assessmentHistory";
import { AddReportInput } from "@/models/comparison";

import HistoryProjectCard from "@/components/assessmentHistory/HistoryProjectCard.vue";
import AddReportDialog from "@/components/comparison/AddReportDialog.vue";
import LoadingContainer from "@/components/shared/LoadingContainer.vue";

@Component({
  components: {
    HistoryProjectCard,
    AddReportDialog,
    LoadingContainer,
  },
})
export default class Comparison extends Vue {
  streamid = "";
  streamName = "";
  loading = true;
  error = false;
  itemsPerPage = 10;
  page = 1;
  displayReports: ProjectAVals[] = [];
  allReports: ProjectAVals[] = [];
  filters: HistoryFilterOptions = {
    materials: true,
    a15: true,
    categories: true,
    direction: HistoryProjectCardDirection.ROW,
  };
  addReportDialog = false;

  dialogKey = 1;

  async mounted() {
    this.streamid = this.$route.params.streamId;
    this.load();
  }

  addReport() {
    this.addReportDialog = true;
  }

  cancelDialog() {
    this.addReportDialog = false;
    this.dialogKey++;
  }

  addReportAgree(rawReports: AddReportInput[]) {
    const reports = rawReports.map(
      (r) => `${this.$store.state.speckleFolderName}/${r.model}`
    );
    const fullReports = this.allReports.filter((ar) => {
      let contained = false;
      reports.forEach((r) => {
        if (ar.id === r) contained = true;
      });
      return contained;
    });
    fullReports.forEach((fr) => this.displayReports.push(fr));
    this.addReportDialog = false;
  }

  removeReport(id: string) {
    if (this.displayReports.length > 1) {
      this.displayReports = this.displayReports.filter((r) => r.id !== id);
    }
  }

  get direction() {
    return this.filters.direction === HistoryProjectCardDirection.COL;
  }
  get historyProjectCardsContainerStyle() {
    return this.direction ? "" : "display: flex; overflow-x: scroll;";
  }
  get historyProjectCardStyle() {
    return this.direction ? "" : "min-width: 33%; margin: 2rem; padding: 0;";
  }
  get branchesToAdd() {
    return this.allReports
      .filter((ar) => {
        let contained = false;
        this.displayReports.forEach((dr) => {
          if (dr.id === ar.id) contained = true;
        });

        return !contained;
      })
      .map((ar) => ar.id.split("/")[1]);
  }
  async load() {
    this.error = false;
    this.loading = true;
    try {
      const { streamName, branches }: GetStreamNameReportBranchesOutput =
        await this.$store.dispatch(
          "getStreamNameReportBranches",
          this.streamid
        );
      this.streamName = streamName;
      const reportData = await Promise.all(
        branches.map(async (b) => ({
          branchName: b,
          data: await loadStream(this.$store, this.streamid, b),
        }))
      );
      this.allReports = reportData.map((d) => ({
        title: `${d.data.data.projectInfo.name} - ${
          d.branchName.split("/")[1]
        }`,
        id: d.branchName,
        co2Values: d.data.data.materialBreakdown.materials,
        link: "",
        category: d.data.data.projectInfo.components,
        totalCO2e: d.data.data.projectInfo.totalCO2e * 1000,
        projectDate: "",
        newMainAvailable: false,
        aValues: d.data.data.aBreakdown.levels.map((l) => ({
          value: l.tCO2e,
          label: l.name,
          color: "",
        })),
      }));
      this.displayReports = [this.allReports[0]];

      this.loading = false;
    } catch (err) {
      console.error(err);
      this.error = true;
    }
  }
}
</script>
