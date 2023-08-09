<template>
  <div class="d-flex justify-center align-center" style="height: 70vh">
    <v-card width="50%" class="text-center">
      <v-card-text class="white--text">
        <p>You have not been assigned to any streams.</p>
        <p>
          Please go to your selected server,
          <a :href="serverUrl" target="_blank">{{ serverUrl }}</a>
          , and either create a new stream or be added to an existing one.
        </p>
        <p>
          For more information on how to use Speckle, please visit the
          <a :href="SpeckleDocsUrl" target="_blank">Speckle docs</a>.
        </p>
      </v-card-text>
    </v-card>
  </div>
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
