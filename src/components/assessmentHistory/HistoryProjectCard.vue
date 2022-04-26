<template>
  <v-container>
    <v-sheet outlined color="primary" rounded height="100%">
      <v-card flat height="100%" class="d-flex flex-column">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="limit-lines">
              {{ title }}
            </v-col>
            <BECChipGroup v-if="categories" :categories="category" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="start" class="text--primary" fill-height dense>
            <v-col cols="6"> {{ co2Total }} tCO2e </v-col>
          </v-row>
          <v-divider class="mb-4 mt-2"></v-divider>
          <v-row>
            <v-col cols="12" :lg="materialGraphLgCols" align="center">
              <v-card flat width="80%">
                <DoughnutChart
                  v-if="materials"
                  :data="co2Values"
                  :chartData="{}"
                />
              </v-card>
            </v-col>
            <v-col cols="12" :lg="a15GraphLgCols" align="center">
              <v-card flat width="80%">
                <h-bar-chart v-if="a15" :data="aVals" />
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import { ChartData } from "@/models/chart";

import DoughnutChart from "../charts/DoughnutChart.vue";
import HBarChart from "../charts/HBarChart.vue";
import LandingOptions from "../landing/LandingOptions.vue";
import BECChipGroup from "../shared/BECChipGroup.vue";
import { HistoryFilterOptions, ProjectAVals } from "@/models/assessmentHistory";

@Component({
  components: { DoughnutChart, BECChipGroup, LandingOptions, HBarChart },
})
export default class HistoryProjectCard extends Vue {
  @Prop() project!: ProjectAVals;
  @Prop() filters!: HistoryFilterOptions;
  @Prop() comparison!: boolean; // some things need to change if on comparison page

  options = false;

  // project getters
  get title() {
    return this.project.title;
  }
  get co2Values(): ChartData[] {
    return this.project.co2Values.map((c) => ({
      label: c.label,
      value: this.convertKgToTonnes(c.value),
      color: c.color,
    }));
  }
  get co2Total() {
    return this.convertKgToTonnes(this.project.totalCO2e);
  }
  get aVals() {
    return this.project.aValues;
  }
  get link() {
    return this.project.link;
  }
  get category() {
    return this.project.category;
  }

  // filters getters
  get materials() {
    return this.filters.materials;
  }
  get a15() {
    return this.filters.a15;
  }
  get categories() {
    return this.filters.categories;
  }
  get renderer() {
    return this.filters.renderer;
  }

  // different getters
  get materialGraphLgCols() {
    if (this.comparison) return "12";
    else return this.a15 ? "6" : "12";
  }
  get a15GraphLgCols() {
    if (this.comparison) return "12";
    else return this.materials ? "6" : "12";
  }

  @Emit("delete")
  checkDelete() {
    return this.project.id;
  }

  convertKgToTonnes(value: number) {
    // converts kg to tonnes and rounds to 2 dp
    return Math.round(value * 0.001);
  }

  open() {
    // MAY NEED TO UPDATE DEPENDING ON HOW ASSESSMENT/VIEW ENDS UP WORKING
    this.$router.push(`/assessment/view/${this.project.id}`);
  }
}
</script>
<style scoped>
.limit-lines {
  display: -webkit-box; /* or inline-block */
  overflow: hidden;
  max-height: 4em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
