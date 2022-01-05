<template>
  <v-main>
    <v-row>
      <v-col cols="4">
        <AssessmentStepper
          style="z-index: 1"
          @loadStream="loadStream"
          @materialUpdated="materialUpdated"
          v-if="availableStreams.length !== 0"
          :streams="availableStreams"
          :types="types"
          :materials="materials"
        />
      </v-col>
      <v-col cols="8">
        <Renderer
          v-if="objectURLs.length !== 0"
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
import Renderer, { ObjectColor } from "@/components/Renderer.vue";

import { Component, Vue } from "vue-property-decorator";

import {
  MaterialUpdateOut,
  SpeckleObject,
  SpeckleType,
} from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";

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
  colors: ObjectColor[] = [];

  mounted() {
    this.token = this.$store.state.token.token;
    this.$store.dispatch("getUserStreams").then((res) => {
      this.availableStreams = res.data.user.streams.items.map((i: any) => {
        return { label: i.name, value: i.id };
      });
      console.log(res);
    });
  }
  async loadStream(id: string) {
    console.log("id loaded", id);
    const tmpurls: string[] = await this.$store.dispatch("getObjectUrls", id);
    this.objectURLs = [tmpurls[0]]
    console.log("URL", this.objectURLs);

    this.objects = await this.$store.dispatch("getObjectDetails", {
      streamid: id,
      objecturl: this.objectURLs[0],
    });
    console.log("objects:", this.objects);

    this.types = this.findTypes(this.objects);

    // const defaultColors: ObjectColor[] = this.types.map(t => ({
    //   object: t.type,
    //   color: null
    // }));

    // this.colors = defaultColors;
  }

  materialUpdated(material: MaterialUpdateOut) {
    console.log("[Assessment] material:", material);

    // update material in `colors`, or add the material if it is not already there
    let added = false;
    this.colors = this.colors.map((c) => {
      if (c.object === material.type.type) {
        added = true;
        return {
          object: material.type.type,
          color: material.material.color,
        };
      } else return c;
    });

    if (!added)
      this.colors.push({
        object: material.type.type,
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
