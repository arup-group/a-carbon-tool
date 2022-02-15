<template>
  <v-main>
    <v-row>
      <v-col cols="4">
        <AssessmentStepper
          style="z-index: 1"
          v-if="availableStreams.length !== 0"
          @loadStream="loadStream"
          @materialUpdated="materialUpdated"
          @stepperUpdate="stepperUpdate"
          @transportSelected="transportSelected"
          @uploadData="uploadData"
          @save="save"
          :streams="availableStreams"
          :types="types"
          :materials="materials"
          :transportTypes="transportTypes"
          :totalVolume="totalVolume"
          :emptyProps="emptyProps"
          :report="report"
          :becs="becs"
          :groupedMaterials="groupedMaterials"
        />
      </v-col>
      <v-col cols="8">
        <Renderer
          v-if="objectURLs.length !== 0"
          @loaded="rendererLoaded"
          :objecturls="objectURLs"
          :token="token"
          :colors="colors"
          :gradientColorProperty="volumeGradientPassdown"
        />
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import AssessmentStepper from "@/components/assessment/AssessmentStepper.vue";
import Renderer, {
  Color,
  Gradient,
  GradientColor,
} from "@/components/shared/Renderer.vue";

import { Component, Vue } from "vue-property-decorator";

import {
  CalcModes,
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
  ObjectDetailsComplete,
  GroupedMaterial,
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
import { UploadReportInput } from "@/store";

type ObjectsObj = { [id: string]: SpeckleObject };

@Component({
  components: { AssessmentStepper, Renderer },
})
export default class Assessment extends Vue {
  availableStreams = [];
  objectURLs: string[] = [];
  token = "";
  types: SpeckleType[] = [];
  objectsObj: ObjectsObj = {};
  materials: MaterialFull[] = this.$store.getters.materialsArr;
  transportTypes: TransportType[] = [];
  volumeCalcMode: CalcModes = CalcModes.PROPERTY;
  totalVolume = -1;
  allMesh: THREE.Mesh[] = [];

  projectData!: ProjectDataComplete;

  emptyProps: EmptyPropsPassdown = false; // setting to false initially to get vue to detect changes

  report: ReportPassdown = false;
  streamid!: string;

  colors: Color[] = [];
  materialsColors: Color[] = [];
  transportColors: Color[] = [];

  // two separate values so that the colors can be found at the same time as the volume is calculated, rather than whenever the user goes onto the volume step
  volumeGradient!: Gradient;
  volumeGradientPassdown: GradientColor = null;

  groupedMaterials: GroupedMaterial[] = [];

  mounted() {
    this.token = this.$store.state.token.token;
    this.$store.dispatch("getUserStreams").then((res) => {
      this.availableStreams = res.data.user.streams.items.map((i: any) => {
        return { label: i.name, value: i.id };
      });
    });
    this.transportTypes = this.$store.state.transportTypes;
  }

  get becs(): string[] {
    return this.$store.state.becs.map((b: { name: string }) => b.name);
  }

  async save() {
    if (this.report) {
      const uploadReportInput: UploadReportInput = {
        streamid: this.streamid,
        objects: this.report.reportObjs,
        reportTotals: this.report.totals,
        projectData: this.projectData,
      };

      await this.$store.dispatch("uploadReport", uploadReportInput);
    }
  }

  rendererLoaded(allMesh: THREE.Mesh[]) {
    this.allMesh = allMesh;
  }

  stepperUpdate(step: Step) {
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
        if (this.volumeGradient)
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
      case Step.REPORT:
        this.resetColors();
        break;
      default:
        this.resetColors();
        break;
    }
  }

  groupMaterials() {
    let materialsObj: {
      [material: string]: {
        [speckle_type: string]: string[] /* array should be object id's */;
      };
    } = {};

    // assuming that the materials section has been filled out already
    Object.values(this.objectsObj).forEach((o) => {
      const material = o.formData?.material?.name;
      const speckle_type = o.speckle_type;
      if (material) {
        if (materialsObj[material] && materialsObj[material][speckle_type]) {
          materialsObj[material][speckle_type].push(o.id);
        } else if (materialsObj[material]) {
          materialsObj[material][speckle_type] = [o.id];
        } else {
          materialsObj[material] = {};
          materialsObj[material][speckle_type] = [o.id];
        }
      }
    });

    const materialsArr: GroupedMaterial[] = Object.keys(materialsObj).map(
      (m) => {
        const ids: string[] = [];
        const speckle_types = Object.keys(materialsObj[m]).map((s) => {
          ids.push(...materialsObj[m][s]);
          return s;
        });
        return {
          material: m,
          objects: ids,
          speckle_types,
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
      property: "parameters.HOST_VOLUME_COMPUTED.value",
      minValue: minVol,
      maxValue: maxVol,
      colors: ["#4f7bff", "#ff4f84"],
    };
  }

  // for now we're just assuming that all data is filled in if the user reaches this step TODO: ONLY ALLOW USER ON THIS PAGE IF REVIEW IS SUCCESSFUL
  carbonCalc() {
    // convert objects from SpeckleObject to SpeckleObjectFormComplete
    const objs = this.convertToFormComplete();

    const reportObjs = objs.map((o): SpeckleObjectComplete => {
      const A1A3 = productStageCarbonA1A3(o);
      const A4 = transportCarbonA4(o);
      const A5Site = constructionCarbonA5Site(this.projectData.cost);
      const A5Waste = constructionCarbonA5Waste(o);
      const A5Value = constructionCarbonA5({
        site: A5Site,
        waste: A5Waste,
      });
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
    reportObjs.forEach((o) => {
      const rd = o.reportData;
      A1A3 += rd.productStageCarbonA1A3;
      A4 += rd.transportCarbonA4;
      A5Site += rd.constructionCarbonA5.site;
      A5Waste += rd.constructionCarbonA5.waste;
      A5Value += rd.constructionCarbonA5.value;
    });
    let totalCO2 = A1A3 + A4 + A5Value;

    return {
      transportCarbonA4: A4,
      productStageCarbonA1A3: A1A3,
      constructionCarbonA5: {
        value: A5Value,
        waste: A5Waste,
        site: A5Site,
      },
      totalCO2,
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
    this.streamid = id;
    const tmpurls: string[] = await this.$store.dispatch("getObjectUrls", id);
    this.objectURLs = [tmpurls[0]];

    const res: ObjectDetails[] = await this.$store.dispatch(
      "getObjectDetails",
      {
        streamid: id,
        objecturl: this.objectURLs[0],
      }
    );

    let totalVol = 0;

    const filteredRes: ObjectDetailsComplete[] = [];
    res.forEach((r) => {
      if (r.parameters && r.parameters.HOST_VOLUME_COMPUTED) {
        filteredRes.push({
          id: r.id,
          speckle_type: r.speckle_type,
          paramters: {
            HOST_VOLUME_COMPUTED: {
              value: r.parameters.HOST_VOLUME_COMPUTED.value,
            },
          },
        });
        // also find total volume here to avoid needing to loop through objects again
        totalVol += r.parameters.HOST_VOLUME_COMPUTED.value;
      }
    });

    filteredRes.forEach((r) => {
      this.objectsObj[r.id] = {
        id: r.id,
        speckle_type: r.speckle_type,
        formData: {
          volume: r.paramters.HOST_VOLUME_COMPUTED.value
        }
      }
    });

    this.types = this.findTypes(this.objectsObj);
    this.totalVolume = totalVol;

    this.updateVolumeGradient();
  }

  transportSelected(selected: TransportSelected) {
    selected.material.speckle_types.forEach((st) => {
      let added = false;
      this.colors = this.colors.map((c) => {
        if (c.id === st) {
          added = true;
          return {
            id: st,
            color: selected.transportType.color,
          };
        } else return c;
      });
      if (!added)
        this.colors.push({ id: st, color: selected.transportType.color });
    });
    this.transportColors = this.colors;

    selected.material.objects.forEach((i) => {
      const oldObj = this.objectsObj[i];
      this.objectsObj[i] = {
        ...oldObj,
        formData: {
          ...oldObj.formData,
          transport: selected.transportType
        }
      }
    });
  }

  materialUpdated(material: MaterialUpdateOut) {
    // update material in `colors`, or add the material if it is not already there
    let added = false;
    this.colors = this.colors.map((c) => {
      if (c.id === material.type.type) {
        added = true;
        return {
          id: material.type.type,
          color: material.material.color,
        };
      } else return c;
    });

    if (!added)
      this.colors.push({
        id: material.type.type,
        color: material.material.color,
      });
    this.materialsColors = this.colors;

    // update the objects to include this new material
    material.type.ids.forEach((i) => {
      const oldObj = this.objectsObj[i];
      this.objectsObj[i] = {
        ...oldObj,
        formData: {
          ...oldObj.formData,
          material: material.material
        }
      }
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

<style scoped></style>
