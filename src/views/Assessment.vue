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
          :streams="availableStreams"
          :types="types"
          :materials="materials"
          :transportTypes="transportTypes"
          :totalVolume="totalVolume"
        />
      </v-col>
      <v-col cols="8">
        <Renderer
          v-if="objectURLs.length !== 0"
          @loaded="rendererLoaded"
          :objecturls="objectURLs"
          :token="token"
          :colors="colors"
        />
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import AssessmentStepper from "@/components/AssessmentStepper.vue";
import Renderer, { Color } from "@/components/Renderer.vue";

import { Component, Vue } from "vue-property-decorator";

import {
  CalcModes,
  MaterialUpdateOut,
  SpeckleObject,
  SpeckleType,
  Step,
  TransportSelected,
  TransportType,
} from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";

import * as THREE from "three";

@Component({
  components: { AssessmentStepper, Renderer },
})
export default class Assessment extends Vue {
  availableStreams = [];
  objectURLs: string[] = [];
  token = "";
  types: SpeckleType[] = [];
  objects: SpeckleObject[] = [];
  materials: MaterialFull[] = this.$store.getters.materialsArrUK;
  colors: Color[] = [];
  transportTypes: TransportType[] = [];
  volumeCalcMode: CalcModes = CalcModes.PROPERTY;
  totalVolume = 0;

  materialsOut!: MaterialUpdateOut;

  mounted() {
    this.token = this.$store.state.token.token;
    this.$store.dispatch("getUserStreams").then((res) => {
      this.availableStreams = res.data.user.streams.items.map((i: any) => {
        return { label: i.name, value: i.id };
      });
      console.log(res);
    });
    this.transportTypes = this.$store.state.transportTypes;
  }

  rendererLoaded(allMesh: THREE.Mesh[]) {
    console.log("window.renderer.scene", (window as any).renderer.scene);
    console.log("[rendererLoaded] allMesh:", allMesh);
    let totalVol = 0; // in m3 (I think)
    const volumes: (number | "> 0" | "no index")[] = [];
    allMesh.forEach(m => {
      const vol = this.getMeshVolume(m);
      volumes.push(vol);
      totalVol += typeof vol === "number" ? vol : 0;
    });
    console.log("calculated volumes\ntotalVol:", totalVol, "\nvolumes:", volumes);
    this.totalVolume = totalVol;
  }
  getMeshVolume(obj: THREE.Mesh) {
    // TODO: Check for V+F-E = 2 (ie is closed mesh) https://gamedev.stackexchange.com/a/119368
    let buffGeom = obj.geometry;
    let volumes = [];
    if (buffGeom.index) {
      for (let i = 0; i < buffGeom.index.count; i += 3) {
        let A = buffGeom.index.array[i],
          B = buffGeom.index.array[i + 1],
          C = buffGeom.index.array[i + 2];

        volumes.push(
          this.getSignedVolumeOfTriangle(
            buffGeom.attributes.position.array[A * 3 + 0],
            buffGeom.attributes.position.array[A * 3 + 1],
            buffGeom.attributes.position.array[A * 3 + 2],
            buffGeom.attributes.position.array[B * 3 + 0],
            buffGeom.attributes.position.array[B * 3 + 1],
            buffGeom.attributes.position.array[B * 3 + 2],
            buffGeom.attributes.position.array[C * 3 + 0],
            buffGeom.attributes.position.array[C * 3 + 1],
            buffGeom.attributes.position.array[C * 3 + 2]
          )
        );
      }
      let sum = volumes.reduce((a, b) => a + b, 0);
      return sum > 0 ? sum : "> 0";
    } else return "no index";
  }
  // https://stackoverflow.com/a/1568551/3446736
  getSignedVolumeOfTriangle(
    p1x: number,
    p1y: number,
    p1z: number,
    p2x: number,
    p2y: number,
    p2z: number,
    p3x: number,
    p3y: number,
    p3z: number
  ) {
    let v321 = p3x * p2y * p1z;
    let v231 = p2x * p3y * p1z;
    let v312 = p3x * p1y * p2z;
    let v132 = p1x * p3y * p2z;
    let v213 = p2x * p1y * p3z;
    let v123 = p1x * p2y * p3z;
    return (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);
  }

  stepperUpdate(step: Step) {
    switch (step) {
      case Step.MATERIALS:
        if (this.materialsOut) this.materialUpdated(this.materialsOut);
        else this.colors = [];
        break;
      case Step.QUANTITIES:
        this.calcQuant();
        break;
      default:
        this.colors = [];
        break;
    }
  }

  calcQuant() {
    return;
  }

  async loadStream(id: string) {
    console.log("id loaded", id);
    const tmpurls: string[] = await this.$store.dispatch("getObjectUrls", id);
    this.objectURLs = [tmpurls[0]];
    console.log("URL", this.objectURLs);

    this.objects = await this.$store.dispatch("getObjectDetails", {
      streamid: id,
      objecturl: this.objectURLs[0],
    });
    console.log("objects:", this.objects);

    this.types = this.findTypes(this.objects);

    this.findVolumes(this.objects);
  }

  findVolumes(objects: SpeckleObject[]) {
    let total = 0;
    let volumes: number[] = [];
    objects.forEach((o) => {
      if (o.volume !== undefined) {
        total++;
        volumes.push(o.volume);
      }
    });
    console.log("[findVolumes]\ntotal:", total, "\nvolumes:", volumes);
  }

  transportSelected(selected: TransportSelected) {
    // TURN THIS INTO IT'S OWN FUNCTION
    let added = false;
    this.colors = this.colors.map((c) => {
      if (c.id === selected.speckleType.type) {
        added = true;
        return {
          id: selected.speckleType.type,
          color: selected.transportType.color,
        };
      } else return c;
    });

    if (!added)
      this.colors.push({
        id: selected.speckleType.type,
        color: selected.transportType.color,
      });
  }

  materialUpdated(material: MaterialUpdateOut) {
    this.materialsOut = material; // THIS IS WRONG

    console.log("[Assessment] material:", material);

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
  }

  findTypes(objects: SpeckleObject[]): SpeckleType[] {
    let types: SpeckleType[] = [];

    objects.forEach((o) => {
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

    console.log("[findTypes] types:", types);
    return types;
  }
}
</script>

<style scoped></style>
