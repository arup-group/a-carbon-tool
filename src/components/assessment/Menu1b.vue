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
      <v-text-field
        v-model="form.jobNumber"
        label="Job number"
        required
      ></v-text-field>
      <v-row>
        <v-col cols="9">
          <v-select
            v-model="form.region"
            :items="availableRegions()"
            item-text="name"
            item-value="key"
            :rules="selectionRules"
            label="Region"
            required
          ></v-select>
        </v-col>
        <v-col cols="3" class="d-flex align-center">
          <v-btn fab small @click="addRegion">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-select
        v-model="form.components"
        :items="becs"
        :item-text="(types) => types['name']"
        :item-value="(types) => types"
        :rules="selectionRules"
        label="Primary element category"
        multiple
        required
        chips
      >
        <template #selection="{ item }">
          <v-chip :color="item.backgroundColor" :text-color="item.color">
            {{ item.name }}
          </v-chip>
        </template>
      </v-select>
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

    <excel-import-dialog :key="excelImportKey" :dialog="excelImportDialog" :streamId="streamId" @close="closeAddData" />
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import {
  ProjectDataComplete,
  ProjectDataTemp,
  Step,
  StreamObject,
} from "@/models/newAssessment";
import store from "@/store";

import ExcelImportDialog from "@/components/shared/ExcelImportDialog.vue";

@Component({
  components: { ExcelImportDialog }
})
export default class Menu1b extends Vue {
  @Prop() streams!: StreamObject[];
  @Prop() step!: Step;
  @Prop() becs!: string[];
  @Prop() form!: ProjectDataTemp;
  @Prop() streamId!: string;

  excelImportDialog = false;
  excelImportKey = 1;

  speckleStream: StreamObject | null = this.defaultSpeckleStream();
  defaultSpeckleStream() {
    if (this.streamId) {
      const stream = this.streams?.find((s) => s.value === this.streamId);
      return stream ? stream : null;
    }
    return null;
  }

  streamSelected() {
    try {
      if (this.speckleStream) {
        const id = this.speckleStream.value;
        if (id !== undefined) {
          this.loadStream(id);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  @Emit("loadStream")
  loadStream(id: string) {
    return id;
  }
  isFormValid = false;

  availableRegions() {
    return store.state.availableRegions;
  }

  multipleSelectionRules = [(v: string[]) => !!v.length || "Input is required"];
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
      components: this.form.components ? this.form.components : [],
      cost: this.form.cost ? +this.form.cost : 0,
      floorArea: this.form.floorArea ? +this.form.floorArea : 1,
      region: this.form.region ? this.form.region : "",
      jobNumber: this.form.jobNumber ? this.form.jobNumber : "",
      notes: this.form.notes ? this.form.notes : "",
    };
  }

  addRegion() {
    this.excelImportDialog = true;
  }
  closeAddData() {
    this.excelImportKey++;
    this.excelImportDialog = false;
  }
}
</script>
