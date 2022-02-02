<template>
  <v-container>
    <v-sheet outlined color="primary" rounded class="my-1">
      <v-card flat height="600">
        <v-card-title>
          <v-row>
            <v-col cols="7">
              {{ title }}
            </v-col>
            <v-col cols="5" align="right">
              <v-chip :color="chipColor" style="color: black">{{
                category
              }}</v-chip>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row justify="start" class="text--primary" fill-height dense>
            <v-col cols="6"> {{ co2Total }} tCO2e </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-row class="mx-auto">
            <v-col cols="12" align="center">
              <v-card flat width="80%">
                <DoughnutChart :data="co2Values" :chartData="{}" />
              </v-card>
            </v-col>
          </v-row>
          <!-- a warning appears if `chartData` is not passed in. The prop is not used -->
        </v-card-actions>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn icon color="primary">
              <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-btn icon color="primary">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn icon color="primary" @click="open">
              <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { Project } from "@/models/project";
import DoughnutChart from "../charts/DoughnutChart.vue";
import { BEC } from "@/store/utilities/BECs";

@Component({
  components: { DoughnutChart },
})
export default class ProjectCard extends Vue {
  @Prop() project!: Project;
  @Prop() becs!: BEC[];

  get title() {
    return this.project.title;
  }
  get co2Values() {
    return this.project.co2Values;
  }
  get co2Total() {
    return Math.round(this.project.totalCO2e);
  }
  get link() {
    return this.project.link;
  }
  get category() {
    return this.project.category;
  }
  get chipColor() {
    const color = this.becs.find((b) => b.name === this.project.category);
    return color ? color.color : "primary";
  }

  open() {
    // MAY NEED TO UPDATE DEPENDING ON HOW ASSESSMENT/VIEW ENDS UP WORKING
    this.$router.push(`/assessment/view/${this.project.id}`);
  }
}
</script>