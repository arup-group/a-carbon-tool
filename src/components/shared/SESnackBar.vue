<template>
  <v-snackbar v-model="model" bottom right :color="snackColor" :timeout="-1">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="black" text v-bind="attrs" @click="close"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

@Component
export default class SESnackBar extends Vue {
  // SE = success, error
  @Prop() model!: boolean;
  @Prop() success!: boolean;
  @Prop() textSuccess!: string;
  @Prop() textError!: string;
  @Prop() color!: string;
  @Prop() timeout!: number;

  @Watch("model")
  modelChange(newVal: boolean) {
    if (newVal) {
      let time = this.timeout ? this.timeout : 4000;
      setTimeout(() => {
        this.close();
      }, time);
    }
  }

  get snackColor() {
    if (this.color) return this.color;
    else if (this.success) return "green";
    else if (this.success === false) return "error";
    else return "primary";
  }

  get text() {
    return this.success ? this.textSuccess : this.textError;
  }

  @Emit("close")
  close() {
    return;
  }
}
</script>
