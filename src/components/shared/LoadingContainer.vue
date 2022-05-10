<template>
  <div>
    <div v-if="!loading && !error">
      <slot></slot>
    </div>
    <loading-spinner v-else-if="loading && !error" />
    <error-retry v-else @retry="retry" />
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

  @Emit("retry")
  retry() {
    return;
  }
}
</script>
