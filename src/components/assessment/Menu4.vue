<template>
  <div>
    <div v-if="speckleVol">
      <strong>Volume automatically calculated as:</strong><br />
      <v-chip class="text-center">{{ displayVolume }}m<sup>3</sup></v-chip>
    </div>
    <div v-else>
      <p>
        <b>
          No volume properties on speckle objects! Do you want to calculate
          volume from model?
        </b>
      </p>
      <p>Model assumed to be in m<sup>3</sup></p>
      <v-btn color="primary" outlined @click="calcVol">Calculate</v-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit, Prop } from "vue-property-decorator";

@Component
export default class Menu4 extends Vue {
  @Prop() objWithProp!: number;
  @Prop() totalVolume!: number;
  @Prop() speckleVol!: boolean;

  get volCalculated() {
    return this.totalVolume !== -1;
  }

  get displayVolume() {
    return Math.round(this.totalVolume * 100) / 100;
  }

  calcVol() {
    throw new Error("we do not support calculating volume on the model. Volume props must be supplied");
  }
}
</script>
