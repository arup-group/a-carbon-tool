<template>
  <v-card>
    <v-expand-transition>
      <doughtnut-chart v-show="show" :data="chartData" :chartData="{}" />
    </v-expand-transition>
    <v-card-title class="d-flex justify-space-between mb-5">
      <span class="text-h7">MATERIAL BREAKDOWN</span>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-down" : "mdi-chevron-up" }}</v-icon>
      </v-btn>
    </v-card-title>
  </v-card>
</template>
<script lang="ts">
import { MaterialBreakdown } from "@/models/assessment";
import { ChartData } from "@/models/chart";
import { Vue, Component, Prop } from "vue-property-decorator";

import DoughtnutChart from "./charts/DoughnutChart.vue";

@Component({
  components: { DoughtnutChart },
})
export default class MaterialBreakdownCard extends Vue {
  @Prop() materialBreakdown!: MaterialBreakdown;

  show = true;

  get materials() {
    return this.materialBreakdown.materials;
  }

  get chartData(): ChartData[] {
    return this.materials.map((m) => ({
      label: m.name,
      value: m.value,
    }));
  }
}
</script>
