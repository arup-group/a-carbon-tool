<template>
  <v-chip :color="backgroundColor" :style="`color: ${color}`">{{ category }}</v-chip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

type BECCategory =
  | "Superstructure"
  | "Substructure"
  | "Mechanical Services"
  | "Electrical Services"
  | "Public Health & Hydraulics"
  | "Space plan"
  | "Building Envelope";
export interface BEC {
  name: BECCategory;
  color: string;
  backgroundColor: string;
}

@Component
export default class BECChip extends Vue {
  @Prop() category!: BECCategory;

  get backgroundColor() {
    return this.becs.find((b) => b.name === this.category)?.backgroundColor;
  }
  get color() {
    return this.becs.find((b) => b.name === this.category)?.color;
  }

  becs: BEC[] = [
    {
      name: "Superstructure",
      color: "white",
      backgroundColor: "#224a63",
    },
    {
      name: "Substructure",
      color: "black",
      backgroundColor: "#aeebdb",
    },
    {
      name: "Mechanical Services",
      color: "black",
      backgroundColor: "#f0b4b4",
    },
    {
      name: "Electrical Services",
      color: "white",
      backgroundColor: "#754792",
    },
    {
      name: "Public Health & Hydraulics",
      color: "black",
      backgroundColor: "#dbb5ea",
    },
    {
      name: "Space plan",
      color: "white",
      backgroundColor: "#4b97d2",
    },
    {
      name: "Building Envelope",
      color: "black",
      backgroundColor: "#82c7f1",
    },
  ];
}
</script>
