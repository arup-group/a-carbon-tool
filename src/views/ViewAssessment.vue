<template>
  <v-container class="d-flex justify-space-between pt-5 container">
    <div class="d-flex flex-column justify-space-between" height="100%">
      <project-info-card class="card" />
      <view-assessment-buttons class="card" />
    </div>
    <Renderer
      v-if="urlsLoaded"
      :objecturls="objectUrls"
      :token="token"
      class="renderer"
    />
    <div class="d-flex flex-column justify-space-between" height="100%">
      <a-breakdown-card class="card" />
      <material-breakdown-card class="card" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AssessmentComplete } from "@/models/assessment";

import Renderer from "@/components/Renderer.vue";
import ProjectInfoCard from "@/components/ProjectInfoCard.vue";
import ABreakdownCard from "@/components/ABreakdownCard.vue";
import MaterialBreakdownCard from "@/components/MaterialBreakdownCard.vue";
import ViewAssessmentButtons from "@/components/ViewAssessmentButtons.vue";

@Component({
  components: {
    Renderer,
    ProjectInfoCard,
    ABreakdownCard,
    MaterialBreakdownCard,
    ViewAssessmentButtons
  },
})
export default class ViewAssessment extends Vue {
  objectUrls: string[] = [];
  token!: string;

  mounted() {
    this.$store
      .dispatch("getObjectUrls", this.assessment.streamId)
      .then((res: string[]) => {
        this.objectUrls = res;
      });

    console.log("token:", this.$store.state.token.token);
    this.token = this.$store.state.token.token;
  }

  get urlsLoaded() {
    return this.objectUrls.length > 0;
  }

  assessment: AssessmentComplete = {
    // dummy data
    streamId: "67899fd79d",
    projectInfo: {
      reportDate: new Date("02-11-21"),
      Author: "Tom Bunn",
      JN: "000001",
      systemCost: 100000,
      floorArea: 10000,
      notes: "",
      totalCO2e: 3400,
      totalkgCO2e: 340,
    },
    materialBreakdown: {
      materials: [
        {
          name: "some value 1",
          value: 50,
        },
        {
          name: "some value 2",
          value: 20,
        },
        {
          name: "some value 3",
          value: 10,
        },
      ],
    },
    aBreakdown: {
      levels: [
        {
          name: "A1-A3",
          tCO2e: 2800,
          kgCO2e: 280,
        },
        {
          name: "A4",
          tCO2e: 150,
          kgCO2e: 15,
        },
        {
          name: "A5",
          tCO2e: 250,
          kgCO2e: 25,
        },
      ],
    },
  };
}
</script>

<style scoped>
.renderer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.card {
  position: relative;
  z-index: 1;
}
.container {
  height: 80vh;
}
</style>
