<template>
  <v-row class="pb-2 pr-4 d-flex align-center">
    <v-spacer></v-spacer>
    <span class="mr-4 grey--text">
      Page {{ page }} of {{ numberOfPages }}
    </span>
    <v-btn
      color="primary"
      outlined
      class="mr-1"
      @click="formerPage"
      :disabled="formerDisabled"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      color="primary"
      outlined
      class="ml-1"
      @click="nextPage"
      :disabled="nextDisabled"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-row>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class LandingFooter extends Vue {
  @Prop() page!: number;
  @Prop() numberOfPages!: number;

  get formerDisabled() {
    return this.page === 1;
  }
  get nextDisabled() {
    return this.page === this.numberOfPages;
  }

  @Emit("formerPage")
  formerPage() {
    return;
  }
  @Emit("nextPage")
  nextPage() {
    return;
  }
}
</script>
