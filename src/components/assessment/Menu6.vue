<template>
  <div>
    <strong> {{ getReport(report) }} </strong>
    <v-card flat width="100%">
      <a-breakdown-card class="card" :aBreakdown="aBreakdown" />
    </v-card>
  </div>
</template>
<script lang="ts">
import { ReportPassdown } from "@/models/newAssessment";
import { AssessmentComplete } from "@/models/assessment";
import { Vue, Component, Prop } from "vue-property-decorator";
import ABreakdownCard from "@/components/viewAssessment/ABreakdownCard.vue";

@Component({
  components: {
    ABreakdownCard,
  },
})
export default class Menu6 extends Vue {
  @Prop() report!: ReportPassdown;

  getReport(val: ReportPassdown) {
    if (val) {
      const tonnesCO2 = Math.round(val.totals.totalCO2 * 0.001);
      return `Total CO2: ${tonnesCO2} tonnes`;
    }
  }
  get aBreakdown() {
    return this.assessment.aBreakdown;
  }

  assessment: AssessmentComplete = {
    // dummy data
    streamId: "67899fd79d",
    projectInfo: {
      name: "Super great project",
      type: "Superstructure",
      reportDate: new Date(2021, 11, 2),
      author: "Tom Bunn",
      JN: "000001",
      systemCost: 100000,
      floorArea: 10000,
      notes: "",
      totalCO2e: 3400,
      totalkgCO2e: 340,
    },
    materialBreakdown: {
      materials: [
        {
          name: "some value 1",
          value: 50,
        },
        {
          name: "some value 2",
          value: 20,
        },
        {
          name: "some value 3",
          value: 10,
        },
      ],
    },
    aBreakdown: {
      levels: [
        {
          name: "A1-A3",
          tCO2e: 2800,
          kgCO2e: 280,
        },
        {
          name: "A4",
          tCO2e: 150,
          kgCO2e: 15,
        },
        {
          name: "A5",
          tCO2e: 250,
          kgCO2e: 25,
        },
      ],
    },
  };
}
</script>
