<template>
  <v-main>
    <v-btn color="primary" outlined @click="back" style="z-index: 1">
      Back to reports
    </v-btn>
    <loading-container :error="error" :loading="loading" @retry="loadReport">
      <template v-slot="{ loaded }">
        <v-container
          v-if="loaded"
          class="d-flex justify-space-between container"
          fluid
        >
          <div class="d-flex flex-column justify-space-between card-container">
            <project-info-card class="card" :projectInfo="projectInfo" />
          </div>
          <Renderer
            v-if="urlsLoaded && chartDataReady"
            :objecturls="objectUrls"
            :token="token"
            :colors="colors"
            class="renderer"
          />
          <div
            class="d-flex flex-column justify-space-between card-container"
            v-if="urlsLoaded && chartDataReady"
          >
            <a-breakdown-card class="card" :aBreakdown="aBreakdown" />
            <material-breakdown-card
              class="card"
              :materialBreakdown="materialBreakdown"
            />
          </div>
        </v-container>
      </template>
    </loading-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Renderer from "@/components/shared/Renderer.vue";
import ProjectInfoCard from "@/components/viewAssessment/ProjectInfoCard.vue";
import ABreakdownCard from "@/components/viewAssessment/ABreakdownCard.vue";
import MaterialBreakdownCard from "@/components/viewAssessment/MaterialBreakdownCard.vue";
import { Color } from "@/models/renderer";
import { LoadActReportDataInput } from "@/store";
import { ILoadStreamData, LoadStreamOut } from "./utils/viewAssessmentUtils";

import LoadingContainer from "@/components/shared/LoadingContainer.vue";

@Component({
  components: {
    Renderer,
    ProjectInfoCard,
    ABreakdownCard,
    MaterialBreakdownCard,
    LoadingContainer,
  },
})
export default class ViewAssessment extends Vue {
  objectUrls: string[] = [];
  token!: string;
  chartDataReady = false;
  colors: Color[] = [];
  assessment!: ILoadStreamData;
  loading = true;
  error = false;
  streamId = this.$route.params.streamId;

  mounted() {
    this.$store
      .dispatch("getObjectUrls", this.streamId)
      .then((res: string[]) => {
        this.objectUrls = [res[0]];
      });

    this.token = this.$store.state.token.token;
  }

  back() {
    this.$router.push(`/${this.streamId}`);
  }

  created() {
    this.loadReport();
  }

  async loadReport() {
    this.loading = true;
    this.error = false;
    try {
      const { streamId, branchName } = this.$route.params;
      const input: LoadActReportDataInput = { streamId, branchName };
      const assessmentViewData: LoadStreamOut = await this.$store.dispatch(
        "loadActReportData",
        input
      );
      this.assessment = assessmentViewData.data;
      this.colors = assessmentViewData.colors;
      this.chartDataReady = assessmentViewData.ready;
      this.loading = false;
    } catch (err) {
      console.error(err);
      this.error = true;
    }
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
