<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import VueChart from "vue-chartjs";
import { ChartData } from "@/models/chart";

@Component
export default class LineChart extends Mixins(VueChart.Line) {
  @Prop() readonly data!: Array<ChartData>;

  mounted() {
    if (this.data) {
      this.renderChart(
        {
          labels: this.data.map((d) => d.label),
          datasets: [
            {
              label: "tCO2e",
              borderColor: ["#52C4BA"],
              pointBackgroundColor: "#409c93",
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
