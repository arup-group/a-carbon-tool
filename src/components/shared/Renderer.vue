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
import { DefaultViewerParams, NumericPropertyInfo, PropertyInfo, SelectionEvent, Viewer, ViewerEvent } from "@speckle/viewer";

import * as THREE from "three";
import {
  Color,
  Filter,
  Filters,
  GradientColor,
  RendererLoaded,
  SelectObject,
  SpeckleProperty,
  UserData,
} from "@/models/renderer/";

interface StringPropertyInfo extends PropertyInfo {
  type: "string";
  valueGroups: { value: string; ids: string[] }[];
}

function instanceOfNumericPropertyInfo(object: any): object is NumericPropertyInfo {
  return "type" in object && object.type === "number" && "key" in object;
}
function instanceOfStringPropertyInfo(object: any): object is StringPropertyInfo {
  return "type" in object && object.type === "string" && "key" in object;
}

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

    this.viewer.on(ViewerEvent.ObjectClicked, (selectionInfo: SelectionEvent | null) => {
      console.log("selectionInfo:", selectionInfo)
      if (!selectionInfo) {
        this.viewer.resetSelection()
      } else {
        // this.viewer.selectObjects(selectionInfo.hits.map(h => (h.object as any).id))
        console.log("id:", (selectionInfo.hits[0].object as any).id)
        this.viewer.selectObjects([(selectionInfo.hits[0].object as any).id])
      }
      // if (selectionInfo) {
      //   // Object was clicked. Focus in on it
      //   this.viewer.zoom([selectionInfo.userData.id as string])
      // }
      // else {
      //   // No object clicked. Restore focus to entire scene
      //   this.viewer.zoom()	
      // }
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
    this.viewer.setLightConfiguration({
      castShadow: false
    });
    const properties = this.findFilters();
    const allObjects = (this.viewer as any).speckleRenderer.allObjects as THREE.Group;
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
    const allProperties: PropertyInfo[] = this.viewer.getObjectProperties();
    const stringProperties: StringPropertyInfo[] = allProperties.filter(instanceOfStringPropertyInfo);
    const numericProperties: NumericPropertyInfo[] = allProperties.filter(instanceOfNumericPropertyInfo);
    const properties = [...stringProperties, ...numericProperties];
    // const properties: (NumericPropertyInfo | StringPropertyInfo)[] = allProperties.filter(p => instanceOfNumericPropertyInfo(p) || instanceOfStringPropertyInfo(p))
    console.log("properties:", properties)
    //  as {
    //   [key: string]: SpeckleProperty<number | string | boolean>;
    // };
    let keys = Object.keys(properties);
    let cleanedProps: Filters = properties.map((p): Filter<string | number | boolean> => {
      if (p.key.startsWith("parameters.")) {
        if (p.key.endsWith(".value")) {
          let name = p.key.split(".").slice(-1)[0];
          let data: SpeckleProperty<string | number | boolean> = {
            allValues: p.valueGroups.map(i => i.value),
            maxValue: instanceOfStringPropertyInfo(p) ? "" : p.max,
            minValue: instanceOfStringPropertyInfo(p) ? "" : p.min,
            type: p.type,

          };
          let rawName = p.key;
          return {
            name,
            rawName,
            data,
          };
        }
      }
      let [rawName] = p.key.split(".").slice(-1);
      let data: SpeckleProperty<string | number | boolean> = {
            allValues: p.valueGroups.map(i => i.value),
            maxValue: instanceOfStringPropertyInfo(p) ? "" : p.max,
            minValue: instanceOfStringPropertyInfo(p) ? "" : p.min,
            type: p.type,

          };
      return {
        name: rawName,
        rawName,
        data,
      };
    });
    console.log("cleanedProps:", cleanedProps)
    return cleanedProps;
  }

  async setColors(colors: Color[]) {
    // const groups = colors.map(c => ({ objectIds: [c.id], color: c.color ? c.color : "" }));
    const colorGroups: { [color: string]: string[] } = {};
    colors.forEach(c => {
      if (c.color) {
        if (c.color in colorGroups && colorGroups[c.color].length > 0) {
          colorGroups[c.color].push(c.id);
        } else {
          colorGroups[c.color] = [c.id];
        }
      }
    });
    console.log("colorGroups:", colorGroups)
    const groups = Object.entries(colorGroups).map(c => ([{ objectIds: c[1], color: c[0] }]));
    console.log("groups:", groups);
    groups.forEach(async (group) => {
      const res = await this.viewer.setUserObjectColors(group as [{
        objectIds: string[];
        color: string;
      }]);
      console.log("res:", res);
    })
    // this.viewer.setUserObjectColors(groups);
    // console.log("setColors, colors:", colors);
    // if (colors && colors.length > 0) {
    //   const values: { [id: string]: string } = {};
    //   colors.forEach((c) => {
    //     Object.assign(values, { [c.id]: c.color });
    //   });
    //   await this.viewer.applyFilter({
    //     colorBy: {
    //       type: "category",
    //       property: "id",
    //       values,
    //       default: "#636363",
    //     },
    //   });
    // }
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
