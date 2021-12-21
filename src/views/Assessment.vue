<template>
  <v-main>
    <v-row>
      <v-col cols="4">
        <AssessmentStepper
          style="z-index: 1"
          @loadStream="loadStream"
          v-if="availableStreams.length !== 0"
          :streams="availableStreams"
        />
      </v-col>
      <v-col cols="8">
        <Renderer
          v-if="objectURLs.length !== 0"
          :objecturls="objectURLs"
          :token="token"
        />
      </v-col>
    </v-row>
  </v-main>
</template>

<script lang="ts">
import AssessmentStepper from "@/components/AssessmentStepper.vue";
import Renderer from "@/components/Renderer.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: { AssessmentStepper, Renderer },
})
export default class Assessment extends Vue {
  availableStreams = [];
  objectURLs = [];
  token = "";
  mounted() {
    this.token = this.$store.state.token.token;
    this.$store.dispatch("getUserStreams").then((res) => {
      this.availableStreams = res.data.user.streams.items.map((i: any) => {
        return { label: i.name, value: i.id };
      });
      console.log(res);
    });
  }
  async loadStream(id: string) {
    console.log("id loaded", id);
    this.objectURLs = await this.$store.dispatch("getObjectUrls", id);
    console.log("URL", this.objectURLs);
  }
}
</script>

<style scoped></style>
