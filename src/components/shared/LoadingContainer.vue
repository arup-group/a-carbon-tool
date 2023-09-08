<template>
  <div>
    <div v-if="!loading && !error" style="width: 100%">
      <slot v-bind:loaded="loaded">{{ loaded }}</slot>
    </div>
    <loading-spinner v-else-if="loading && !error && !line" />
    <div v-else-if="line">
      <v-progress-linear
        :active="loading"
        :indeterminate="loading"
        absolute
        color="primary"
      ></v-progress-linear>
    </div>
    <error-retry v-else :errorMessage="errorMessage" @retry="retry" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import LoadingSpinner from "./LoadingSpinner.vue";
import ErrorRetry from "./ErrorRetry.vue";

@Component({
  components: { LoadingSpinner, ErrorRetry },
})
export default class LoadingContainer extends Vue {
  @Prop() loading!: boolean;
  @Prop() error!: boolean;
  @Prop() errorMessage!: string;
  @Prop() line!: boolean;

  get loaded() {
    return !this.loading && !this.error;
  }

  @Emit("retry")
  retry() {
    return;
  }
}
</script>
