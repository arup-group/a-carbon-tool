<template>
  <div class="d-flex align-center flex-column" style="width: 100%">
    <p>Error</p>
    <v-btn color="primary" style="color: black" @click="retry">Retry</v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component
export default class LandingError extends Vue {
  @Emit("retry")
  retry() {
    return;
  }
}
</script>
