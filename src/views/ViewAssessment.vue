<template>
  <v-main>
    <loading-container :error="error" :loading="loading" @retry="loadReport">
      <template v-slot="{ loaded }">
        <v-container
          v-if="loaded"
          class="d-flex justify-space-between container"
          fluid
        >
          <div
            class="d-flex flex-column justify-space-between align-items-start card-container"
          >
            <project-info-card
              class="card"
              :projectInfo="projectInfo"
              @share="openShareReportDialog"
            />
            <back-button
              style="z-index: 1; width: fit-content"
              :overrideRoute="true"
              @back="back"
            />
            <renderer-controls-card
              v-if="!isV1"
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
    <share-report-dialog
      :dialog="shareReportDialog"
      :shareLink="shareLink"
      :streamid="streamid"
      :reportName="shareReportName"
      @close="closeShareReportDialog"
    />
    <change-server-dialog
      :dialog="changeServerDialog"
      :currentServer="currentServer"
      :reportServer="reportServer"
      @close="closeChangeServerDialog"
      @attemptLogin="attemptLogin"
    />
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Renderer from "@/components/shared/Renderer.vue";
import ProjectInfoCard from "@/components/viewAssessment/ProjectInfoCard.vue";
import ABreakdownCard from "@/components/viewAssessment/ABreakdownCard.vue";
import MaterialBreakdownCard from "@/components/viewAssessment/MaterialBreakdownCard.vue";
import RendererControlsCard from "@/components/viewAssessment/RendererControlsCard.vue";
import ChangeServerDialog from "@/components/viewAssessment/ChangeServerDialog.vue";

import { Color, GradientColor } from "@/models/renderer";
import { LoadActReportDataInput } from "@/store";
import { ILoadStreamData, LoadStreamOut } from "./utils/process-report-object";

import LoadingContainer from "@/components/shared/LoadingContainer.vue";
import BackButton from "@/components/shared/BackButton.vue";
import ShareReportDialog from "@/components/shared/ShareReportDialog.vue";
import { Server } from "@/models/auth";

@Component({
  components: {
    Renderer,
    ProjectInfoCard,
    ABreakdownCard,
    MaterialBreakdownCard,
    LoadingContainer,
    BackButton,
    RendererControlsCard,
    ShareReportDialog,
    ChangeServerDialog,
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
  isV1 = false;

  shareReportDialog = false;
  shareLink = "";
  shareReportName = "";
  streamid = "";

  changeServerDialog = false;
  currentServer = "";
  reportServer = "";

  openShareReportDialog() {
    const { streamId, branchName } = this.$route.params;
    this.streamid = streamId;
    this.shareLink = `${window.origin}/assessment/view/${streamId}/${branchName}`;
    this.shareReportName = this.projectInfo.name;
    this.shareReportDialog = true;
  }

  closeShareReportDialog() {
    this.shareReportDialog = false;
  }
  closeChangeServerDialog() {
    this.changeServerDialog = false;
  }

  mounted() {
    this.token = this.$store.state.token.token;
    const { server } = this.$route.query;
    if (server) {
      const selectedServer: Server = this.$store.state.selectedServer;
      if (selectedServer.url != server) {
        this.currentServer = selectedServer.url;
        this.reportServer = server as string; // server should always be a string, if not then the user has probably done something weird
        this.changeServerDialog = true;
        return;
      }
    }

    this.loadReport();
  }

  attemptLogin(reportServer: string) {
    let fullReportServer = {} as Server;
    let serverSet = false;
    Object.values(
      this.$store.state.servers as { [server: string]: Server }
    ).forEach((s) => {
      if (s.url === reportServer) {
        fullReportServer = s;
        serverSet = true;
      }
    });
    if (!serverSet) {
      fullReportServer = this.$store.state.servers.custom;
      fullReportServer.url = reportServer;
    }

    localStorage.setItem("redirect-path", this.$route.fullPath);

    this.$store.dispatch("redirectToAuth", fullReportServer);
  }

  selectChanged(property: string) {
    if (property === "materials") {
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
    // this.gradientColorProperty = {
    //   property: "parameters.Total Carbon.value",
    // };
    this.colors = this.materialColors;
  }

  back() {
    this.$router.push(`/${this.streamId}`);
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
      if (assessmentViewData.version === "v1") {
        this.isV1 = true;
        this.$store
          .dispatch("getObjectUrls", this.streamId)
          .then((res: string[]) => {
            this.objectUrls = [res[0]];
            this.colors = assessmentViewData.colors;
          });
      } else {
        this.objectUrls = [
          `${this.$store.state.selectedServer.url}/streams/${streamId}/objects/${assessmentViewData.data.modelId}`,
        ];
        this.materialColors = assessmentViewData.colors.map((c) => ({
          ...c,
          id: assessmentViewData.data.idMapper[c.id],
        }));
      }
      this.assessment = assessmentViewData.data;
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
