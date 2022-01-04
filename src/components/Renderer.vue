<template>
  <div>
    <v-btn @click="reset" style="z-index: 1">Reset colours</v-btn>
    <div
      ref="rendererparent"
      id="rendererparent"
      style="height: 700px; width: 100%"
    ></div>
    <p v-if="loading !== 100">{{ loading }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Viewer } from "@speckle/viewer";

@Component
export default class extends Vue {
  @Prop() objecturls!: string[];
  @Prop() token!: string;

  domElement!: any;
  alertMessage!: string;
  showAlert = false;
  viewer!: any;
  selectedObjects: any[] = [];

  loading = 0;
  failed = false;
  mounted() {
    let renderDomElement = document.getElementById("renderer");

    if (!renderDomElement) {
      renderDomElement = document.createElement("div");
      renderDomElement.id = "renderer";
    }

    this.domElement = renderDomElement;
    this.domElement.style.display = "inline-block";
    (this.$refs.rendererparent as any).appendChild(renderDomElement);

    this.viewer = new Viewer({ contained: renderDomElement });
    this.objecturls.forEach((url) => {
      this.viewer.loadObject(url, this.token);
    });

    this.viewer.on("load-progress", (args: any) => {
      this.loading = args.progress * 100;
      this.viewer.interactions.zoomExtents();
      if (this.loading === 100) {
        console.log("loaded", this.viewer);
        console.log("objectProperties:", this.viewer.getObjectsProperties());
        this.viewer.applyFilter({
          colorBy: {
            type: "category",
            property: "speckle_type",
            values: {
              'Speckle.Core.Models.DataChunk': 'hsl(91, 100%, 50%)',
              'Objects.BuiltElements.Revit.RevitRailing': 'hsl(0, 100%, 50%)',
              'Objects.Geometry.Mesh': 'hsl(244, 100%, 50%)',
              'Objects.BuiltElements.Revit.FamilyInstance': 'hsl(291, 100%, 50%)'
            }
          }
        }).then((res: any) => {
          console.log("[applyFilter] res:", res);
        })
      }
    });
    this.viewer.on("select", (objects: any[]) => {
      this.selectedObjects.splice(0, this.selectedObjects.length);
      this.selectedObjects.push(...objects);
      this.$emit("selection", this.selectedObjects);
    });
  }

  reset() {
    console.log("reset");
    this.viewer.applyFilter(null);
  }
}
</script>
<style>
#renderer {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80vh;
}
</style>
