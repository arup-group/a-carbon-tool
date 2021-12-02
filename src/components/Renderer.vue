<template>
  <div id="renderer"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Viewer as any } from "@speckle/viewer";

@Component
export default class extends Vue {
  domElement!: any;
  mounted() {
    let renderDomElment = document.getElementById("renderer");

    this.domElement = renderDomElment;
    this.domElement.style.display = 'inline-block';
    if (this.$refs.rednererparent) {
      this.$refs.rendererparent.appendChild(renderDomElement)
    }
  }
}
</script>
