<template>
  <v-chip :color="color" style="color: black">{{ category }}</v-chip>
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
}

@Component
export default class BECChip extends Vue {
  @Prop() category!: BECCategory;

  get color() {
    return this.becs.find((b) => b.name === this.category)?.color;
  }

  becs: BEC[] = [
    {
      name: "Superstructure",
      color: "#CD9CE3",
    },
    {
      name: "Substructure",
      color: "#ED90CB",
    },
    {
      name: "Mechanical Services",
      color: "#52C4BA",
    },
    {
      name: "Electrical Services",
      color: "#77DCCC",
    },
    {
      name: "Public Health & Hydraulics",
      color: "#BFF7EA",
    },
    {
      name: "Space plan",
      color: "#6CC9F6",
    },
    {
      name: "Building Envelope",
      color: "#C3EAFE",
    },
  ];
}
</script>
