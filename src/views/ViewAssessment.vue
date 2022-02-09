<template>
  <v-container class="d-flex justify-space-between pt-5 container">
    <div class="d-flex flex-column justify-space-between card-container">
      <project-info-card class="card" :projectInfo="projectInfo" />
      <view-assessment-buttons class="card" />
    </div>
    <Renderer
      v-if="urlsLoaded && chartDataReady"
      :objecturls="objectUrls"
      :token="token"
      class="renderer"
    />
    <div class="d-flex flex-column justify-space-between card-container">
      <a-breakdown-card
        v-if="urlsLoaded && chartDataReady"
        class="card"
        :aBreakdown="aBreakdown"
      />
      <material-breakdown-card
        v-if="urlsLoaded && chartDataReady"
        class="card"
        :materialBreakdown="materialBreakdown"
      />
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
    ViewAssessmentButtons,
  },
})
export default class ViewAssessment extends Vue {
  objectUrls: string[] = [];
  token!: string;
  chartDataReady = false;

  mounted() {
    this.$store
      .dispatch("getObjectUrls", this.assessment.streamId)
      .then((res: string[]) => {
        this.objectUrls = res;
      });

    this.token = this.$store.state.token.token;
  }

  async created() {
    const testData = await this.$store.dispatch(
      "loadActReportData",
      this.$route.params.streamId
    );
    this.assessment = testData.data;
    this.chartDataReady = testData.ready;
  }

  get urlsLoaded() {
    return this.objectUrls.length > 0 && this.chartDataReady;
  }
  get projectInfo() {
    return this.assessment.projectInfo;
  }
  get aBreakdown() {
    return this.assessment.aBreakdown;
  }
  get materialBreakdown() {
    return this.assessment.materialBreakdown;
  }
  get streamId() {
    return this.$route.params.streamId;
  }

  assessment: AssessmentComplete = {
    // dummy data
    streamId: this.$route.params.streamId,
    projectInfo: {
      name: "",
      type: "",
      reportDate: new Date(1946, 4, 1),
      author: "",
      JN: "000001",
      systemCost: 0,
      floorArea: 0,
      notes: "",
      totalCO2e: 0,
      totalkgCO2e: 0,
    },
    materialBreakdown: {
      materials: [
        {
          name: "some value 1",
          value: 50,
        },
      ],
    },
    aBreakdown: {
      levels: [
        {
          name: "A1-A3",
          tCO2e: 0,
          kgCO2e: 0,
        },
        {
          name: "A4",
          tCO2e: 0,
          kgCO2e: 0,
        },
        {
          name: "A5",
          tCO2e: 0,
          kgCO2e: 0,
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
.card-container {
  width: 25%;
  min-width: 20rem;
}
</style>
