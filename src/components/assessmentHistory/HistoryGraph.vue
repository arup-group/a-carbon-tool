<template>
  <v-sheet outlined color="primary" rounded height="100%">
    <v-card flat height="100%">
      <v-card-title>Total CO2 over time</v-card-title>
      <v-card-text>
        <line-chart :data="chartData" />
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script lang="ts">
import { ChartData } from "@/models/chart";
import { Vue, Component, Prop } from "vue-property-decorator";
import LineChart from "../charts/LineChart.vue";

@Component({
  components: { LineChart },
})
export default class HistoryGraph extends Vue {
  @Prop() chartData!: ChartData[];
}
</script>
