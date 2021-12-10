<template>
  <div class="d-flex">
    <v-btn x-large icon color="secondary">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-btn x-large icon color="secondary">
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
    <v-btn x-large icon color="secondary">
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ViewAssessmentButtons extends Vue {}
</script>
