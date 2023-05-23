<template>
  <v-main>
    <loading-spinner v-if="loading" :text="loadingSpinnerText" />
    <v-container
      v-else
      fluid
      class="d-flex justify-flex-start flex-row"
      style="margin: 10px; padding: 10px; width: 100%"
    >
      <div :style="modal ? 'width: 100%;' : 'width: 35%;'">
        <AssessmentStepper
          v-if="availableStreams.length !== 0"
          @loadStream="loadStream"
          @materialUpdated="materialUpdated"
          @stepperUpdate="stepperUpdate"
          @transportSelected="transportSelected"
          @uploadData="uploadData"
          @selectMaterial="selectMaterial"
          @checkSave="checkSave"
          @close="close"
          @openFullView="openFullView"
          @createNewGroup="createNewObjectGroup"
          @groupSelected="materialGroupSelected"
          @selectBuildup="selectBuildup"
          :modal="modal"
          :streams="availableStreams"
          :fullGroups="fullGroups"
          :materials="materials"
          :transportTypes="transportTypes"
          :totalVolume="totalVolume"
          :emptyProps="emptyProps"
          :report="report"
          :becs="becs"
          :transportGroups="reportController.transportGroups"
          :speckleVol="speckleVol"
          :update="update"
          :streamId="streamId"
          :projectData="projectDataPassdown"
          :selectedObjects="selectedObjects"
          :invalidSelectedObjects="invalidSelectedObjects"
          :objectGroups="objectGroups"
          :defaultGroup="selectedObjectGroup"
        />
      </div>
      <Renderer
        class="justify-flex-end"
        style="max-width: 75vw; max-height: 75vh"
        v-if="objectURLs.length !== 0 && !finished"
        @loaded="rendererLoaded"
        @objectsSelected="objectsSelected"
        :objecturls="objectURLs"
        :token="token"
        :colors="colors"
        :gradientColorProperty="volumeGradientPassdown"
        :display="!modal"
        :selectedIds="selectedIds"
        :filtered="filtered"
        :allIds="allIds"
        :loadingBar="false"
      />
    </v-container>
    <new-branch-dialog
      :dialog="newBranchDialog"
      :branchNames="branchNames"
      :reportName="reportName"
      :branchExistsError="branchExistsError"
      :defaultBranchName="defaultBranchName"
      @newBranch="newBranchSelect"
      @updateBranch="updateBranchSelect"
    />
    <v-overlay :value="loadingModel">
      <loading-spinner indeterminate :text="loadingModelText" />
    </v-overlay>
    <SESnackBar
      @close="saveSnackClose"
      :success="saveSuccess"
      :model="saveSnack"
      textError="Something went wrong, please retry"
      textSuccess="Report saved!"
    />
  </v-main>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import * as AddParams from "./utils/add-params/addParams";

import AssessmentStepper from "@/components/assessment/AssessmentStepper.vue";
import SESnackBar from "@/components/shared/SESnackBar.vue";
import NewBranchDialog from "@/components/assessment/NewBranchDialog.vue";

import { findStringProps } from "./utils/propertyFiltering";

import Renderer from "@/components/shared/Renderer.vue";
import {
  Color,
  Filter,
  Gradient,
  GradientColor,
  RendererLoaded,
  UserData,
} from "@/models/renderer";

import {
  ProjectDataComplete,
  MaterialUpdateOut,
  Step,
  TransportSelected,
  TransportType,
  EmptyPropsPassdown,
  ReportPassdown,
  ObjectDetails,
  SelectedMaterialEmit,
  StringPropertyGroups,
  SelectedBuildupEmit,
} from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";

import {
  CheckContainsChlidReportInput,
  GetAllReportBranchesOutput,
  LoadActReportDataInput,
  UploadReportInput,
  GetObjectDetailsOut,
} from "@/store";
import { BECName } from "@/models/shared";
import { LoadStreamOut } from "./utils/process-report-object";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import { ChildObjects, ReportController } from "@/models/report";

interface AvailableStream {
  label: string;
  value: string;
}

@Component({
  components: {
    AssessmentStepper,
    Renderer,
    SESnackBar,
    NewBranchDialog,
    LoadingSpinner,
  },
})
export default class Assessment extends Vue {
  @Prop() modal!: boolean;
  @Prop() modalStreamid!: string;
  @Prop() modalBranchName!: string;

  reportController = new ReportController();

