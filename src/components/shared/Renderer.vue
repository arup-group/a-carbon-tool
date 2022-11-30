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
import { DefaultViewerParams, SelectionEvent, Viewer, ViewerEvent } from "@speckle/viewer";

import * as THREE from "three";
import {
  Color,
  Filters,
  GradientColor,
  RendererLoaded,
  SelectObject,
  SpeckleProperty,
  UserData,
} from "@/models/renderer/";

@Component
export default class extends Vue {
  @Prop() objecturls!: string[];
  @Prop() token!: string;
  @Prop() colors!: Color[];
  @Prop() gradientColorProperty!: GradientColor;
  @Prop() display!: boolean;
  @Prop() selectedIds!: string[];
  @Prop() filtered!: boolean;

  currentColors: Color[] = [];

  @Watch("colors")
  onObjectColorChanged(value: Color[]) {
    if (value.length === 0 || this.gradientColorProperty) this.resetColors();
    else this.setColors(value);
  }

  @Watch("selectedIds")
  onMaterialChange() {
    this.setSelect();
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
  viewer!: Viewer;
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

    this.viewer = new Viewer(renderDomElement, { ...DefaultViewerParams, showStats: false });
    console.log("this.viewer:", this.viewer)
    objecturls.forEach(async (url) => {
      await this.viewer.loadObject(url, this.token);

      this.afterLoad();
    });

    this.viewer.on(ViewerEvent.LoadProgress, (args) => {
      this.loading = Math.ceil(args.progress * 100);
      // this.viewer.interactions.zoomExtents();
    });

    this.viewer.on(ViewerEvent.ObjectClicked, (selectionInfo: SelectionEvent) => {
      if (selectionInfo) {
        // Object was clicked. Focus in on it
        this.viewer.zoom([selectionInfo.userData.id as string])
      }
      else {
        // No object clicked. Restore focus to entire scene
        this.viewer.zoom()	
      }
    })
    // no event for object deselection, so the below is a little weird (and will probably break at some point)
    // this.viewer.on(ViewerEvent.ObjectClicked, (args: any) => {
    //   console.log("args:", args)
    // })
    // this.viewer.interactions.selectionHelper.on("object-clicked", () => {
    //   this.objectsSelected(this.viewer.interactions.selectedObjectsUserData);
    // });
  }

  async setSelect() {
    if (this.filtered === true) {
      await this.viewer.applyFilter({
        filterBy: {
          id: this.selectedIds
        }
      });
    } else {
      await this.viewer.applyFilter(null);
      this.setColors(this.colors);
    }
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
      const values: { [id: string]: string } = {};
      colors.forEach((c) => {
        Object.assign(values, { [c.id]: c.color });
      });
      await this.viewer.applyFilter({
        colorBy: {
          type: "category",
          property: "id",
          values,
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

  @Emit("objectsSelected")
  objectsSelected(objects: UserData[]) {
    return objects;
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
