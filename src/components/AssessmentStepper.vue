<template>
  <v-container class="d-flex justify-center align-center">
    <v-card style="width: 100%; overflow-y: scroll; height: 85vh">
      <v-card-title class="">New Assessment</v-card-title>
      <v-stepper v-model="step" vertical>
        <v-stepper-step :complete="completed" step="1" @click.native="step = 1">
          Data
        </v-stepper-step>
        <v-stepper-content step="1">
          <Menu1b
            @loadStream="loadStream"
            v-if="streams.length !== 0"
            :streams="streams"
          />
        </v-stepper-content>
        <v-stepper-step :complete="completed" step="2" @click.native="step = 2">
          Materials
        </v-stepper-step>
        <v-stepper-content step="2">
          <Menu2
            :types="types"
            :materials="materials"
            @materialUpdated="materialUpdated"
          />
        </v-stepper-content>
        <v-stepper-step :complete="completed" step="3" @click.native="step = 3">
          Transport
        </v-stepper-step>
        <v-stepper-content step="3">
          <Menu3
            @transportSelected="transportSelected"
            :transportTypes="transportTypes"
            :types="types"
        /></v-stepper-content>
        <v-stepper-step :complete="completed" step="4" @click.native="step = 4">
          Quantities
        </v-stepper-step>
        <v-stepper-content step="4"><menu-4 :totalVolume="totalVolume" /></v-stepper-content>
        <v-stepper-step :complete="completed" step="5" @click.native="step = 5">
          Review
        </v-stepper-step>
        <v-stepper-content step="5"><menu-5 /></v-stepper-content>
        <v-stepper-step :complete="completed" step="6" @click.native="step = 6">
          Preview
        </v-stepper-step>
        <v-stepper-content step="6"> </v-stepper-content>
        <v-stepper-step :complete="completed" step="7" @click.native="step = 7">
          Report
        </v-stepper-step>
        <v-stepper-content step="7"> </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import Menu1b from "@/components/Menu1b.vue";
import Menu2 from "@/components/Menu2.vue";
import Menu3 from "@/components/Menu3.vue";
import Menu4 from "./Menu4.vue";
import Menu5 from "./Menu5.vue";
import {
  MaterialUpdateOut,
  SpeckleType,
  Step,
  TransportSelected,
  TransportType,
} from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";

@Component({
  components: { Menu1b, Menu2, Menu3, Menu4, Menu5 },
})
export default class AssessmentStepper extends Vue {
  @Prop() streams!: any;
  @Prop() types!: SpeckleType[];
  @Prop() materials!: MaterialFull[];
  @Prop() transportTypes!: TransportType[];
  @Prop() totalVolume!: number;

  completed = false;
  step: Step = 1;

  @Emit("materialUpdated")
  materialUpdated(material: MaterialUpdateOut) {
    return material;
  }

  @Emit("loadStream")
  loadStream(id: string) {
    return id;
  }

  @Emit("transportSelected")
  transportSelected(selected: TransportSelected) {
    return selected;
  }

  @Watch("step")
  @Emit("stepperUpdate")
  stepperUpdate(step: Step) {
    return step;
  }
}
</script>
