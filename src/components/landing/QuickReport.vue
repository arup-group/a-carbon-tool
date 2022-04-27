<template>
  <v-dialog
    v-model="dialog"
    max-width="50%"
    persistent
  >
    <assessment
      :key="key"
      :modal="true"
      :modalStreamid="streamid"
      :modalBranchName="branchName"
      @close="close"
    />
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import Assessment from "@/views/Assessment.vue";

@Component({
  components: { Assessment },
})
export default class QuickReport extends Vue {
  @Prop() dialog!: boolean;
  @Prop() streamid!: string;
  @Prop() branchName!: string;
  key = 1;

  @Watch("branchName")
  forceReload() {
    this.key++;
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>
<style>
/* REMOVE BELOW IF DIALOG OVERFLOWS ARE NOT WORKING PROPERLY */
.v-dialog {
  overflow-y: visible;
}
</style>
