<template>
  <div>
    <p>Volume automatically calculated as:</p>
    <p v-if="volCalculated" class="text-center">{{ displayVolume }}m3</p>
    <p v-else>Volume being calculated</p> <!-- ADD LOADING SPINNER/COMPONENT -->
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
