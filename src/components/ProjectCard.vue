<template>
  <v-main>
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>{{ co2Total }} tCO2e</v-card-subtitle>
      <v-card-text>
        <DoughnutChart :data="co2Values" />
      </v-card-text>
      <v-card-actions>
        <v-chip outlined>{{ category }}</v-chip>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon color="secondary">
            <v-icon>mdi-cog</v-icon>
          </v-btn>
          <v-btn icon color="secondary">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
          <v-btn icon color="secondary">
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-main>
</template>
<script lang="ts">
import "@arc-web/components/dist/components/button/arc-button.js";

import { Vue, Component, Prop } from "vue-property-decorator";

import { Project } from "@/models/project";
import DoughnutChart from "./charts/DoughnutChart.vue";

@Component({
  components: { DoughnutChart },
})
export default class ProjectCard extends Vue {
  @Prop() project!: Project;

  get title() {
    return this.project.title;
  }
  get co2Values() {
    return this.project.co2Values;
  }
  get co2Total() {
    return this.project.co2Values
      .map((c) => c.value)
      .reduce((prev, curr) => prev + curr);
  }
  get link() {
    return this.project.link;
  }
  get category() {
    return this.project.category;
  }
}
</script>
