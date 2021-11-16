<template>
  <v-main class="page">
      <div class="titles">
        <h1 class="text-h2">Estimate the equivalent carbon emissions of your design</h1>
        <h2 class="text-h4 primary-text">Browse your existing assessments below or create a new assessment from Speckle</h2>
      </div>
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface Project {
  title: string;
  co2Values: number[];
  link: string;
}

@Component({})
export default class Landing extends Vue {
  projects: Project[] = [
    {
      title: "Super great project",
      co2Values: [50, 20, 10],
      link: "",
    },
    {
      title: "Imaginary project 3",
      co2Values: [50, 20, 10],
      link: "",
    },
    {
      title: "Some other project",
      co2Values: [50, 20, 10],
      link: "",
    },
  ];
}
</script>
<style scoped>
.titles {
    width: 70%;
}
.page {
    margin-left: 4rem;
    margin-right: 4rem;
}
</style>
