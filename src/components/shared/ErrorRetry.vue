<template>
  <div class="d-flex align-center flex-column" style="width: 100%">
    <p>Error</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <v-btn color="primary" style="color: black" @click="retry">Retry</v-btn>
    <template v-if="!isDashboard">
      <p class="mt-4">or</p>
      <v-btn color="primary" style="color: black" href="/">Return to dashboard</v-btn>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class ErrorRetry extends Vue {
  @Prop() errorMessage!: string;

  get isDashboard() {
    return this.$route.name === "Landing";
  }

  @Emit("retry")
  retry() {
    return;
  }
}
</script>
