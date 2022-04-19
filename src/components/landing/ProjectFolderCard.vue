<template>
  <v-container>
    <v-hover v-slot="{ hover }">
      <v-sheet outlined color="primary" rounded height="100%">
        <v-card flat height="100%" class="d-flex flex-column">
          <v-card-title>{{ title }}</v-card-title>
          <v-card-text>
            <v-row justify="start" class="text--primary" fill-height dense>
              <v-col cols="6"> {{ co2Total }} tCO2e </v-col>
              <v-col align="right" cols="6"> updated: {{ branchDate }}</v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions
            style="margin-bottom: auto"
            class="justify-center py-0"
          >
            <v-card flat width="80%" class="ma-0 pa-0 mx-auto">
              <DoughnutChart :data="co2Values" :chartData="{}" />
            </v-card>
          </v-card-actions>
          <v-expand-transition>
            <v-card
              v-if="hover"
              class="transition-fast-in-fast-out v-card--reveal d-flex justify-center align-center"
              style="height: 100%"
            >
              <v-btn>Open Stream</v-btn>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-sheet>
    </v-hover>
  </v-container>
</template>
<script lang="ts">
import { ChartData } from "@/models/chart";
import { StreamFolder } from "@/models/landing";
import { Vue, Component, Prop } from "vue-property-decorator";

import DoughnutChart from "../charts/DoughnutChart.vue";

@Component({
  components: { DoughnutChart },
})
export default class ProjectFolderCard extends Vue {
  @Prop() stream!: StreamFolder;

  get title() {
    return this.stream.streamName;
  }

  get project() {
    return this.stream.mainProject;
  }

  get branchDate() {
    const branchDate = new Date(Date.parse(this.project.projectDate));
    const enGBFormatter = new Intl.DateTimeFormat("en-GB");
    const branchDateFormatted = enGBFormatter.format(branchDate);
    return branchDateFormatted;
  }
  get co2Total() {
    return this.project.totalCO2e;
  }
  get co2Values(): ChartData[] {
    return this.project.co2Values.map((c) => ({
      label: c.label,
      value: this.convertKgToTonnes(c.value),
      color: c.color,
    }));
  }
  convertKgToTonnes(value: number) {
    // converts kg to tonnes and rounds to 2 dp
    return Math.round(value * 0.001);
  }
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1;
  position: absolute;
  width: 100%;
}
</style>
