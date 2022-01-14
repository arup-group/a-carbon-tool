<template>
  <v-main class="page">
    <v-card flat class="titles mt-6">
      <v-card-title class="text-h4">
        Welcome to act | a carbon tool
      </v-card-title>
      <v-card-subtitle>
        An open-source platform for performing embodied carbon emission calculations from Building Information Models through <a href='https://speckle.systems/' target='_blank' class='secondary--text'>Speckle</a>
      </v-card-subtitle>
    </v-card>
    <v-card flat class="grid mt-15">
      <project-card
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </v-card>
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
      co2Values: [
        {
          label: "some value 1",
          value: 50,
        },
        {
          label: "some value 2",
          value: 20,
        },
        {
          label: "some value 3",
          value: 10,
        },
      ],
      link: "",
      category: "Superstructure",
    },
    {
      title: "Imaginary project 3",
      co2Values: [
        {
          label: "some value 1",
          value: 50,
        },
        {
          label: "some value 2",
          value: 20,
        },
        {
          label: "some value 3",
          value: 10,
        },
      ],
      link: "",
      category: "Substructure",
    },
    {
      title: "Some other project",
      co2Values: [
        {
          label: "some value 1",
          value: 50,
        },
        {
          label: "some value 2",
          value: 20,
        },
        {
          label: "some value 3",
          value: 10,
        },
      ],
      link: "",
      category: "Services",
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
  grid-template-columns: 33% 33% 33%;
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>
