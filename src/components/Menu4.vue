<template>
  <div>
    <v-select
      v-model="calcMode"
      label="How do you want to calculate object quantities?"
      :items="calcModes"
      :item-text="(item) => item['name']"
      :item-value="(item) => item['id']"
    ></v-select>
    <v-text-field
      label="Volume Conversion Factor"
      v-model="convFact"
    ></v-text-field>
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
  calcMode = null;
  convFact = null;

  calcModes: CalcMode[] = [
    { name: "Using an Object's volume property", id: 0 },
    { name: "Try calculating volumes automatically", id: 1 },
  ];

  @Watch("calcMode")
  @Emit("calcChange")
  calcChange() {
    return this.calcMode;
  }
}
</script>
