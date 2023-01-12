<template>
  <div style="width: 100%" class="d-flex justify-center flex-column align-center">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="200"
    ></v-progress-circular>
    <div v-if="text" class="pt-4">
      {{ text }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class LoadingSpinner extends Vue {
  @Prop() text!: string;
}
</script>
