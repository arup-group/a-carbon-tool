<template>
  <v-main>
    <back-button style="z-index: 1" :overrideRoute="true" @back="back" />
    <loading-container :error="error" :loading="loading" @retry="loadReport">
      <template v-slot="{ loaded }">
        <v-container
          v-if="loaded"
          class="d-flex justify-space-between container"
          fluid
        >
          <div class="d-flex flex-column justify-space-between card-container">
            <project-info-card class="card" :projectInfo="projectInfo" />
            <renderer-cotnrols-card
              class="card"
              @selectChanged="selectChanged"
            />
          </div>
          <Renderer
            v-if="urlsLoaded && chartDataReady"
            @loaded="rendererLoaded"
            :objecturls="objectUrls"
            :token="token"
            :colors="colors"
            :gradientColorProperty="gradientColorProperty"
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
import RendererCotnrolsCard from "@/components/viewAssessment/RendererControlsCard.vue";

import { Color, GradientColor } from "@/models/renderer";
import { LoadActReportDataInput } from "@/store";
import { ILoadStreamData, LoadStreamOut } from "./utils/process-report-object";

import LoadingContainer from "@/components/shared/LoadingContainer.vue";
import BackButton from "@/components/shared/BackButton.vue";

@Component({
  components: {
    Renderer,
    ProjectInfoCard,
    ABreakdownCard,
    MaterialBreakdownCard,
    LoadingContainer,
    BackButton,
    RendererCotnrolsCard,
  },
})
export default class ViewAssessment extends Vue {
  objectUrls: string[] = [];
  token!: string;
  chartDataReady = false;
  colors: Color[] = [];
  materialColors: Color[] = [];
  gradientColorProperty: GradientColor | null = null;
  assessment!: ILoadStreamData;
  loading = true;
  error = false;
  streamId = this.$route.params.streamId;

  mounted() {
    // this.$store
    //   .dispatch("getObjectUrls", this.streamId)
    //   .then((res: string[]) => {
    //     this.objectUrls = [res[0]];
    //   });

    this.token = this.$store.state.token.token;
  }

  selectChanged(property: string) {
    if (property === "materials") {
      console.log("materials", this.materialColors)
      // const placeholder = this.colors;
      this.gradientColorProperty = null;
      this.colors = [];
      this.colors = this.materialColors;
    } else if (property === "none") {
      this.colors = [];
    } else {
      this.colors = [];
      this.gradientColorProperty = {
        property,
      };
    }
  }

  rendererLoaded() {
    this.gradientColorProperty = {
      property: "parameters.Total Carbon.value",
    };
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
      const input: LoadActReportDataInput = {
        streamId,
        branchName,
        loadChildren: true,
      };
      const assessmentViewData: LoadStreamOut = await this.$store.dispatch(
        "loadActReportData",
        input
      );
      this.objectUrls = [
        `${this.$store.state.selectedServer.url}/streams/${streamId}/objects/${assessmentViewData.data.modelId}`,
      ];
      console.log("objectUrls:", this.objectUrls);
      this.assessment = assessmentViewData.data;
      this.materialColors = assessmentViewData.colors;
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
