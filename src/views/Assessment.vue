<template>
  <v-main>
    <loading-spinner v-if="loading" />
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
          @calcVol="calcVol"
          @close="close"
          @openFullView="openFullView"
          @createNewGroup="createNewObjectGroup"
          :modal="modal"
          :streams="availableStreams"
          :types="types"
          :materials="materials"
          :transportTypes="transportTypes"
          :totalVolume="totalVolume"
          :emptyProps="emptyProps"
          :report="report"
          :becs="becs"
          :groupedMaterials="groupedMaterials"
          :speckleVol="speckleVol"
          :update="update"
          :streamId="streamId"
          :projectData="projectDataPassdown"
          :selectedObjects="selectedObjects"
          :invalidSelectedObjects="invalidSelectedObjects"
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
  SpeckleObject,
  SpeckleType,
  Step,
  TransportSelected,
  TransportType,
  EmptyProps,
  EmptyPropsPassdown,
  SpeckleObjectFormComplete,
  SpeckleObjectComplete,
  ReportTotals,
  ReportPassdown,
  ObjectDetails,
  GroupedMaterial,
  SelectedMaterialEmit,
} from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";

import * as THREE from "three";
import {
  constructionCarbonA5,
  constructionCarbonA5Site,
  constructionCarbonA5Waste,
  productStageCarbonA1A3,
  transportCarbonA4,
} from "@/store/utilities/carbonCalculator";
import {
  CheckContainsChlidReportInput,
  GetAllReportBranchesOutput,
  LoadActReportDataInput,
  UploadReportInput,
  GetObjectDetailsOut,
  ObjectDetailsInput,
} from "@/store";
import { VolCalculator } from "./utils/VolCalculator";
import { LoadStreamOut } from "./utils/process-report-object";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import { ChartData } from "@/models/chart";

