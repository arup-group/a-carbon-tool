<template>
  <div>
    <div v-if="speckleVol">
      <strong>Volume automatically calculated as:</strong><br />
      <v-chip class="text-center">{{ displayVolume }}m3</v-chip>
    </div>
    <div v-else>
      <p>No volume props on speckle objects, calculate volume from model?</p>
      <p>Model assumed to be in m<sup>3</sup></p>
      <v-btn color="primary" outlined @click="calcVol">Calculate</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { CalcModes } from "@/models/newAssessment";
import { Vue, Component, Emit, Prop } from "vue-property-decorator";

type CalcMode = {
  name: string;
  id: CalcModes;
};

@Component
export default class Menu4 extends Vue {
  @Prop() objWithProp!: number;
  @Prop() totalVolume!: number;
  @Prop() speckleVol!: boolean;
  calcMode = null;

  calcModes: CalcMode[] = [
    { name: "Using an Object's volume property", id: 0 },
    { name: "Try calculating volumes automatically", id: 1 },
  ];

  get volCalculated() {
    return this.totalVolume !== -1;
  }

  get displayVolume() {
    return Math.round(this.totalVolume * 100) / 100;
  }

  @Emit("calcVol")
  calcVol() {
    return;
  }
}
</script>
