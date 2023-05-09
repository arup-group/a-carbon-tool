<template>
  <v-container>
    <v-sheet outlined color="primary" rounded height="100%">
      <v-card flat height="100%" class="d-flex flex-column">
        <v-card-title>
          <v-row>
            <v-col cols="12" class="limit-lines">
              {{ title }}
            </v-col>
            <BECChipGroup :categories="category" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="start" class="text--primary" fill-height dense>
            <v-col cols="6"> {{ co2Total }} tCO2e </v-col>
            <v-col align="right" cols="6"> updated: {{ branchDate }}</v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions style="margin-bottom: auto" class="justify-center py-0">
          <v-card flat width="80%" class="ma-0 pa-0">
            <DoughnutChart :data="co2Values" :chartData="{}" />
          </v-card>
          <!-- a warning appears if `chartData` is not passed in. The prop is not used -->
        </v-card-actions>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions class="d-flex justify-space-between mb-6 pa-2">
          <span v-if="newMainAvailable">
            <template>
              <span>
                <v-btn icon color="red darken-1" @click="cardOverlay = true">
                  <v-icon>mdi-alert</v-icon>
                </v-btn>
              </span>
            </template>
          </span>
          <span v-else></span>
          <span>
            <landing-options @delete="checkDelete" @edit="edit" />
            <v-select
              :menu-props="{ value: options }"
              v-if="options"
              :items="['one', 'two']"
            />
            <v-btn icon color="primary" @click="open">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </span>
        </v-card-actions>
        <v-overlay
          class="d-flex align-start"
          :absolute="true"
          :z-index="0"
          :opacity="0.98"
          :value="cardOverlay"
        >
          <v-col class="d-flex align-start">
            <v-col class="d-flex align-end flex-column">
              <v-btn icon color="red darken-1" @click="cardOverlay = false">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </v-col>
          </v-col>
          <v-col>
            <v-card-text class="d-flex align-end mb-6">
              There is an update on the main branch. Use the edit option to update your report.
            </v-card-text>
          </v-col>
        </v-overlay>
      </v-card>
    </v-sheet>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import { Project } from "@/models/project";
import { ChartData } from "@/models/chart";

import DoughnutChart from "../charts/DoughnutChart.vue";
import LandingOptions from "./LandingOptions.vue";
import BECChipGroup from "../shared/BECChipGroup.vue";

@Component({
  components: { DoughnutChart, BECChipGroup, LandingOptions },
})
export default class ProjectCard extends Vue {
  @Prop() project!: Project;

  options = false;
  cardOverlay = false;

  get title() {
    return this.project.title;
  }
  get co2Values(): ChartData[] {
    return this.project.co2Values.map((c) => ({
      label: c.label,
      value: this.convertKgToTonnes(c.value),
      color: c.color,
    }));
  }
  get co2Total() {
    return this.project.totalCO2e;
  }

  get branchDate() {
    const branchDate = new Date(Date.parse(this.project.projectDate));
    const enGBFormatter = new Intl.DateTimeFormat("en-GB");
    const branchDateFormatted = enGBFormatter.format(branchDate);
    return branchDateFormatted;
  }

  get newMainAvailable() {
    return this.project.newMainAvailable;
  }
  get link() {
    return this.project.link;
  }
  get category() {
    return this.project.category;
  }

  @Emit("delete")
  checkDelete() {
    return this.project.branchId;
  }

  @Emit("edit")
  edit() {
    return this.project.id;
  }

  convertKgToTonnes(value: number) {
    // converts kg to tonnes and rounds to 2 dp
    return Math.round(value * 0.001);
  }

  @Emit("open")
  open() {
    return this.project.id;
  }
}
</script>
<style scoped>
.limit-lines {
  display: -webkit-box; /* or inline-block */
  overflow: hidden;
  max-height: 4em;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
