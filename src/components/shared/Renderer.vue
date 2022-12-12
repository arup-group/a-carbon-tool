<template>
  <div>
    <!-- COME BACK TO THIS LATER!!!! -->
    <!-- <v-card style="z-index: 1">
      <v-card-text>
        <div class="d-flex align-center">
          <span class="mr-5">Sun shadows</span>
          <v-switch v-model="config.enabled" inset :label="``" />
        </div>
        <v-slider
          v-model="config.intensity"
          step="0"
          max="10"
          min="1"
          :thumb-size="24"
          label="Sun intensity"
          :disabled="!config.enabled"
        />
        <v-slider
          v-model="config.elevation"
          step="0"
          :min="0"
          :max="Math.PI"
          :thumb-size="24"
          label="Sun elevation"
          :disabled="!config.enabled"
        />
        <v-slider
          v-model="config.azimuth"
          step="0"
          :min="-Math.PI * 0.5"
          :max="Math.PI * 0.5"
          :thumb-size="24"
          label="Sun azimuth"
          :disabled="!config.enabled"
        />
        <v-slider
          v-model="config.indirectLightIntensity"
          step="0"
          min="0.0"
          max="5.0"
          :thumb-size="24"
          label="Indirect light"
        />
      </v-card-text>
    </v-card> -->
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
import {
  DefaultLightConfiguration,
  DefaultViewerParams,
  NumericPropertyInfo,
  PropertyInfo,
  SelectionEvent,
  Viewer,
  ViewerEvent,
} from "@speckle/viewer";

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
import { watch } from "vue";

interface StringPropertyInfo extends PropertyInfo {
  type: "string";
  valueGroups: { value: string; ids: string[] }[];
}

