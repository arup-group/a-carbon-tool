<template>
  <v-card>
    <v-card-title class="mb-5 card">
      <span class="text-h7">A1-5 BREAKDOWN</span>
    </v-card-title>
    <v-card-text style="height: 100%">
      <h-bar-chart
        :data="chartData"
        :chartData="{}"
        class="chart"
        style="height: 40%"
      />
      <v-divider class="mb-4 mt-4"></v-divider>
      <div class="d-flex justify-space-between">
        <div v-for="level in levels" :key="level.name">
          <div class="font-weight-bold mb-3">{{ getName(level) }}:</div>
          <div class="font-weight-light">
            {{ getTCO2e(level) }} tCO<sub>2</sub>e
          </div>
          <div class="font-weight-light">
            {{ getKgCO2ePerSqm(level) }} kgCO<sub>2</sub>e/m<sup>2</sup>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { ABreakdown, Level } from "@/models/assessment";
import { ChartData } from "@/models/chart";
import { Vue, Component, Prop } from "vue-property-decorator";

import HBarChart from "../charts/HBarChart.vue";

@Component({
  components: { HBarChart },
})
export default class ABreakdownCard extends Vue {
  @Prop() aBreakdown!: ABreakdown;

  get levels() {
    return this.aBreakdown.levels;
  }
  get chartData(): ChartData[] {
    return this.levels.map((l) => ({
      label: l.name,
      value: l.tCO2e,
      color: "",
    }));
  }

  getName(level: Level) {
    return level.name;
  }
  getTCO2e(level: Level) {
    return level.tCO2e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getKgCO2ePerSqm(level: Level) {
    return level.kgCO2eperm2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
</script>
<style scoped>
.chart {
  height: 25%;
}
.card {
  max-height: 50%;
}
</style>
