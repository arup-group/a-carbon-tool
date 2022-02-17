<template>
  <v-sheet
    outlined
    rounded
    color="primary"
    class="d-flex justify-center align-center"
  >
    <v-card style="width: 100%; overflow-y: scroll; height: 85vh">
      <v-card-title class="">New Assessment</v-card-title>
      <v-stepper v-model="step" vertical>
        <v-stepper-step
          :complete="completed"
          step="1"
          @click.native="step = 1"
          color="secondary darken-2"
        >
          Data
        </v-stepper-step>
        <v-stepper-content step="1">
          <Menu1b
            v-if="streams.length !== 0"
            @loadStream="loadStream"
            @uploadData="uploadData"
            :streams="streams"
            :step="step"
            :becs="becs"
          />
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="2"
          @click.native="step = 2"
          color="secondary darken-2"
        >
          Materials
        </v-stepper-step>
        <v-stepper-content step="2">
          <Menu2
            :types="types"
            :materials="materials"
            @materialUpdated="materialUpdated"
          />
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="3"
          @click.native="step = 3"
          color="secondary darken-2"
        >
          Transport
        </v-stepper-step>
        <v-stepper-content step="3">
          <Menu3
            @transportSelected="transportSelected"
            :transportTypes="transportTypes"
            :types="types"
          />
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="4"
          @click.native="step = 4"
          color="secondary darken-2"
        >
          Quantities
        </v-stepper-step>
        <v-stepper-content step="4">
          <menu-4 :totalVolume="totalVolume" />
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="5"
          @click.native="step = 5"
          color="secondary darken-2"
        >
          Review
        </v-stepper-step>
        <v-stepper-content step="5">
          <menu-5 :emptyProps="emptyProps" />
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="6"
          @click.native="step = 6"
          color="secondary darken-2"
        >
          Preview
        </v-stepper-step>
        <v-stepper-content step="6">
          <menu-6 :report="report" />
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="7"
          @click.native="step = 7"
          color="secondary darken-2"
        >
          Report
        </v-stepper-step>
        <v-stepper-content step="7">
          <menu-7 :canSave="canSave" @checkSave="checkSave" />
        </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-sheet>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import Menu1b from "./Menu1b.vue";
import Menu2 from "./Menu2.vue";
import Menu3 from "./Menu3.vue";
import Menu4 from "./Menu4.vue";
import Menu5 from "./Menu5.vue";
import Menu6 from "./Menu6.vue";
import Menu7 from "./Menu7.vue";
import {
  ProjectDataComplete,
  MaterialUpdateOut,
  SpeckleType,
  Step,
  TransportSelected,
  TransportType,
  EmptyPropsPassdown,
  ReportPassdown,
} from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";

@Component({
  components: { Menu1b, Menu2, Menu3, Menu4, Menu5, Menu6, Menu7 },
})
export default class AssessmentStepper extends Vue {
  @Prop() streams!: any;
  @Prop() types!: SpeckleType[];
  @Prop() materials!: MaterialFull[];
  @Prop() transportTypes!: TransportType[];
  @Prop() totalVolume!: number;
  @Prop() emptyProps!: EmptyPropsPassdown;
  @Prop() report!: ReportPassdown;
  @Prop() becs!: string;

  completed = false;
  step: Step = 1;

  get canSave() {
    return this.report ? true : false;
  }

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

  @Emit("uploadData")
  uploadData(data: ProjectDataComplete) {
    return data;
  }

  @Watch("step")
  @Emit("stepperUpdate")
  stepperUpdate(step: Step) {
    return step;
  }

  @Emit("checkSave")
  checkSave() {
    return;
  }
}
</script>
