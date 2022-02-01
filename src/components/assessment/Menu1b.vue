<template>
  <v-form v-model="isFormValid">
    <v-card-text>
      <v-combobox
        v-model="speckleStream"
        label="Speckle Stream"
        :items="streams"
        :item-text="(streams) => streams['label']"
        @change="streamSelected"
        required
      ></v-combobox>
      <v-text-field
        v-model="form.name"
        label="Project name"
        required
      ></v-text-field>
      <v-select
        v-model="form.component"
        :items="items_comp"
        :rules="selectionRules"
        label="Primary element category"
      ></v-select>
      <v-text-field
        v-model="form.cost"
        :rules="valueRules"
        label="System cost (£)"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.floorArea"
        label="System gross floor area (m2)"
        :rules="valueRules"
        required
      ></v-text-field>
    </v-card-text>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { ProjectDataComplete, ProjectDataTemp, Step, StreamObject } from "@/models/newAssessment";

@Component({})
export default class Menu1b extends Vue {
  @Prop() streams!: StreamObject;
  @Prop() step!: Step;

  form: ProjectDataTemp = {
    name: null,
    component: null,
    cost: null,
    floorArea: null,
  };
  speckleStream!: StreamObject;

  streamSelected() {
    try {
      const id = this.speckleStream.value;
      if (id !== undefined) {
        this.loadStream(id);
      }
    } catch (error) {
      console.error(error);
    }
  }
  @Emit("loadStream")
  loadStream(id: string) {
    return id;
  }
  items_comp = [
    "Substructure",
    "Superstructure",
    "Mechanical Services",
    "Electrical Services",
    "Public Health & Hydraulics",
    "Skin",
    "Space Plan",
  ];
  isFormValid = false;
  // textRules = [(v: string) => !!v || "Text is required"];
  selectionRules = [(v: string) => !!v || "Input is required"];
  valueRules = [
    (v: number) => Number.isInteger(Number(v)) || "Number is required",
  ];

  @Watch("step")
  stepChanged(newVal: Step, oldVal: Step) {
    if (newVal !== Step.DATA && oldVal === Step.DATA && this.isFormValid) {
      // if the step moves on from this form and the form is valid
      this.uploadData();
    }
  }

  @Emit("uploadData")
  uploadData(): ProjectDataComplete {
    return {
      name: this.form.name ? this.form.name : "",
      component: this.form.component ? this.form.component : "",
      cost: this.form.cost ? +this.form.cost : 0,
      floorArea: this.form.floorArea ? +this.form.floorArea : 0,
    };
  }
}
</script>
