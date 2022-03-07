<template>
  <v-main class="mr-7 ml-7">
    <v-container v-if="!loading && !error">
      <v-data-iterator
        :items="cleanedReports"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar class="mb-2" dark flat>
            <v-toolbar-title>{{ streamName }}</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:default="props">
          <div v-for="report in props.items" :key="report.id">
            <history-project-card :project="report" />
          </div>
        </template>
      </v-data-iterator>
    </v-container>
    <loading-spinner v-else-if="loading && !error" />
    <error-retry v-else @retry="loadReports" />
  </v-main>
</template>
<script lang="ts">
import {
  StreamData,
  StreamName,
  StreamReferenceBranches,
  StreamReferenceObjects,
} from "@/models/graphql";
import { ReportObj } from "@/models/graphql/StreamData.interface";
import { GetBranchDataInputs } from "@/store";
import { Vue, Component } from "vue-property-decorator";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import ErrorRetry from "@/components/shared/ErrorRetry.vue";
import { Project } from "@/models/project";
import HistoryProjectCard from "@/components/assessmentHistory/HistoryProjectCard.vue";
import { ChartData } from "@/models/chart";
import { ProjectAVals } from "@/models/assessmentHistory";

@Component({
  components: { LoadingSpinner, ErrorRetry, HistoryProjectCard },
})
export default class AssessmentHistory extends Vue {
  streamId = "";
  streamName = "";
  loading = true;
  error = false;
  reports: ReportObj[] = [];
  cleanedReports: Project[] = [];
  itemsPerPage = 10;
  page = 1;

  mounted() {
    this.streamId = this.$route.params.streamId;
    this.loadReports();
    this.getName();
  }

  async getName() {
    const rawStreamName: StreamName = await this.$store.dispatch(
      "getStreamName",
      this.streamId
    );

    this.streamName = rawStreamName.data.stream.name;
  }

  async loadReports() {
    this.loading = true;
    this.error = false;
    try {
      const branches: StreamReferenceBranches = await this.getBranches(
        this.streamId
      );
      const containsReport = this.findContainsReport(branches);
      if (containsReport) {
        const branchData: StreamReferenceObjects = await this.$store.dispatch(
          "getStreamCommit",
          this.streamId
        );
        this.reports = await this.getReports(branchData, this.streamId);
        this.cleanedReports = this.convReports(this.reports);
        console.log("cleanedReports:", this.cleanedReports);
        this.loading = false;
      }
    } catch (err) {
      this.error = true;
    }
  }

  async getBranches(streamId: string): Promise<StreamReferenceBranches> {
    return await this.$store.dispatch("getStreamBranches", streamId);
  }
  findContainsReport(branches: StreamReferenceBranches) {
    let contains = false;
    branches.data.stream.branches.items.forEach((b) => {
      if (b.name === "actcarbonreport") contains = true;
    });
    return contains;
  }
  async getReports(
    branchData: StreamReferenceObjects,
    streamid: string
  ): Promise<ReportObj[]> {
    const rawReports: StreamData[] = await Promise.all(
      branchData.data.stream.branch.commits.items.map((d) => {
        const getBranchDataInputs: GetBranchDataInputs = {
          streamid,
          objId: d.referencedObject,
        };
        return this.$store.dispatch("getBranchData", getBranchDataInputs);
      })
    );
    return rawReports.map((rawReport) => rawReport.data.stream.object);
  }

  convReports(reports: ReportObj[]): ProjectAVals[] {
    return reports.map((r) => {
      const materials: {
        [material: string]: { value: number; label: string; color: string };
      } = {};
      let a1A3Tot = 0;
      let a4Tot = 0;
      let a5Tot = 0;
      r.children.objects.forEach((o) => {
        const material = o.data.act.formData.material;
        const reportData = o.data.act.reportData;
        const totalCO2 =
          reportData.productStageCarbonA1A3 +
          reportData.transportCarbonA4 +
          reportData.constructionCarbonA5.value;
        const prevMaterial = materials[material.name];
        materials[material.name] = {
          value: prevMaterial ? totalCO2 + prevMaterial.value : totalCO2,
          label: material.name,
          color: material.color,
        };

        a1A3Tot += reportData.productStageCarbonA1A3;
        a4Tot += reportData.transportCarbonA4;
        a5Tot += reportData.constructionCarbonA5.value;
      });

      const aValues: ChartData[] = [
        {
          label: "A1-A3",
          value: a1A3Tot,
          color: "",
        },
        {
          label: "A4",
          value: a4Tot,
          color: "",
        },
        {
          label: "A5",
          value: a5Tot,
          color: "",
        },
      ];
      const co2Data = Object.values(materials);
      return {
        title: `${r.data.projectData.name}`,
        id: `${r.data.id}`,
        co2Values: co2Data,
        aValues,
        totalCO2e: r.data.totalCO2,
        link: "",
        category: r.data.projectData.components,
      };
    });
  }
}
</script>
