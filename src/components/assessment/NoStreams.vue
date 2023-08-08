<template>
  <v-container class="text-center">
    <p>You have not been assigned to any streams.</p>
    <p>
      Please go to your selected server,
      <a :href="serverUrl" target="_blank">{{ serverUrl }}</a>
      , and either create a new stream or be added to an existing stream.
    </p>
    <p>
      More info on how to use Speckle can be found at the
      <a :href="SpeckleDocsUrl" target="_blank">Speckle docs</a>.
    </p>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class NoStreams extends Vue {
  @Prop() serverUrl!: string;

  get SpeckleDocsUrl() {
    return this.serverUrl.includes("arup")
      ? "https://speckle.arup.com/tutorials/get_started.html"
      : "https://speckle.guide/";
  }
}
</script>
