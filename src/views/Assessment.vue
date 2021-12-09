<template>
<div>
  <p>Assessment working!</p>
  <Renderer v-if="urlsLoaded" :objecturls="objectUrls" :token="token" />
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StreamReferenceObjects } from "@/models/graphql";
import Renderer from "@/components/Renderer.vue";

@Component({
  components: { Renderer }
})
export default class Assessment extends Vue {
  objectUrls: string[] = [];
  token!: string;

  mounted() {
    this.$store.dispatch("getObjectUrls", "67899fd79d").then((res: string[]) => {
      console.log("res:", res);
      this.objectUrls = res;
    });

    console.log("token:", this.$store.state.token.token)
    this.token = this.$store.state.token.token;
  }

  get urlsLoaded() {
    return this.objectUrls.length > 0;
  }
}
</script>

<style scoped></style>
