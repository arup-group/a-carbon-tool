<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import VueChart from "vue-chartjs";
import { ChartData } from "@/models/chart";

@Component
export default class HBarChart extends Mixins(VueChart.HorizontalBar) {
  @Prop() readonly data!: Array<ChartData>;

  mounted() {
    if (this.data) {
      this.renderChart(
        {
          labels: this.data.map((d) => d.label),
          datasets: [
            {
              label: "tCO2e",
              backgroundColor: ["#52C4BA", "#77DCCC", "#9DEDDA"],
              data: this.data.map((d) => d.value),
            },
          ],
        },
        {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
        }
      );
    }
  }
}
</script>