  loading = false;
  loadingSpinnerText = "";
  loadingModel = false;
  loadingModelText = "";
  saveSuccess = true;
  saveSnack = false;
  availableStreams: AvailableStream[] = [];
  objectURLs: string[] = [];
  token = "";
  get fullGroups() {
    return this.reportController.fullGroups;
  }
  materials: MaterialFull[] = this.$store.getters.materialsArr;
  transportTypes: TransportType[] = [];
  becs: {
    name: BECName;
    color: string;
    backgroundColor: string;
  }[] = [];
  totalVolume = -1;
  projectDataPassdown: ProjectDataComplete | null = null;
  allIds: string[] = [];

  beenToTransport = false; // var to keep track of whether the user has been to the transport page, otherwise transport colors can be applied on data tab

  emptyProps: EmptyPropsPassdown = false; // setting to false initially to get vue to detect changes

  report: ReportPassdown = false;
  allChildObjs: AddParams.IChildObject[] = [];
  parentObj: AddParams.IParamsParent | null = null;
  streamId = "";

  colors: Color[] = [];
  materialsColors: Color[] = [];
  transportColors: Color[] = [];

  selectedIds: string[] = [];
  filteredType = "";
  filtered = false;

  // two separate values so that the colors can be found at the same time as the volume is calculated, rather than whenever the user goes onto the volume step
  volProp = "";
  volumeGradient!: Gradient;
  volumeGradientPassdown: GradientColor = null;
  speckleVol = false; // whether the volume can be got from speckle props
  defaultBranchName = "main";

  groupingProps: StringPropertyGroups[] = [];
  objectGroups: string[] = [];
  get transportGroups() {
    return this.reportController.transportGroups;
  }
  selectedObjectGroup = "Object Type";

  update = false;

  // new branch modal
  newBranchDialog = false;
  reportName = "";
  branchNames: string[] = [];
  branchExistsError = false;

  step: Step = 1;
  selectedObjects: string[] = []; // contains the id's of each selected object
  invalidSelectedObjects = false;

  finished = false;

  @Emit("close")
  close() {
    return;
  }

  async mounted() {
    this.token = this.$store.state.token.token;
    this.transportTypes = this.$store.state.transportTypes;
    this.becs = this.$store.state.becs;
    let { streamId, branchName } = this.$route.params;
    if (!streamId) streamId = this.modalStreamid;
    if (!branchName) branchName = this.modalBranchName;
    if (streamId && branchName) {
      this.defaultBranchName = branchName;
      await this.updateStream(streamId, branchName);
    }
    if (streamId && !branchName) {
      this.loadStream(streamId);
    }

    this.$store.dispatch("getUserStreams").then((res) => {
      this.availableStreams = res.data.user.streams.items.map((i: any) => {
        return { label: i.name, value: i.id };
      });
    });
  }
  openFullView() {
    this.$router.push(
      `assessment/${this.modalStreamid}/${this.modalBranchName}`
    );
  }

  materialGroupSelected(objectGroup: string) {
    this.reportController.groupObjects(this.groupingProps, objectGroup);
    this.selectedObjectGroup = objectGroup;
    this.resetColors();
  }

  async newBranchSelect(name: string) {
    const input: CheckContainsChlidReportInput = {
      streamid: this.streamId,
      branchName: name,
    };
    this.branchExistsError = await this.$store.dispatch(
      "checkContainsChlidReport",
      input
    );

    if (!this.branchExistsError) {
      this.newBranchDialog = false;
      this.uploadReport(name);
    }
  }
  updateBranchSelect(name: string) {
    this.newBranchDialog = false;
    this.uploadReport(name);
  }

  async updateStream(streamId: string, branchName: string) {
    this.streamId = streamId;
    this.update = true;
    await this.loadStream(streamId);
    const input: LoadActReportDataInput = {
      streamId,
      branchName,
      loadChildren: true,
    };
    const assessmentViewData: LoadStreamOut = await this.$store.dispatch(
      "loadActReportData",
      input
    );

    const objGroup = assessmentViewData.data.selectedObjectGroup;
    this.selectedObjectGroup = objGroup ? objGroup : "Object Type";
    this.reportController.setObjectsUpdate(assessmentViewData.data.children);

    this.materialsColors = this.reportController.materialsColors;
    this.transportColors = this.reportController.transportColors;

    this.reportController.projectInfo = assessmentViewData.data.projectInfo;
    this.projectDataPassdown = this.reportController.projectInfo;

    this.totalVolume = assessmentViewData.data.projectInfo.volume;
    this.speckleVol = true;

    this.resetColors();
  }

