<template>
  <v-card class="card pa-4" flat outlined>
    <v-card-title class="pt-0 px-0">
      <span class="text-h7">Material Breakdown</span>
    </v-card-title>
    <doughtnut-chart :data="chartData" :chartData="{}" style="height: 80%" />
  </v-card>
</template>
<script lang="ts">
import { MaterialBreakdown } from "@/models/assessment";
import { ChartData } from "@/models/chart";
import { Vue, Component, Prop } from "vue-property-decorator";

import DoughtnutChart from "../charts/DoughnutChart.vue";

@Component({
  components: { DoughtnutChart },
})
export default class MaterialBreakdownCard extends Vue {
  @Prop() materialBreakdown!: MaterialBreakdown;

  get materials() {
    return this.materialBreakdown.materials;
  }

  get chartData(): ChartData[] {
    return this.materials.map((m) => ({
      label: m.label,
      value: m.value,
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
