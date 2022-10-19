<template>
  <div style="width: 100%" class="d-flex justify-center">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="200"
    ></v-progress-circular>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LoadingSpinner extends Vue {}
</script>