  async checkSave() {
    this.loading = true;
    const containsReport: boolean = await this.$store.dispatch(
      "checkContainsReport",
      this.streamId
    );
    if (containsReport) {
      const getAllReportBranchesOut: GetAllReportBranchesOutput =
        await this.$store.dispatch("getAllReportBranches", this.streamId);
      this.branchNames = getAllReportBranchesOut.map((b) => b.name);
      this.reportName = this.reportController.projectInfo.name;
      this.newBranchDialog = true;
    } else {
      this.uploadReport("main");
    }
  }
  async uploadReport(branchName: string) {
    this.loadingSpinnerText = "DO NOT REFRESH. Saving report";
    let newModel: AddParams.AddParamsModel | undefined;
    if (this.parentObj) {
      newModel = await AddParams.addParams(
        this.parentObj,
        this.reportController.addParams,
        this.$store.state.selectedServer.url,
        this.token,
        this.streamId,
        this.allChildObjs
      );
    }

    const upload = this.reportController.convToUpload(
      this.totalVolume,
      this.materialsColors,
      this.transportColors
    );
    const uploadReportInput: UploadReportInput = {
      streamid: this.streamId,
      objects: upload.reportObjs,
      reportTotals: upload.totals,
      projectData: this.reportController.projectInfo,
      branchName,
      newModel,
      selectedObjectGroup: this.selectedObjectGroup,
    };
    this.loading = true;
    await this.$store.dispatch("uploadReport", uploadReportInput);
    this.$router.push(`/assessment/view/${this.streamId}/${branchName}`);
  }
  saveSnackClose() {
    this.saveSnack = false;
  }

  selectMaterial(material: SelectedMaterialEmit) {
    if (material.type === this.filteredType) {
      this.filtered = false;
      this.selectedIds = [];
    } else {
      this.filtered = true;
      this.selectedIds = material.ids;
    }
    this.filteredType = material.type;
  }

  async rendererLoaded({ properties }: RendererLoaded) {
    this.loadingModelText = "Loading data from model...";

    const volumeFilter = properties.find(
      (p) => p.name.toLowerCase() === "volume"
    );
    this.volProp = volumeFilter ? volumeFilter.rawName : "";

    const res: GetObjectDetailsOut = await this.$store.dispatch(
      "getObjectDetails",
      {
        streamid: this.streamId,
        objecturl: this.objectURLs[0],
      }
    );

    this.allChildObjs = res.children;
    this.parentObj = res.parent;

    let totalVol = 0;
    const filteredRes = this.allChildObjs.filter(
      (r) =>
        r.speckle_type !== "Speckle.Core.Models.DataChunk" &&
        r.speckle_type !== "Objects.Geometry.Mesh"
    );

    const speckleObjsPropsSearch: any[] = [];
    const childObjs: ChildObjects[] = [];

    if (volumeFilter) {
      this.speckleVol = true;
      filteredRes.forEach((r) => {
        const volume = this.findVolume(r, volumeFilter);
        if (volume) {
          speckleObjsPropsSearch.push(r);
          if (!this.update) {
            childObjs.push({
              volume,
              speckleObject: r,
            });
          }
          // also find total volume here to avoid needing to loop through objects again
          totalVol += volume;
        }
      });
    } else {
      this.speckleVol = false;
    }
    // if childObjs.length === 0 then the report is being updated, so no need to set objects here
    if (childObjs.length !== 0) this.reportController.setObjects(childObjs);
    this.groupingProps = findStringProps(
      speckleObjsPropsSearch,
      this.reportController.objects // technically not the right type, but it works so...
    );
    this.objectGroups = this.groupingProps.map((gp) => gp.name);
    this.reportController.groupObjects(
      this.groupingProps,
      this.selectedObjectGroup
    );

    this.allIds = Object.keys(this.reportController.objects);
    if (!this.update) {
      this.totalVolume = totalVol;
    }

    this.volumeGradient = {
      property: this.volProp,
    };
    this.resetColors();
    this.loadingModel = false;
  }
  findVolume(
    object: ObjectDetails,
    filter: Filter<string | boolean | number>
  ): number | undefined {
    let curr: any = object;
    filter.rawName.split(".").forEach((f) => {
      try {
        curr = curr[f];
      } catch (err) {
        return;
      }
    });
    return curr;
  }

