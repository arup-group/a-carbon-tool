<template>
    <v-content>
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-subtitle>{{ co2Total }}</v-card-subtitle>

            <v-card-actions></v-card-actions>
        </v-card>
    </v-content>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

// TODO: move to shared file
interface Project {
  title: string;
  co2Values: number[];
  link: string;
}

@Component({})
export default class ProjectCard extends Vue {
    @Prop() project!: Project;

    get title() {
        return this.project.title;
    }
    get co2Values() {
        return this.project.co2Values;
    }
    get co2Total() {
        return this.project.co2Values.reduce((acc, a) => acc + a);
    }
    get link() {
        return this.project.link;
    }
}
</script>