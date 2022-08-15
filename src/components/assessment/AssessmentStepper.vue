<template>
  <v-sheet
    outlined
    rounded
    color="primary"
    class="d-flex justify-center align-center"
  >
    <v-card style="width: 100%; height: 85vh">
      <v-card-title style="height: 50px" class="d-flex justify-space-between">
        <div>New Assessment</div>
        <v-btn v-if="modal" @click="openFullView">Open in full view</v-btn>
        <v-btn v-if="modal" @click="close">Close</v-btn>
      </v-card-title>
      <v-stepper
        style="overflow-y: scroll; height: 77vh"
        v-model="step"
        vertical
      >
        <v-stepper-step
          step="1"
          color="secondary darken-2"
          :complete="completed"
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
            :form="form"
            :streamId="streamId"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn :style="colStyle" @click="step = 2" color="primary">
              Next
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-step
          step="2"
          color="secondary darken-2"
          :complete="completed"
        >
          Materials
        </v-stepper-step>
        <v-stepper-content step="2">
          <Menu2
            :types="types"
            :materials="materials"
            :selectedObjects="selectedObjects"
            @materialUpdated="materialUpdated"
            @createNewGroup="createNewGroup"
            @selectMaterial="selectMaterial"
          />
          <v-card-actions>
            <v-btn :style="colStyle" @click="step = 1" color="primary">
              Previous
            </v-btn>
            <v-spacer />
            <v-btn :style="colStyle" @click="step = 3" color="primary">
              Next
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="3"
          color="secondary darken-2"
        >
          Transport
        </v-stepper-step>
        <v-stepper-content step="3">
          <Menu3
            @transportSelected="transportSelected"
            :transportTypes="transportTypes"
            :groupedMaterials="groupedMaterials"
          />
          <v-card-actions>
            <v-btn :style="colStyle" @click="step = 2" color="primary">
              Previous
            </v-btn>
            <v-spacer />
            <v-btn :style="colStyle" @click="step = 4" color="primary">
              Next
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="4"
          color="secondary darken-2"
        >
          Quantities
        </v-stepper-step>
        <v-stepper-content step="4">
          <menu-4
            @calcVol="calcVol"
            :totalVolume="totalVolume"
            :speckleVol="speckleVol"
          />
          <v-card-actions>
            <v-btn :style="colStyle" @click="step = 3" color="primary">
              Previous
            </v-btn>
            <v-spacer />
            <v-btn :style="colStyle" @click="step = 5" color="primary">
              Next
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="5"
          color="secondary darken-2"
        >
          Review
        </v-stepper-step>
        <v-stepper-content step="5">
          <menu-5
            :colStyle="colStyle"
            @stepPlus="stepPlus"
            @stepMinus="stepMinus"
            :emptyProps="emptyProps"
          />
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="6"
          color="secondary darken-2"
        >
          Preview
        </v-stepper-step>
        <v-stepper-content step="6">
          <menu-6 :report="report" :floorArea="floorArea" />
          <v-card-actions>
            <v-btn :style="colStyle" @click="step = 5" color="primary">
              Previous
            </v-btn>
            <v-spacer />
            <v-btn :style="colStyle" @click="step = 7" color="primary">
              Next
            </v-btn>
          </v-card-actions>
        </v-stepper-content>
        <v-stepper-step
          :complete="completed"
          step="7"
          color="secondary darken-2"
        >
          Save
        </v-stepper-step>
        <v-stepper-content step="7">
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-textarea v-model="form.notes" label="Notes"></v-textarea>
              </v-col>
              <v-col cols="12" class="d-flex justify-space-between">
                <v-btn :style="colStyle" @click="step = 6" color="primary">
                  Previous
                </v-btn>
                <menu-7
                  :colStyle="colStyle"
                  :canSave="canSave"
                  @checkSave="checkSave"
                />
              </v-col>
            </v-row>
            <v-spacer />
          </v-card-actions>
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
  ProjectDataTemp,
  MaterialUpdateOut,
  SpeckleType,
  Step,
  TransportSelected,
  TransportType,
  EmptyPropsPassdown,
  ReportPassdown,
  GroupedMaterial,
  SelectedMaterialEmit,
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
  @Prop() groupedMaterials!: GroupedMaterial[];
  @Prop() speckleVol!: boolean;

  @Prop() update!: boolean;
  @Prop() streamId!: string;
  @Prop() projectData!: ProjectDataComplete;

  @Prop() modal!: boolean;

  @Prop() selectedObjects!: string[];

  form: ProjectDataTemp = this.update
    ? this.projectData
    : {
        name: null,
        components: null,
        cost: null,
        floorArea: null,
        region: null,
        jobNumber: null,
        notes: null,
      };
  completed = this.update;

  step: Step = 1;

  stepPlus() {
    this.step += 1;
    return this.step;
  }

  stepMinus() {
    this.step -= 1;
    return this.step;
  }

  get floorArea() {
    return this.form.floorArea;
  }

  get colStyle() {
    if (this.$store.state.darkMode)
      return {
        "background-color": "#1C1C1C !important",
        color: "#FFFFFF !important",
        border: "thin solid",
      };
    else {
      return {
        "background-color": "#FFFFFF !important",
        color: "#1C1C1C !important",
        border: "thin solid",
      };
    }
  }

  get canSave() {
    return this.report ? true : false;
  }

  @Emit("createNewGroup")
  createNewGroup(groupName: string) {
    return groupName;
  }

  @Emit("openFullView")
  openFullView() {
    return;
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

  @Emit("selectMaterial")
  selectMaterial(material: SelectedMaterialEmit) {
    return material;
  }

  @Emit("clearMaterial")
  clearMaterial() {
    return;
  }


  @Emit("uploadData")
  uploadData(data: ProjectDataComplete) {
    return data;
  }

  @Emit("close")
  close() {
    return;
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

  @Emit("calcVol")
  calcVol() {
    return;
  }
  @Watch("form.notes")
  notesUpdate() {
    this.uploadData({
      name: this.form.name ? this.form.name : "",
      components: this.form.components ? this.form.components : [],
      cost: this.form.cost ? +this.form.cost : 0,
      floorArea: this.form.floorArea ? +this.form.floorArea : 1,
      region: this.form.region ? this.form.region : "",
      jobNumber: this.form.jobNumber ? this.form.jobNumber : "",
      notes: this.form.notes ? this.form.notes : "",
    });
  }
}
</script>
