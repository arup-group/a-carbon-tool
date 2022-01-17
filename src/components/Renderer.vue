<template>
  <div>
    <div
      ref="rendererparent"
      id="rendererparent"
      style="height: 700px; width: 100%"
    ></div>
    <p v-if="loading !== 100">{{ loading }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Viewer } from "@speckle/viewer";

import * as THREE from "three";

export interface Color {
  color: string | null;
  id: string; // should be unique to each item, making it a primary key
}

@Component
export default class extends Vue {
  @Prop() objecturls!: string[];
  @Prop() token!: string;
  @Prop() colors!: Color[];

  currentColors: Color[] = [];

  @Watch("colors")
  onObjectColorChanged(value: Color[]) {
    console.log("watch:", value);
    if (value.length === 0) this.resetColors();
    else this.setColors(value);
  }

  domElement!: any;
  alertMessage!: string;
  showAlert = false;
  viewer!: any;
  selectedObjects: any[] = [];

  loading = 0;
  failed = false;
  mounted() {
    console.log("objectUrls:", this.objecturls)

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
        console.log("sceneManager:", this.viewer.sceneManager);
        console.log("sceneObjects:", this.viewer.sceneManager.sceneObjects);
        console.log("allObjects:", this.viewer.sceneManager.sceneObjects.allObjects);
        const allObjects = this.viewer.sceneManager.sceneObjects.allObjects as THREE.Group;
        const allObjectsChildren = allObjects.children;
        const allMesh: THREE.Mesh[] = [];
        allObjectsChildren.forEach(oc => {
          const meshChildren = oc.children.filter(c => c.type === "Mesh") as THREE.Mesh[];
          allMesh.push(...meshChildren);
        });
        console.log("allMesh:", allMesh);
        // set initial colors if needed
        if (this.colors) {
          this.setColors(this.colors);
        }
        this.loaded(allMesh);
      }
    });
    this.viewer.on("select", (objects: any[]) => {
      this.selectedObjects.splice(0, this.selectedObjects.length);
      this.selectedObjects.push(...objects);
      this.$emit("selection", this.selectedObjects);
    });
  }

  async setColors(colors: Color[]) {
    if (colors && colors.length > 0) {
      const changeList = colors.map((c) => {
        return {
          key: c.id,
          value: c.color
        }
      });

      console.log("[setColors] changeList:", changeList, { ...changeList });
      const changeListObj = changeList.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {});
      console.log("changeListObj:", changeListObj);

      const res = await this.viewer.applyFilter({
        colorBy: {
          type: "category",
          property: "speckle_type",
          values: changeListObj,
          default: '#636363'
        },
      });

      console.log("[setColors] done:", res);
    }
  }

  resetColors() {
    console.log("reset");
    this.viewer.applyFilter(null);
  }

  instanceOfObjectColor(object: any): object is Color {
    return object && "color" in object;
  }

  @Emit("loaded")
  loaded(allMesh: THREE.Mesh[]) {
    return allMesh;
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
