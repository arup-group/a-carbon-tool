<script lang="ts">
import { Component, Mixins, Prop, Watch } from "vue-property-decorator";
import VueChart from "vue-chartjs";
import { ChartData } from "@/models/chart";

@Component
export default class HBarChart extends Mixins(
  VueChart.HorizontalBar,
//   VueChart.mixins.reactiveProp
) {
  @Prop() readonly data!: Array<ChartData>;

  mounted() {
    console.log("data:", this.data);
    if (this.data) {
      this.renderChart(
        {
          labels: this.data.map((d) => d.label),
          datasets: [
            {
              label: "Data One",
              backgroundColor: ["#2962B2", "#2092D3", "#20acd3"],
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
