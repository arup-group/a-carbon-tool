<template>
  <div>
    <strong> Total Co2: </strong>
    <v-chip class="text-center">{{ getReport(report) }}</v-chip>
    <v-card v-if="report" flat width="100%">
      <a-breakdown-card :aBreakdown="getaBreakdownData()" />
    </v-card>
  </div>
</template>
<script lang="ts">
import { ReportPassdown } from "@/models/newAssessment";
import { Vue, Component, Prop } from "vue-property-decorator";
import ABreakdownCard from "@/components/viewAssessment/ABreakdownCard.vue";

@Component({
  components: {
    ABreakdownCard,
  },
})
export default class Menu6 extends Vue {
  @Prop() report!: ReportPassdown;
  @Prop() floorArea!: number;

  getReport(val: ReportPassdown) {
    if (val) {
      const tonnesCO2 = Math.round(val.totalCO2 * 0.001);
      return `${tonnesCO2} tonnes`;
    }
  }

  getaBreakdownData() {
    if (this.report) {
      return {
        levels: [
          {
            name: "A1-A3",
            kgCO2e: this.report.totalA1A3,
            tCO2e: Math.round(
              this.report.totalA1A3 * 0.001
            ),
            kgCO2eperm2: Math.round(
              this.report.totalA1A3 / this.floorArea
            ),
          },
          {
            name: "A4",
            kgCO2e: this.report.totalA4,
            tCO2e: Math.round(this.report.totalA4 * 0.001),
            kgCO2eperm2: Math.round(
              this.report.totalA4 / this.floorArea
            ),
          },
          {
            name: "A5",
            kgCO2e: this.report.totalA5,
            tCO2e: Math.round(
              this.report.totalA5 * 0.001
            ),
            kgCO2eperm2: Math.round(
              this.report.totalA5 / this.floorArea
            ),
          },
        ],
      };
    } else {
      return "";
    }
  }
}
</script>
