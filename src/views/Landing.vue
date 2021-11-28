<template>
  <v-main class="page">
    <div class="titles">
      <h1 class="text-h3 mb-5 mt-5">
        Estimate the equivalent carbon emissions of your design
      </h1>
      <h2 class="text-h4 secondary-text">
        Browse your existing assessments below or create a new assessment from
        Speckle
      </h2>
    </div>
    <div class="grid">
        <project-card
          v-for="project in projects"
          :key="project.title"
          :project="project"
        />
      </div>
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProjectCard from "../components/ProjectCard.vue";
import { Project } from "@/models/project";

@Component({
  components: { ProjectCard },
})
export default class Landing extends Vue {
  projects: Project[] = [
    {
      title: "Super great project",
      co2Values: [50, 20, 10],
      link: "",
      button: "Superstructure",
    },
    {
      title: "Imaginary project 3",
      co2Values: [50, 20, 10],
      link: "",
      button: "Substructure",
    },
    {
      title: "Some other project",
      co2Values: [50, 20, 10],
      link: "",
      button: "Services",
    },
    {
      title: "Some other project",
      co2Values: [50, 20, 10],
      link: "",
      button: "Services",
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

.grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>
