<template>
  <v-card class="card pa-4" flat outlined>
    <v-card-title class="pt-0 px-0">
      <span class="text-h7">Material Breakdown</span>
    </v-card-title>
    <doughtnut-chart :data="chartData" :chartData="{}" style="height: 80%" />
  </v-card>
</template>
<script lang="ts">
import { ChartData } from "@/models/chart";
import { IMaterialBreakdown } from "@/views/utils/process-report-object";
import { Vue, Component, Prop } from "vue-property-decorator";

import DoughtnutChart from "../charts/DoughnutChart.vue";

@Component({
  components: { DoughtnutChart },
})
export default class MaterialBreakdownCard extends Vue {
  @Prop() materialBreakdown!: IMaterialBreakdown;

  get materials() {
    return this.materialBreakdown.materials;
  }

  get chartData(): ChartData[] {
    return this.materials.map((m) => ({
      label: m.label,
      value: Math.round(m.value),
      color: m.color,
    }));
  }
}
</script>
<style scoped>
.card {
  max-height: 50%;
}
</style>
