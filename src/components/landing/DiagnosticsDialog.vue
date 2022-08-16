<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card>
      <v-card-title>Diagnostics tool</v-card-title>
      <v-card-subtitle
        >The stream is broken, please follow the below steps</v-card-subtitle
      >
      <v-card-text style="height: 100%">
        <div v-if="detectStep" class="d-flex justify-center align center">
          <v-btn color="primary" outlined @click="detect">Find issues</v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" outlined @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

enum Step {
  DETECT = 0,
  FIX = 1,
  CHECK = 2,
}

@Component
export default class DiagnosticsDialog extends Vue {
  @Prop() dialog!: boolean;
  @Prop() streamid!: string;

  step = Step.DETECT; // three steps

  detect() {
    console.log("detect");
  }

  get detectStep() {
    return this.step === Step.DETECT;
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>