type ObjectsObj = { [id: string]: SpeckleObject };
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

  loading = false;
  loadingModel = false;
  loadingModelText = "";
  saveSuccess = true;
  saveSnack = false;
  availableStreams: AvailableStream[] = [];
  objectURLs: string[] = [];
  token = "";
  types: SpeckleType[] = [];
  objectsObj: ObjectsObj = {};
  materials: MaterialFull[] = this.$store.getters.materialsArr;
  transportTypes: TransportType[] = [];
  becs: TransportType[] = [];
  totalVolume = -1;
  allMesh: THREE.Mesh[] = [];
  projectData!: ProjectDataComplete;
  projectDataPassdown: ProjectDataComplete | null = null;
  allIds: string[] = [];

  emptyProps: EmptyPropsPassdown = false; // setting to false initially to get vue to detect changes

  report: ReportPassdown = false;
  addParams: AddParams.ParamAdd[] = [];
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

  groupedMaterials: GroupedMaterial[] = [];

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
    // AddParams.testRun("https://v2.speckle.arup.com", this.token);
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

    const objectDetailsInput: ObjectDetailsInput = {
      streamid: streamId,
      objecturl: this.objectURLs[0],
    };
    this.$store
      .dispatch("getObjectDetails", objectDetailsInput)
      .then((res: GetObjectDetailsOut) => {
        // in a .then to not hold up the rest of the func
        this.parentObj = res.parent;
        this.allChildObjs = res.children;
      });
    assessmentViewData.data.children.forEach((c) => {
      this.objectsObj[c.act.id] = {
        id: c.act.id,
        speckle_type: c.act.speckle_type,
        formData: c.act.formData,
        reportData: c.act.reportData,
      };
    });

    this.types = this.findTypes(this.objectsObj);
    this.materialsColors = Object.values(this.objectsObj).map((o) => ({
      id: o.id,
      color: o.formData?.material?.color as string,
    }));
    this.transportColors = Object.values(this.objectsObj).map((o) => ({
      id: o.id,
      color: o.formData?.transport?.color as string,
    }));

    this.projectData = assessmentViewData.data.projectInfo;
    this.projectDataPassdown = assessmentViewData.data.projectInfo;

    this.groupMaterials();

    this.totalVolume = assessmentViewData.data.projectInfo.volume;
    this.speckleVol = true;
  }

  async checkSave() {
    this.loading = true;
    if (this.report) {
      if (this.report.reportObjs.length > 0) {
        const containsReport: boolean = await this.$store.dispatch(
          "checkContainsReport",
          this.streamId
        );
        if (containsReport) {
          const getAllReportBranchesOut: GetAllReportBranchesOutput =
            await this.$store.dispatch("getAllReportBranches", this.streamId);
          this.branchNames = getAllReportBranchesOut.map((b) => b.name);
          this.reportName = this.projectData.name;
          this.newBranchDialog = true;
        } else {
          this.uploadReport("main");
        }
      } else {
        this.saveSnack = true;
        this.saveSuccess = false;
        this.loading = false;
      }
    }
  }
  async uploadReport(branchName: string) {
    if (this.report && this.report.reportObjs.length > 0) {
      // TODO: add some check to make sure that model is a revit check here
      let newModel: AddParams.AddParamsModel | undefined;
      if (this.parentObj) {
        newModel = await AddParams.addParams(
          this.parentObj,
          this.addParams,
          this.$store.state.selectedServer.url,
          this.token,
          this.streamId,
          this.allChildObjs
        );
      }

      const uploadReportInput: UploadReportInput = {
        streamid: this.streamId,
        objects: this.report.reportObjs,
        reportTotals: this.report.totals,
        projectData: this.projectData,
        branchName,
        newModel,
      };
      this.loading = true;
      await this.$store.dispatch("uploadReport", uploadReportInput);
      this.loading = false;
      this.saveSnack = true;
      this.finished = true;
      this.$router.push(`/assessment/view/${this.streamId}/${branchName}`);
    }
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

  async rendererLoaded({ properties, allMesh }: RendererLoaded) {
    this.loadingModelText = "Loading data from model...";
    this.allMesh = allMesh;

    const volumeFilter = properties.find(
      (p) => p.name.toLowerCase() === "volume"
    );
    this.volProp = volumeFilter ? volumeFilter.rawName : "";
    if (!this.update) {
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
      const childObjects: ObjectDetails[] = [];

      if (volumeFilter) {
        this.speckleVol = true;
        filteredRes.forEach((r) => {
          const volume = this.findVolume(r, volumeFilter);
          if (volume) {
            this.objectsObj[r.id] = {
              id: r.id,
              speckle_type: r.speckle_type,
              formData: {
                volume: volume,
              },
            };
            childObjects.push(r);
            // also find total volume here to avoid needing to loop through objects again
            totalVol += volume;
          }
        });
      } else {
        this.speckleVol = false;
        filteredRes.forEach((r) => {
          this.objectsObj[r.id] = {
            id: r.id,
            speckle_type: r.speckle_type,
          };
        });
      }

      this.types = this.findTypes(this.objectsObj);
      this.allIds = this.types.map((t) => t.ids).flat();
      this.totalVolume = totalVol;
    }

    this.updateVolumeGradient();
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

  calcVol() {
    let totalVol = 0;
    this.allMesh.forEach((m) => {
      const volume = VolCalculator.getMeshVolume(m);
      if (volume) {
        try {
          const id: string = m.userData.id;
          this.objectsObj[id] = {
            ...this.objectsObj[id],
            formData: {
              ...this.objectsObj[id].formData,
              volume,
            },
          };
        } catch (err) {
          console.warn(err);
        }
        totalVol += volume;
      }
    });
    this.totalVolume = totalVol;
    this.speckleVol = true;
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
        this.resetColors();
        this.colors = this.transportColors;
        this.groupMaterials();
        break;
      case Step.QUANTITIES:
        this.resetColors();
        if (this.volumeGradient && this.speckleVol)
          this.volumeGradientPassdown = this.volumeGradient;
        break;
      case Step.REVIEW:
        this.resetColors();
        this.review();
        break;
      case Step.PREVIEW:
        this.carbonCalc();
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
      const keys = Object.keys(this.objectsObj);
      this.selectedObjects = objects
        .filter((o) => keys.includes(o.id))
        .map((o) => o.id);
      this.invalidSelectedObjects =
        this.selectedObjects.length !== objects.length;
    }
  }

  createNewObjectGroup(name: string) {
    this.types = this.types.map((t) => ({
      ...t,
      ids: t.ids.filter((i) => !this.selectedObjects.includes(i)),
    }));
    this.types.push({
      ids: this.selectedObjects,
      material: undefined,
      transport: undefined,
      type: name,
    });
  }

  groupMaterials() {
    let materialsObj: {
      [material: string]: {
        transportType?: TransportType;
        speckle_types: {
          [speckle_type: string]: string[] /* array should be object id's */;
        };
      };
    } = {};

    // assuming that the materials section has been filled out already
    Object.values(this.objectsObj).forEach((o) => {
      const material = o.formData?.material?.name;
      const speckle_type = o.speckle_type;
      if (material) {
        if (
          materialsObj[material] &&
          materialsObj[material].speckle_types[speckle_type]
        ) {
          materialsObj[material].speckle_types[speckle_type].push(o.id);
        } else if (materialsObj[material]) {
          materialsObj[material].speckle_types[speckle_type] = [o.id];
        } else {
          materialsObj[material] = {
            speckle_types: {},
            transportType: o.formData?.transport,
          };
          materialsObj[material].speckle_types[speckle_type] = [o.id];
        }
      }
    });

    const materialsArr: GroupedMaterial[] = Object.keys(materialsObj).map(
      (m) => {
        const ids: string[] = [];
        const speckle_types = Object.keys(materialsObj[m].speckle_types).map(
          (s) => {
            ids.push(...materialsObj[m].speckle_types[s]);
            return s;
          }
        );
        return {
          material: m,
          objects: ids,
          speckle_types,
          transportType: materialsObj[m].transportType,
        };
      }
    );

    this.groupedMaterials = materialsArr;
  }

  resetColors() {
    this.colors = [];
    this.volumeGradientPassdown = null;
  }

  updateVolumeGradient() {
    let minVol = -1;
    let maxVol = -1;

    Object.values(this.objectsObj).forEach((o, i) => {
      if (o.formData?.volume) {
        let volume = o.formData.volume;
        if (i === 0) {
          // if on the first index, then min and max have not yet been set, so set them to the first vol value
          minVol = volume;
          maxVol = volume;
        } else {
          if (minVol > volume) minVol = volume;
          if (maxVol < volume) maxVol = volume;
        }
      }
    });

    this.volumeGradient = {
      property: this.volProp,
    };
  }

  // for now we're just assuming that all data is filled in if the user reaches this step TODO: ONLY ALLOW USER ON THIS PAGE IF REVIEW IS SUCCESSFUL
  carbonCalc() {
    // convert objects from SpeckleObject to SpeckleObjectFormComplete
    const objs = this.convertToFormComplete();
    this.addParams = [];

    const reportObjs = objs.map((o): SpeckleObjectComplete => {
      const A1A3 = productStageCarbonA1A3(o);
      const A4 = transportCarbonA4(o);
      const A5Site = constructionCarbonA5Site(this.projectData.cost);
      const A5Waste = constructionCarbonA5Waste(o);
      const A5Value = constructionCarbonA5({
        site: A5Site,
        waste: A5Waste,
      });

      // make parameter update object
      this.addParams.push({
        parentid: o.id,
        name: "Total Carbon",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Total Carbon",
          units: "kgCO2e/kg",
          value: A4 + A1A3 + A5Value,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      this.addParams.push({
        parentid: o.id,
        name: "Product Stage Carbon A1-A3",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Product Stage Carbon A1-A3",
          units: "kgCO2e/kg",
          value: A1A3,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      this.addParams.push({
        parentid: o.id,
        name: "Transport Carbon A4",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Transport Carbon A4",
          units: "kgCO2e/kg",
          value: A4,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      this.addParams.push({
        parentid: o.id,
        name: "Transport Carbon A4",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Transport Carbon A4",
          units: "kgCO2e/kg",
          value: A4,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      this.addParams.push({
        parentid: o.id,
        name: "Construction Carbon A5",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Construction Carbon A5",
          units: "kgCO2e/kg",
          value: A5Value,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      // end parameter update

      return {
        ...o,
        reportData: {
          transportCarbonA4: A4,
          productStageCarbonA1A3: A1A3,
          constructionCarbonA5: {
            value: A5Value,
            waste: A5Waste,
            site: A5Site,
          },
          totalCarbon: A4 + A1A3 + A5Value,
        },
      };
    });

    const totals = this.calcTotals(reportObjs);

    this.report = {
      reportObjs,
      totals,
    };
  }

  calcTotals(reportObjs: SpeckleObjectComplete[]): ReportTotals {
    let A1A3 = 0;
    let A4 = 0;
    let A5Site = 0;
    let A5Waste = 0;
    let A5Value = 0;
    const materialsObj: {
      [key: string]: { value: number; color: string };
    } = {};
    reportObjs.forEach((o) => {
      const rd = o.reportData;
      A1A3 += rd.productStageCarbonA1A3;
      A4 += rd.transportCarbonA4;
      A5Site += rd.constructionCarbonA5.site;
      A5Waste += rd.constructionCarbonA5.waste;
      A5Value += rd.constructionCarbonA5.value;
      const objTotal = A1A3 + A4 + A5Value;
      const materialName = o.formData.material.name;
      if (materialName in materialsObj) {
        materialsObj[materialName].value += objTotal;
      } else {
        materialsObj[materialName] = {
          value: objTotal,
          color: o.formData.material.color,
        };
      }
    });
    let totalCO2 = A1A3 + A4 + A5Value;
    const materials: ChartData[] = Object.entries(materialsObj).map((m) => ({
      value: m[1].value,
      label: m[0],
      color: m[1].color,
    }));

    return {
      transportCarbonA4: A4,
      productStageCarbonA1A3: A1A3,
      constructionCarbonA5: {
        value: A5Value,
        waste: A5Waste,
        site: A5Site,
      },
      totalCO2,
      volume: this.totalVolume,
      materials,
      materialsColors: this.materialsColors,
      transportColors: this.transportColors,
    };
  }

  convertToFormComplete() {
    const objs: SpeckleObjectFormComplete[] = [];
    Object.values(this.objectsObj).forEach((o) => {
      if (
        o.formData &&
        o.formData.transport &&
        o.formData.material &&
        o.formData.volume
      ) {
        objs.push({
          ...o,
          formData: {
            transport: o.formData.transport,
            material: o.formData.material,
            volume: o.formData.volume,
          },
        });
      }
    });
    return objs;
  }

  review() {
    const emptyProps: EmptyProps = {
      projectEmpty: this.projectData ? true : false,
      materialsEmpty: [] as string[],
      transportsEmpty: [] as string[],
      volumesEmpty: [] as string[],
    };

    Object.values(this.objectsObj).forEach((o) => {
      const formData = o.formData;

      if (formData?.material === undefined)
        emptyProps.materialsEmpty.push(o.id);
      if (formData?.transport === undefined)
        emptyProps.transportsEmpty.push(o.id);
      if (formData?.volume === undefined) emptyProps.volumesEmpty.push(o.id);
    });

    this.emptyProps = emptyProps;
  }

  async loadStream(id: string) {
    this.loadingModel = true;
    this.loadingModelText = "Loading model...";
    this.streamId = id;
    const tmpurls: string[] = await this.$store.dispatch("getObjectUrls", id);
    this.objectURLs = [tmpurls[0]];
  }

  transportSelected(selected: TransportSelected) {
    const ids = selected.material.objects;
    this.colors = this.colors.filter((c) => !ids.includes(c.id));
    ids.forEach((id) => {
      this.colors.push({
        color: selected.transportType.color,
        id,
      });
    });
    this.transportColors = this.colors;

    selected.material.objects.forEach((i) => {
      const oldObj = this.objectsObj[i];
      this.objectsObj[i] = {
        ...oldObj,
        formData: {
          ...oldObj.formData,
          transport: selected.transportType,
        },
      };
    });
  }

  materialUpdated(material: MaterialUpdateOut) {
    const ids = material.type.ids;
    this.colors = this.colors.filter((c) => !ids.includes(c.id));
    ids.forEach((id) => {
      try {
        this.objectsObj[id].speckle_type = material.type.type;
        this.colors.push({
          color: material.material.color,
          id,
        });
      } catch (err) {
        console.error("err:", id);
      }
    });
    this.materialsColors = this.colors;

    // update the objects to include this new material
    material.type.ids.forEach((i) => {
      const oldObj = this.objectsObj[i];
      this.objectsObj[i] = {
        ...oldObj,
        formData: {
          ...oldObj.formData,
          material: material.material,
        },
      };
    });
  }

  findTypes(objects: ObjectsObj): SpeckleType[] {
    let types: SpeckleType[] = [];

    Object.values(objects).forEach((o) => {
      let typeIndex = -1;
      types.forEach((t, i) => {
        if (t.type === o.speckle_type) typeIndex = i;
      });
      if (typeIndex !== -1) types[typeIndex].ids.push(o.id);
      else
        types.push({
          type: o.speckle_type,
          ids: [o.id],
          material: o.formData?.material,
          transport: o.formData?.transport,
        });
    });

    return types;
  }

  uploadData(data: ProjectDataComplete) {
    // form data from step 1
    this.projectData = data;
    this.$store.dispatch("changeRegion", data.region).then((res) => {
      this.materials = this.$store.getters.materialsArr;
    });
  }
}
</script>
