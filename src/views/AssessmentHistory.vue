<template>
  <v-main class="mr-7 ml-7">
    <loading-container :error="error" :loading="loading" @retry="loadReports">
      <template v-slot="{ loaded }">
        <v-container v-if="loaded">
          <v-data-iterator
            :items="cleanedReports"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            hide-default-footer
          >
            <template v-slot:header>
              <v-toolbar class="mb-2" flat>
                <v-toolbar-title
                  class="d-flex justify-space-between align-center"
                  style="width: 100%"
                >
                  <span>{{ streamName }}</span>
                  <v-select
                    v-if="branches.length > 0"
                    v-model="selectedBranch"
                    :items="branches"
                    :item-text="(obj) => obj.name.split('/')[1]"
                    :item-value="(obj) => obj"
                    style="max-width: 33%"
                  ></v-select>
                </v-toolbar-title>
              </v-toolbar>
              <v-row>
                <v-col cols="12">
                  <history-filters
                    @materials="materialsFilterUpdate"
                    @a15="a15FilterUpdate"
                    @categories="categoriesFilterUpdate"
                    @renderer="rendererFilterUpdate"
                    @direction="directionUpdate"
                    :defaultFilters="filters"
                  />
                </v-col>
                <v-col cols="12"
                  ><history-graph :chartData="chartData"
                /></v-col>
              </v-row>
            </template>
            <template v-slot:default="props">
              <div :style="historyProjectCardsContainerStyle">
                <history-project-card
                  v-for="report in props.items"
                  :style="historyProjectCardStyle"
                  :key="report.id"
                  :project="report"
                  :filters="filters"
                />
              </div>
            </template>
          </v-data-iterator>
        </v-container>
      </template>
    </loading-container>
  </v-main>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import {
  GetBranchDataInputs,
  GetStreamBranchesOutput,
  GetStreamCommitInput,
} from "@/store";

import { ReportObj } from "@/models/graphql/StreamData.interface";
import { Project } from "@/models/project";
import {
  BranchItem,
  StreamData,
  StreamName,
  StreamReferenceObjects,
} from "@/models/graphql";
import { ChartData } from "@/models/chart";
import {
  HistoryFilterOptions,
  HistoryProjectCardDirection,
  ProjectAVals,
} from "@/models/assessmentHistory";

import HistoryProjectCard from "@/components/assessmentHistory/HistoryProjectCard.vue";
import HistoryFilters from "@/components/assessmentHistory/HistoryFilters.vue";
import HistoryGraph from "@/components/assessmentHistory/HistoryGraph.vue";
import LoadingContainer from "@/components/shared/LoadingContainer.vue";

@Component({
  components: {
    HistoryProjectCard,
    HistoryFilters,
    HistoryGraph,
    LoadingContainer,
  },
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
  filters: HistoryFilterOptions = {
    materials: true,
    a15: false,
    categories: true,
    renderer: false,
    direction: HistoryProjectCardDirection.COL,
  };
  chartData: ChartData[] = [];
  branches: BranchItem[] = [];
  selectedBranch: BranchItem | null = null;

  async mounted() {
    this.streamId = this.$route.params.streamId;
    const tempBranch: GetStreamBranchesOutput = await this.$store.dispatch(
      "getStreamBranches",
      this.streamId
    );
    this.branches = [...tempBranch.reportBranches];
    this.selectedBranch = this.branches[0];
    this.loadReports(this.selectedBranch);
    this.getName();
  }

  get direction() {
    return this.filters.direction === HistoryProjectCardDirection.COL;
  }
  get historyProjectCardsContainerStyle() {
    return this.direction ? "" : "display: flex; overflow-x: scroll;";
  }
  get historyProjectCardStyle() {
    return this.direction ? "" : "min-width: 33%;";
  }

  materialsFilterUpdate(material: boolean) {
    this.filters.materials = material;
  }
  a15FilterUpdate(a15: boolean) {
    this.filters.a15 = a15;
  }
  categoriesFilterUpdate(categories: boolean) {
    this.filters.categories = categories;
  }
  rendererFilterUpdate(renderer: boolean) {
    this.filters.renderer = renderer;
  }
  directionUpdate(direction: HistoryProjectCardDirection) {
    this.filters.direction = direction;
  }

  @Watch("selectedBranch")
  selectedBranchChanged(newVal: BranchItem, oldVal: BranchItem | null) {
    if (oldVal !== null) {
      this.loadReports(newVal);
    }
  }

  async getName() {
    const rawStreamName: StreamName = await this.$store.dispatch(
      "getStreamName",
      this.streamId
    );

    this.streamName = rawStreamName.data.stream.name;
  }

  async loadReports(selectedBranch: BranchItem) {
    this.loading = true;
    this.error = false;
    try {
      if (this.branches.length > 0) {
        const getStreamCommitInput: GetStreamCommitInput = {
          streamid: this.streamId,
          branchName: `${selectedBranch.name}`,
        };
        const branchData: StreamReferenceObjects = await this.$store.dispatch(
          "getStreamCommit",
          getStreamCommitInput
        );
        this.reports = await this.getReports(branchData, this.streamId);
        this.cleanedReports = this.convReports(this.reports);
        this.chartData = this.cleanedReports
          .map((r) => ({
            label: r.title,
            value: r.totalCO2e,
            color: "",
          }))
          .reverse();
        this.loading = false;
      }
    } catch (err) {
      console.error(err);
      this.error = true;
    }
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
        projectDate: "",
        newMainAvailable: false,
      };
    });
  }
}
</script>
