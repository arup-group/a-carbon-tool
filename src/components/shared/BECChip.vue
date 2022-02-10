<template>
  <v-chip
    :color="backgroundColor"
    :style="`color: ${color}; text-overflow: ellipsis; overflow: hidden;`"
  >
    <span class="text-truncate">{{ category }}</span>
  </v-chip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { BEC, BECName } from "@/models/shared";

@Component
export default class BECChip extends Vue {
  @Prop() category!: BECName;

  get backgroundColor() {
    return this.becs.find((b) => b.name === this.category)?.backgroundColor;
  }
  get color() {
    return this.becs.find((b) => b.name === this.category)?.color;
  }

  get becs(): BEC[] {
    return this.$store.state.becs;
  }
}
</script>
