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
    console.log("objecturls:", this.objecturls);

    if (!renderDomElement) {
      renderDomElement = document.createElement("div");
      renderDomElement.id = "renderer";
    }

    this.domElement = renderDomElement;
    this.domElement.style.display = "inline-block";
    // if (this.$refs.rendererparent) {
    console.log("rendererparent", this.$refs.rendererparent);
    (this.$refs.rendererparent as any).appendChild(renderDomElement);
    // }

    this.viewer = new Viewer({ contained: renderDomElement });
    this.objecturls.forEach((url) => {
      console.log("[Renderer mounted] url:", url);
      this.viewer.loadObject(url, this.token);
    });

    this.viewer.on("load-progress", (args: any) => {
      this.loading = args.progress * 100;
      this.viewer.interactions.zoomExtents();
    });
    this.viewer.on("load-warning", ({ message }: any) => {
      console.log("load-warning", message);
    });
    this.viewer.on("select", (objects: any[]) => {
      // console.log(objects)
      this.selectedObjects.splice(0, this.selectedObjects.length);
      this.selectedObjects.push(...objects);
      this.$emit("selection", this.selectedObjects);
    });
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
