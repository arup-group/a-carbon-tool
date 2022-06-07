<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import VueChart from "vue-chartjs";
import { ChartData } from "@/models/chart";

@Component
export default class DoughnutChart extends Mixins(VueChart.Doughnut) {
  @Prop() readonly data!: Array<ChartData>;

  mounted() {
    this.renderChart(
      {
        labels: this.data.map((d) => d.label),
        datasets: [
          {
            label: "Data One",
            backgroundColor: this.data.map((d) => d.color),
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
</script>
