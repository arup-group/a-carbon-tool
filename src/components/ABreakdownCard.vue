<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between mb-5">
      <span class="text-h7">A1-5 BREAKDOWN</span>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-show="show">
        <h-bar-chart :data="chartData" :chartData="{}" class="chart" />
        <v-divider class="mb-4 mt-4"></v-divider>
        <div class="d-flex justify-space-between">
            <div v-for="level in levels" :key="level.name">
                <div class="font-weight-bold mb-3">{{ getName(level) }}:</div>
                <div class="font-weight-light">{{ getTCO2e(level) }} tCO2e</div>
                <div class="font-weight-light">{{ getKgCO2e(level) }} kgCO2e</div>
            </div>
        </div>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { ABreakdown, Level } from "@/models/assessment";
import { ChartData } from "@/models/chart";
import { Vue, Component, Prop } from "vue-property-decorator";

import HBarChart from "./charts/HBarChart.vue";

@Component({
  components: { HBarChart },
})
export default class ABreakdownCard extends Vue {
  @Prop() aBreakdown!: ABreakdown;

  show = true; // this starts as true because the chart must be drawn on page load, otherwise it doesn't work for some reason

  get levels() {
    return this.aBreakdown.levels;
  }
  get chartData(): ChartData[] {
    return this.levels.map((l) => ({
      label: l.name,
      value: l.tCO2e,
    }));
  }

  getName(level: Level) {
      return level.name;
  }
  getTCO2e(level: Level) {
      return level.tCO2e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getKgCO2e(level: Level) {
      return level.kgCO2e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
</script>
<style scoped>
.chart {
    height: 25%;
}
</style>
