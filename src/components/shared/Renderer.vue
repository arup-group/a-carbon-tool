<template>
  <div
    style="width: 100%; height: 100%"
    class="d-flex justify-center flex-column align-center"
  >
    <div
      ref="rendererparent"
      id="rendererparent"
      style="height: 700px; width: 100%"
      class="d-flex flex-column justify-center align-center"
    >
      <v-progress-linear
        v-if="loading <= 100"
        v-model="loading"
        height="4"
        rounded
        class="vertical-center elevation-10"
        style="width: 45%"
      ></v-progress-linear>
    </div>
    <v-card
      class="elevation-5 rounded-xl pl-3 py-0 d-flex align-center justify-center"
      height="44"
      style="max-width: 10vw; overflow-x: auto; overflow-y: hidden"
    >
      <v-menu
        :close-on-content-click="false"
        origin="center"
        rounded="lg"
        open-on-hover
        top
        offset-y
        close-delay="400"
        nudge-top="10"
        nudge-left="100"
        nudge-width="200"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            :small="small"
            rounded
            icon
            class="mr-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small>mdi-white-balance-sunny</v-icon>
          </v-btn>
        </template>
        <renderer-lighting-options v-model="config" />
      </v-menu>
    </v-card>
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
  Filters,
  GradientColor,
  RendererLoaded,
  UserData,
} from "@/models/renderer/";

import RendererLightingOptions from "./RendererLightingOptions.vue";

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

@Component({
  components: { RendererLightingOptions }
})
export default class extends Vue {
  @Prop() objecturls!: string[];
  @Prop() token!: string;
  @Prop() colors!: Color[];
  @Prop() gradientColorProperty!: GradientColor;
  @Prop() display!: boolean;
  @Prop() selectedIds!: string[];
  @Prop() filtered!: boolean;
  @Prop() allIds!: string[];

  small = false;
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
      const data = propertyData.find((v) => v.key === value.property);
      if (data) this.viewer.setColorFilter(data);
    }
  }

  domElement!: any;
  alertMessage!: string;
  showAlert = false;
  viewer!: Viewer;

  loading = 0;
  failed = false;
  async mounted() {
    this.renderStream(this.objecturls);
  }
  async beforeDestroy() {
    await this.viewer.cancelLoad(this.objecturls[0], true);
    await this.viewer.unloadAll();
  }
  @Watch("objecturls")
  async urlsChanged(newVal: string[]) {
    document.getElementById("renderer")?.remove();
    await this.viewer.unloadAll();
    this.renderStream(newVal);
  }

  async renderStream(objecturls: string[]) {
    if (this.$store.state.speckleViewer.viewer) {
      this.viewer = this.$store.state.speckleViewer.viewer;

      this.domElement = this.$store.state.speckleViewer.container;

      (this.$refs.rendererparent as any).appendChild(this.domElement);
    } else {
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

      this.$store.commit("setSpeckleViewer", {
        viewer: this.viewer,
        container: this.domElement,
      });

      await this.viewer.init();
    }

    this.viewer.on(ViewerEvent.LoadProgress, (args) => {
      this.loading = Math.ceil(args.progress * 100);
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
            const isSelected = this.selectedObjects.find(
              (so) => so.id === (si.object as any).id
            );
            if (!isSelected) {
              const isIn = this.visibleObjects.find(
                (vo) => vo === (si.object as any).id
              );
              if (isIn && objectWasSelected == false) {
                objectWasSelected = true;
                this.selectedObjects.push(si.object as any);
                await this.viewer.selectObjects(
                  this.selectedObjects.map((so) => so.id)
                );
              }
            } else objectWasSelected = true;
          });
          if (!objectWasSelected) {
            this.viewer.resetSelection();
            this.selectedObjects = [];
          }
        }
        this.objectsSelected(this.selectedObjects);
      }
    );

    this.viewer.resize();
    this.viewer.cameraHandler.onWindowResize();
    await this.viewer.loadObject(objecturls[0], this.token);
    if (this.colors) this.setColors(this.colors);
    this.viewer.setLightConfiguration(this.config);
    this.viewer.setView("3D");

    this.loading = 101;
    this.afterLoad();
  }

  async setSelect() {
    if (this.filtered === true) {
      this.visibleObjects = this.selectedIds;
      await this.viewer.isolateObjects(this.selectedIds);
    } else {
      await this.viewer.resetFilters();
      this.setColors(this.colors);
      this.updateAllIds();
    }
  }
  afterLoad() {
    const properties = this.findFilters();
    const allMesh: THREE.Mesh[] = []; // NEEDED FOR AUTOMATIC VOLUME CALC, REMOVING FOR NOW
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
  }

  async setColors(colors: Color[]) {
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
    const groups = Object.entries(colorGroups).map((c) => ({
      objectIds: c[1],
      color: c[0],
    }));
    const res = await this.viewer.setUserObjectColors(
      groups as [{ objectIds: string[]; color: string }]
    );
  }

  async resetColors() {
    await this.viewer.resetFilters();
    this.viewer.requestRender();
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
#rendererparent {
  position: relative;
  display: block;
  width: 100%;
  height: 80vh;
}
#renderer {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80vh;
}
</style>
