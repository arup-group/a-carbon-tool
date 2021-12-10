<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between mb-5">
      <span class="text-h7">A1-5 BREAKDOWN</span>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-expand-transition>
      <v-card-text v-show="show">this is some stuff</v-card-text>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ABreakdownCard extends Vue {
  show = false;
}
</script>
