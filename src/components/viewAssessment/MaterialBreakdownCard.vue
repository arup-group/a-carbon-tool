<template>
  <v-card class="card">
    <doughtnut-chart :data="chartData" :chartData="{}" style="height: 80%" />
    <v-card-title class="mb-5">
      <span class="text-h7">MATERIAL BREAKDOWN</span>
    </v-card-title>
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
      label: m.name,
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
