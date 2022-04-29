<template>
  <v-sheet outlined color="primary" rounded height="100%">
    <v-card flat height="100%">
      <v-card-title>Filters</v-card-title>
      <v-card-text class="d-flex">
        <v-checkbox v-model="materials" label="Materials graph" class="mr-4" />
        <v-checkbox v-model="a15" label="A1-5 graph" class="mr-4" />
        <v-checkbox v-model="categories" label="Categories" class="mr-4" />
        <v-checkbox v-model="renderer" label="Renderer" class="mr-4" />
        <v-switch v-model="direction" :label="directionLabel" />
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
<script lang="ts">
import { HistoryFilterOptions, HistoryProjectCardDirection } from "@/models/assessmentHistory";
import { Vue, Component, Watch, Emit, Prop } from "vue-property-decorator";

@Component
export default class HistoryFilters extends Vue {
  @Prop() defaultFilters!: HistoryFilterOptions;

  filters: HistoryFilterOptions = {
    materials: true,
    a15: true,
    categories: true,
    renderer: true,
    direction: HistoryProjectCardDirection.COL,
  };

  mounted() {
    if (this.defaultFilters) {
      this.filters = { ...this.defaultFilters }; // spread used to force copying of values rather than copying reference
    }
  }

  @Watch("materials")
  @Emit("materials")
  emitMaterials() {
    return this.filters.materials;
  }

  @Watch("a15")
  @Emit("a15")
  emitA15() {
    return this.filters.a15;
  }

  @Watch("categories")
  @Emit("categories")
  emitCategories() {
    return this.filters.categories;
  }

  @Watch("direction")
  @Emit("direction")
  emitDirection() {
    return this.filters.direction;
  }

  @Watch("renderer")
  @Emit("renderer")
  emitRenderer() {
    return this.filters.renderer;
  }

  get materials() {
    return this.filters.materials;
  }
  set materials(val) {
    this.filters.materials = val;
  }
  get a15() {
    return this.filters.a15;
  }
  set a15(val) {
    this.filters.a15 = val;
  }
  get categories() {
    return this.filters.categories;
  }
  set categories(val) {
    this.filters.categories = val;
  }
  get direction() {
      return this.filters.direction === HistoryProjectCardDirection.COL;
  }
  set direction(val) {
      this.filters.direction = val ? HistoryProjectCardDirection.COL : HistoryProjectCardDirection.ROW;
  }
  get renderer() {
    return this.filters.renderer;
  }
  set renderer(val) {
    this.filters.renderer = val;
  }

  get directionLabel() {
      return `Direction: ${this.filters.direction}`
  }
}
</script>
