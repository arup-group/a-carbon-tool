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
          </v-row>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions style="margin-bottom: auto">
          <v-row class="mx-auto">
            <v-col cols="12" align="center">
              <v-card flat width="80%">
                <DoughnutChart :data="co2Values" :chartData="{}" />
              </v-card>
            </v-col>
          </v-row>
          <!-- a warning appears if `chartData` is not passed in. The prop is not used -->
        </v-card-actions>
        <v-container style="margin-top: auto">
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <div>
              <landing-options @delete="checkDelete" />
              <v-select
                :menu-props="{ value: options }"
                v-if="options"
                :items="['one', 'two']"
              />
              <v-btn icon color="primary">
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
              <v-btn icon color="primary" @click="open">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </v-card-actions>
        </v-container>
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
    return this.convertKgToTonnes(this.project.totalCO2e).toLocaleString('en');
  }
  get link() {
    return this.project.link;
  }
  get category() {
    return this.project.category;
  }

  @Emit("delete")
  checkDelete() {
    return this.project.id;
  }

  convertKgToTonnes(value: number) {
    // converts kg to tonnes and rounds to 2 dp
    return Math.round(value * 0.001);
  }

  open() {
    // MAY NEED TO UPDATE DEPENDING ON HOW ASSESSMENT/VIEW ENDS UP WORKING
    this.$router.push(`/assessment/view/${this.project.id}`);
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