  stepperUpdate(step: Step) {
    this.step = step;
    switch (step) {
      case Step.DATA:
        this.resetColors();
        break;
      case Step.MATERIALS:
        this.resetColors();
        this.colors = this.materialsColors;
        break;
      case Step.TRANSPORT:
        this.beenToTransport = true;
        this.resetColors();
        this.colors = this.transportColors;
        break;
      case Step.QUANTITIES:
        this.resetColors();
        if (this.volumeGradient && this.speckleVol)
          this.volumeGradientPassdown = this.volumeGradient;
        break;
      case Step.REVIEW:
        this.resetColors();
        this.emptyProps = this.reportController.isReportComplete();
        break;
      case Step.PREVIEW:
        this.report = this.reportController.calcCarbon();
        this.resetColors();
        break;
      case Step.SAVE:
        this.resetColors();
        break;
      default:
        this.resetColors();
        break;
    }
  }

  objectsSelected(objects: UserData[]) {
    if (this.step === Step.MATERIALS) {
      const keys = Object.keys(this.reportController.objects);
      this.selectedObjects = objects
        .filter((o) => keys.includes(o.id))
        .map((o) => o.id);
      this.invalidSelectedObjects =
        this.selectedObjects.length !== objects.length;
    }
  }

  createNewObjectGroup(name: string) {
    this.reportController.addNewGroup(name, this.selectedObjects);
  }

  resetColors() {
    this.colors = [];
    this.volumeGradientPassdown = null;
  }

  async loadStream(id: string) {
    this.loadingModel = true;
    this.loadingModelText = "Loading model...";
    this.streamId = id;
    const tmpurls: string[] = await this.$store.dispatch("getObjectUrls", id);
    this.objectURLs = [tmpurls[0]];
  }

  transportSelected(selected: TransportSelected) {
    if (this.beenToTransport) {
      selected.material.objects.forEach((o) => {
        o.setTransport(selected.transportType);
      });

      const ids = selected.material.objects.map((o) => o.parentId);
      this.colors = this.colors.filter((c) => !ids.includes(c.id));
      ids.forEach((id) => {
        this.colors.push({
          color: selected.transportType.color,
          id,
        });
      });
      this.transportColors = this.colors;
    }
  }

  selectBuildup(selectedBuildup: SelectedBuildupEmit) {
    const objects = this.reportController.getObjectsByIds(selectedBuildup.ids);

    objects.forEach((o) => {
      // get transport of any materials that were already present
      const oldTransports: { [material: string]: TransportType } = {};
      Object.entries(o.materials).forEach(
        ([k, v]) => (oldTransports[k] = v.transport)
      );

      o.removeAllMaterials();
      selectedBuildup.materials.forEach((b) => {
        if (b.material && b.percentage) {
          o.addMaterial(b.material, +b.percentage / 100);
          const oldTransport = oldTransports[b.material.name];
          if (oldTransport) o.setTransport(b.material.name, oldTransport);
        }
      });
    });

    this.colors = this.colors.filter(
      (c) => !selectedBuildup.ids.includes(c.id)
    );

    selectedBuildup.ids.forEach((id) => {
      try {
        // colour by the first material as that's easiest
        if (selectedBuildup.materials[0].material)
          this.colors.push({
            color: selectedBuildup.materials[0].material.color,
            id,
          });
      } catch (err) {
        console.error("err:", id);
      }
    });
    this.materialsColors = this.colors;
  }

  materialUpdated(material: MaterialUpdateOut) {
    material.type.objects.forEach((o) => {
      o.removeAllMaterials();
      o.changeMaterial(material.oldMaterial?.name, material.material);
    });
    const ids = material.type.objects.map((o) => o.id);
    this.colors = this.colors.filter((c) => !ids.includes(c.id));
    ids.forEach((id) => {
      try {
        this.colors.push({
          color: material.material.color,
          id,
        });
      } catch (err) {
        console.error("err:", id);
      }
    });
    this.materialsColors = this.colors;
  }

  uploadData(data: ProjectDataComplete) {
    // form data from step 1
    this.reportController.projectInfo = data;
    this.$store.dispatch("changeRegion", data.region).then((res) => {
      this.materials = this.$store.getters.materialsArr;
    });
  }
}
</script>