function instanceOfNumericPropertyInfo(
  object: any
): object is NumericPropertyInfo {
  return "type" in object && object.type === "number" && "key" in object;
}
function instanceOfStringPropertyInfo(
  object: any
): object is StringPropertyInfo {
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
  @Prop() allIds!: string[];

  currentColors: Color[] = [];
  config = { ...DefaultLightConfiguration };
  visibleObjects: string[] = []; // all the id's that are currently visible
  selectedObjects: UserData[] = [];
  @Watch("config", { deep: true })
  updateConfig() {
    this.viewer.setLightConfiguration(this.config);
  }

  @Watch("allIds")
  updateAllIds() {
    this.visibleObjects = this.allIds;
    console.log("visibleObjects:", this.visibleObjects);
  }

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
      const propertyData = this.viewer.getObjectProperties();
      const data = propertyData.find((v) => v.key === value.property );
      if (data) this.viewer.setColorFilter(data);
      else console.log("no data :(", data, "value:", value);
    }
  }

  domElement!: any;
  alertMessage!: string;
  showAlert = false;
  viewer!: Viewer;
  // selectedObjects: any[] = [];

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

    this.viewer = new Viewer(renderDomElement, {
      ...DefaultViewerParams,
      showStats: false,
    });
    console.log("this.viewer:", this.viewer);
    objecturls.forEach(async (url) => {
      await this.viewer.loadObject(url, this.token);

      this.afterLoad();
    });

    this.viewer.on(ViewerEvent.LoadProgress, (args) => {
      this.loading = Math.ceil(args.progress * 100);
      // this.viewer.interactions.zoomExtents();
    });

    this.viewer.on(
      ViewerEvent.ObjectClicked,
      (selectionInfo: SelectionEvent | null) => {
        if (!selectionInfo) {
          this.viewer.resetSelection();
          this.selectedObjects = [];
        } else {
          let objectWasSelected = false;
          if (!selectionInfo.multiple) this.selectedObjects = [];
          selectionInfo.hits.forEach(async (si) => {
            const isSelected = this.selectedObjects.find(so => so.id === (si.object as any).id);
            if (!isSelected) {
              const isIn = this.visibleObjects.find(vo => vo === (si.object as any).id);
              if (isIn && objectWasSelected == false) {
                objectWasSelected = true
                this.selectedObjects.push(si.object as any)
                await this.viewer.selectObjects(this.selectedObjects.map(so => so.id));
              }
            } else objectWasSelected = true;
          });
          if (!objectWasSelected) {
            this.viewer.resetSelection();
            this.selectedObjects = [];
          }
        }
        this.objectsSelected(this.selectedObjects)
      }
    );
  }

  async setSelect() {
    if (this.filtered === true) {
      this.visibleObjects = this.selectedIds;
      await this.viewer.isolateObjects(this.selectedIds);
    } else {
      // await this.viewer.applyFilter(null);
      await this.viewer.resetFilters();
      this.setColors(this.colors);
      this.updateAllIds();
    }
  }
  afterLoad() {
    console.log("defaultLightConfiguration:", DefaultLightConfiguration);

    console.log("viewer:", this.viewer);
    const properties = this.findFilters();
    const allObjects = (this.viewer as any).speckleRenderer
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
    const allProperties: PropertyInfo[] = this.viewer.getObjectProperties();
    const stringProperties: StringPropertyInfo[] = allProperties.filter(
      instanceOfStringPropertyInfo
    );
    const numericProperties: NumericPropertyInfo[] = allProperties.filter(
      instanceOfNumericPropertyInfo
    );
    const propertiesArr = [...stringProperties, ...numericProperties];
    const properties: {
      [key: string]: StringPropertyInfo | NumericPropertyInfo;
    } = {};
    propertiesArr.forEach((pa) => {
      properties[pa.key] = pa;
    });
    // const properties: (NumericPropertyInfo | StringPropertyInfo)[] = allProperties.filter(p => instanceOfNumericPropertyInfo(p) || instanceOfStringPropertyInfo(p))
    console.log("properties:", properties);
    //  as {
    //   [key: string]: SpeckleProperty<number | string | boolean>;
    // };
    let keys = Object.keys(properties);
    let cleanedProps: Filters = keys.map((k) => {
      if (k.startsWith("parameters.")) {
        if (k.endsWith(".value")) {
          let name = properties[k.replace(".value", ".name")].valueGroups[0]
            .value as string;
          let data = properties[k];
          let rawName = k;
          return {
            name,
            rawName,
            data: {
              allValues: data.valueGroups.map((vg) => vg.value),
              maxValue: instanceOfNumericPropertyInfo(data) ? data.max : "",
              minValue: instanceOfNumericPropertyInfo(data) ? data.min : "",
              type: data.type,
            },
          };
        }
      }
      let [rawName] = k.split(".").slice(-1);
      let data = properties[k];
      return {
        name: k,
        rawName,
        data: {
          allValues: data.valueGroups.map((vg) => vg.value),
          maxValue: instanceOfNumericPropertyInfo(data) ? data.max : "",
          minValue: instanceOfNumericPropertyInfo(data) ? data.min : "",
          type: data.type,
        },
      };
    });
    return cleanedProps;
    // let keys = Object.keys(properties);
    // let cleanedProps: Filters = properties.map((p): Filter<string | number | boolean> => {
    //   if (p.key.startsWith("parameters.")) {
    //     if (p.key.endsWith(".value")) {
    //       let name = p.key.split(".").slice(-1)[0];
    //       let data: SpeckleProperty<string | number | boolean> = {
    //         allValues: p.valueGroups.map(i => i.value),
    //         maxValue: instanceOfStringPropertyInfo(p) ? "" : p.max,
    //         minValue: instanceOfStringPropertyInfo(p) ? "" : p.min,
    //         type: p.type,

    //       };
    //       let rawName = p.key;
    //       return {
    //         name,
    //         rawName,
    //         data,
    //       };
    //     }
    //   }
    //   let [rawName] = p.key.split(".").slice(-1);
    //   let data: SpeckleProperty<string | number | boolean> = {
    //         allValues: p.valueGroups.map(i => i.value),
    //         maxValue: instanceOfStringPropertyInfo(p) ? "" : p.max,
    //         minValue: instanceOfStringPropertyInfo(p) ? "" : p.min,
    //         type: p.type,

    //       };
    //   return {
    //     name: p.key,
    //     rawName,
    //     data,
    //   };
    // });
    // console.log("cleanedProps:", cleanedProps)
    // return cleanedProps;
  }

  async setColors(colors: Color[]) {
    // const groups = colors.map(c => ({ objectIds: [c.id], color: c.color ? c.color : "" }));
    const colorGroups: { [color: string]: string[] } = {};
    colors.forEach((c) => {
      if (c.color) {
        if (c.color in colorGroups && colorGroups[c.color].length > 0) {
          colorGroups[c.color].push(c.id);
        } else {
          colorGroups[c.color] = [c.id];
        }
      }
    });
    console.log("colorGroups:", colorGroups);
    const groups = Object.entries(colorGroups).map((c) => ({
      objectIds: c[1],
      color: c[0],
    }));
    const res = await this.viewer.setUserObjectColors(
      groups as [{ objectIds: string[]; color: string }]
    );
    console.log("res:", res);
    // console.log("groups:", groups);
    // groups.forEach(async (group) => {
    //   const res = await this.viewer.setUserObjectColors(group as [{
    //     objectIds: string[];
    //     color: string;
    //   }]);
    //   console.log("res:", res);
    // })
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
    console.log("selectedObjects:", objects)
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
