<template>
  <v-toolbar flat rounded outlined class="my-4">
    <v-combobox
      v-model="search"
      flat
      solo
      hide-details
      clearable
      label="Search"
      prepend-inner-icon="mdi-magnify"
      :items="projectDisplay"
      @change="searchSelected"
    ></v-combobox>
  </v-toolbar>
</template>
<script lang="ts">
import { Project } from "@/models/project";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class LandingSearch extends Vue {
  @Prop() projects!: Project[];

  search = null;

  get projectDisplay() {
    return this.projects.map((p) => p.title);
  }

  @Emit("projectSearch")
  searchSelected() {
    const found = this.projects.find((p) => p.title === this.search);
    return found;
  }
}
</script>
