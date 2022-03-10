<template>
  <div>
    <div v-if="volCalculated">
      <strong>Volume automatically calculated as:</strong><br />
      <v-chip class="text-center">{{ displayVolume }}m<sup>3</sup></v-chip>
    </div>
    <div v-else>
      <strong>Volume being calculated</strong><br />
      <v-progress-circular
        indeterminate
        color="primary"
        :size="100"
      ></v-progress-circular>
    </div>
  </div>
</template>
<script lang="ts">
import { CalcModes } from "@/models/newAssessment";
import { Vue, Component, Watch, Emit, Prop } from "vue-property-decorator";

type CalcMode = {
  name: string;
  id: CalcModes;
};

@Component
export default class Menu4 extends Vue {
  @Prop() objWithProp!: number;
  @Prop() totalVolume!: number;
  calcMode = null;
  convFact = null;

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

  @Watch("calcMode")
  @Emit("calcChange")
  calcChange() {
    return this.calcMode;
  }
}
</script>
