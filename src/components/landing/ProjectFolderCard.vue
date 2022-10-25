<template>
  <v-container>
    <v-hover v-slot="{ hover }">
      <v-sheet outlined color="primary" rounded style="min-height: 35rem">
        <v-card flat style="min-height: 35rem" class="d-flex flex-column">
          <v-card-title>{{ title }}</v-card-title>
          <loading-container
            :error="error"
            :loading="loading"
            :line="true"
            @retry="retry"
            class="d-flex align-center"
            style="width: 100%"
          >
            <template style="width: 100%">
              <v-card-text>
                <v-row justify="start" class="text--primary" fill-height dense>
                  <v-col cols="6"> {{ co2Total }} tCO2e </v-col>
                  <v-col align="right" cols="6">
                    updated: {{ branchDate }}</v-col
                  >
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
            </template>
          </loading-container>
          <v-expand-transition>
            <v-card
              v-if="hover"
              class="transition-fast-in-fast-out v-card--reveal d-flex justify-center align-center"
              style="height: 100%"
            >
              <v-btn @click="openStream">Open Stream</v-btn>
            </v-card>
          </v-expand-transition>
        </v-card>
      </v-sheet>
    </v-hover>
  </v-container>
</template>
<script lang="ts">
import { ChartData } from "@/models/chart";
import {
  instanceOfStreamFolder,
  instanceOfStreamFolderLoading,
  ProjectFolder,
} from "@/models/landing";
import { instanceOfProject } from "@/models/project";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import DoughnutChart from "../charts/DoughnutChart.vue";
import LoadingContainer from "../shared/LoadingContainer.vue";

@Component({
  components: { DoughnutChart, LoadingContainer },
})
export default class ProjectFolderCard extends Vue {
  @Prop() stream!: ProjectFolder;

  error = false;
  retry() {
    return;
  }

  get loading() {
    return instanceOfStreamFolderLoading(this.stream);
  }

  get title() {
    return this.stream.streamName;
  }

  get project() {
    if (instanceOfStreamFolder(this.stream)) return this.stream.mainProject;
    else return {};
  }

  get branchDate() {
    if (instanceOfProject(this.project)) {
      const branchDate = new Date(Date.parse(this.project.projectDate));
      const enGBFormatter = new Intl.DateTimeFormat("en-GB");
      const branchDateFormatted = enGBFormatter.format(branchDate);
      return branchDateFormatted;
    } else return "";
  }
  get co2Total() {
    if (instanceOfProject(this.project)) return this.project.totalCO2e;
    else return 0;
  }
  get co2Values(): ChartData[] {
    if (instanceOfProject(this.project)) {
      return this.project.co2Values.map((c) => ({
        label: c.label,
        value: this.convertKgToTonnes(c.value),
        color: c.color,
      }));
    }
    return [];
  }
  convertKgToTonnes(value: number) {
    // converts kg to tonnes and rounds to 2 dp
    return Math.round(value * 0.001);
  }

  @Emit("openStream")
  openStream() {
    return this.stream.streamId;
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
