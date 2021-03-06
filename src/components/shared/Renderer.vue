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
import {
  Color,
  Filters,
  GradientColor,
  RendererLoaded,
  SpeckleProperty,
} from "@/models/renderer/";

@Component
export default class extends Vue {
  @Prop() objecturls!: string[];
  @Prop() token!: string;
  @Prop() colors!: Color[];
  @Prop() gradientColorProperty!: GradientColor;

  currentColors: Color[] = [];

  @Watch("colors")
  onObjectColorChanged(value: Color[]) {
    if (value.length === 0 || this.gradientColorProperty) this.resetColors();
    else this.setColors(value);
  }

  @Watch("gradientColorProperty")
  async onGradientChange(value: GradientColor) {
    if (value) {
      await this.viewer.applyFilter({
        colorBy: {
          type: "gradient",
          property: value.property,
          minValue: value.minValue,
          maxValue: value.maxValue,
          gradientColors: value.colors,
        },
      });
    }
  }

  domElement!: any;
  alertMessage!: string;
  showAlert = false;
  viewer!: any;
  selectedObjects: any[] = [];

  loading = 0;
  failed = false;
  mounted() {
    this.renderStream(this.objecturls);
  }
  @Watch("objecturls")
  urlsChanged(newVal: string[]) {
    document.getElementById("renderer")?.remove();
    this.renderStream(newVal);
  }

  renderStream(objecturls: string[]) {
    let renderDomElement = document.getElementById("renderer");

    if (!renderDomElement) {
      renderDomElement = document.createElement("div");
      renderDomElement.id = "renderer";
    }

    this.domElement = renderDomElement;
    this.domElement.style.display = "inline-block";
    (this.$refs.rendererparent as any).appendChild(renderDomElement);

    this.viewer = new Viewer({ contained: renderDomElement, showStats: false });
    objecturls.forEach(async (url) => {
      await this.viewer.loadObject(url, this.token);

      this.afterLoad();
    });

    this.viewer.on("load-progress", (args: any) => {
      this.loading = Math.ceil(args.progress * 100);
      this.viewer.interactions.zoomExtents();
    });
    this.viewer.on("select", (objects: any[]) => {
      this.selectedObjects.splice(0, this.selectedObjects.length);
      this.selectedObjects.push(...objects);
    });
  }

  afterLoad() {
    const properties = this.findFilters();
    const allObjects = this.viewer.sceneManager.sceneObjects
      .allObjects as THREE.Group;
    const allObjectsChildren = allObjects.children;
    const allMesh: THREE.Mesh[] = [];
    allObjectsChildren.forEach((oc) => {
      const meshChildren = oc.children.filter(
        (c) => c.type === "Mesh"
      ) as THREE.Mesh[];

      allMesh.push(...meshChildren);
    });
    // set initial colors if needed
    if (this.colors) {
      this.setColors(this.colors);
    }

    this.loaded(properties, allMesh);
  }

  findFilters() {
    const properties = this.viewer.getObjectsProperties() as {
      [key: string]: SpeckleProperty<number | string | boolean>;
    };
    let keys = Object.keys(properties);
    let cleanedProps: Filters = keys.map((k) => {
      if (k.startsWith("parameters.")) {
        if (k.endsWith(".value")) {
          let name = properties[k.replace(".value", ".name")]
            .allValues[0] as string;
          let data = properties[k];
          let rawName = k;
          return {
            name,
            rawName,
            data,
          };
        }
      }
      let [rawName] = k.split(".").slice(-1);
      return {
        name: k,
        rawName,
        data: properties[k],
      };
    });
    return cleanedProps;
  }

  async setColors(colors: Color[]) {
    if (colors && colors.length > 0) {
      const changeList = colors.map((c) => {
        return {
          key: c.id,
          value: c.color,
        };
      });

      const changeListObj = changeList.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.value }),
        {}
      );
      const res = await this.viewer.applyFilter({
        colorBy: {
          type: "category",
          property: "speckle_type",
          values: changeListObj,
          default: "#636363",
        },
      });
    }
  }

  resetColors() {
    this.viewer.applyFilter(null);
  }

  instanceOfObjectColor(object: any): object is Color {
    return object && "color" in object;
  }

  @Emit("loaded")
  loaded(properties: Filters, allMesh: THREE.Mesh[]): RendererLoaded {
    return { properties, allMesh };
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
