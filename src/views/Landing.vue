<template>
  <v-main class="mr-7 ml-7 pb-4">
    <landing-header />
    <v-container>
      <v-data-iterator
        :items="projectData"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar flat rounded outlined class="my-4">
            <v-text-field
              v-model="search"
              clearable
              flat
              solo
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:default="props">
          <v-row class="d-flex align-stretch">
            <v-col
              v-for="item in props.items"
              class="d-flex"
              :key="item.title"
              cols="12"
              md="6"
              lg="4"
            >
              <landing-card
                :item="item"
                :noProjects="noProjects"
                @diagnostics="runDiagnostics"
                @rerun="landingErrorRerun"
                @retry="landingErrorRetry"
                @openErrorInfoDialog="openErrorInfoDialog"
                @newAssessment="newAssessment"
                @fullRetry="loadStreams"
                @openStream="openStream"
              />
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <landing-footer
            :numberOfPages="numberOfPages"
            :page="page"
            @formerPage="formerPage"
            @nextPage="nextPage"
          />
        </template>
      </v-data-iterator>
    </v-container>
    <error-info-dialog
      :dialog="errorInfoDialog"
      @close="closeErrorInfoDialog"
    />
    <diagnostics-dialog
      :dialog="diagnosticsDialog"
      :streamid="diagnosticsStreamid"
      @close="closeDiagnostics"
      :key="diagnosticKey"
    />
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { loadStream } from "../views/utils/viewAssessmentUtils";
import {
  StreamFolderError,
  LandingUserStreams,
  StreamFolderLoading,
  instanceOfLandingUserStreamFull,
  LandingUserStreamFull,
  ProjectFolder,
  ProjectFolderController,
  instanceOfStreamFolderError,
  ProjectCardTypes,
  ProjectData,
} from "@/models/landing";

import LandingHeader from "@/components/landing/LandingHeader.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import ErrorInfoDialog from "@/components/landing/ErrorInfoDialog.vue";
import DiagnosticsDialog from "@/components/landing/DiagnosticsDialog.vue";

import LoadingContainer from "@/components/shared/LoadingContainer.vue";
import LandingCard from "@/components/landing/LandingCard.vue";

@Component({
  components: {
    LandingHeader,
    LandingFooter,
    LoadingContainer,
    ErrorInfoDialog,
    DiagnosticsDialog,
    LandingCard,
  },
})
export default class Landing extends Vue {
  itemsPerPage = 8;
  search = "";
  page = 1;
  projectFolderController = new ProjectFolderController([]);
  error = false;
  errorInfoDialog = false;
  diagnosticsDialog = false;
  diagnosticsStreamid = "";
  diagnosticKey = 0;
  loading = true;

  get projects() {
    return this.projectFolderController.projectFolders;
  }
  get noProjects() {
    return this.loading === false && this.projects.length === 0;
  }

  async mounted() {
    this.loadStreams();
  }

  async loadStreams() {
    this.error = false;
    this.loading = true;
    this.projectFolderController.projectFolders = [];
    try {
      const allStreams: LandingUserStreams = await this.$store.dispatch(
        "carbonStreams"
      );
      const filteredStreams = allStreams.data.streams.items
        .filter(instanceOfLandingUserStreamFull)
        .filter((s) => s.actBranch && s.actBranch.commits.items.length > 0);

      this.loading = false;

      this.projectFolderController.projectFolders = filteredStreams.map(
        (fs): StreamFolderLoading => {
          return { streamName: fs.name, streamId: fs.id };
        }
      );
      // ready to display cards at this point, just no graph
      await Promise.all(filteredStreams.map(this.loadProjectFolder));
    } catch (err) {
      console.error(err);
      this.error = true;
    }
  }

  async loadProjectFolder(s: LandingUserStreamFull) {
    let reportObj: ProjectFolder;
    try {
      // update available
      const newMainAvailable = this.loadNewMainDate(s);

      // report info
      const reportData = await this.loadReportData(s);

      reportObj = {
        streamName: s.name,
        streamId: s.id,
        mainProject: {
          title: `${reportData.projectInfo.name} - ${s.name}`,
          id: s.id,
          co2Values: reportData.materialBreakdown.materials,
          totalCO2e: reportData.projectInfo.totalCO2e,
          link: "",
          category: reportData.projectInfo.components,
          projectDate: s.actBranch.commits.items[0].createdAt,
          newMainAvailable,
        },
      };
    } catch (err) {
      console.error(err);
      reportObj = {
        streamId: s.id,
        streamName: s.name,
        createdAt: s.actBranch.commits.items[0].createdAt,
        loading: false,
        streamData: s,
      };
    }

    this.projectFolderController.updateSingle(reportObj);
  }

  loadNewMainDate(s: LandingUserStreamFull) {
    const mainDate = new Date(s.mainBranch.commits.items[0].createdAt);
    const reportDate = new Date(s.actBranch.commits.items[0].createdAt);
    return mainDate > reportDate;
  }

  async loadReportData(s: LandingUserStreamFull) {
    const data = await loadStream(
      this.$store,
      s.id,
      `${this.$store.state.speckleFolderName}/main`
    );
    return data.data;
  }

  newAssessment() {
    this.$router.push("/assessment");
  }

  projectError(item: ProjectFolder) {
    return instanceOfStreamFolderError(item);
  }

  get numberOfPages() {
    const items = this.projects.length;
    if (!items) return 1;
    return Math.ceil(items / this.itemsPerPage);
  }

  get projectData(): ProjectData[] {
    if (this.error)
      return [
        { title: ProjectCardTypes.NEW_ASSESSMENT },
        { title: ProjectCardTypes.ERROR },
      ];
    else if (this.projects.length === 0 && this.loading === true)
      return [
        { title: ProjectCardTypes.NEW_ASSESSMENT },
        { title: ProjectCardTypes.LOADING },
      ];
    else return [{ title: ProjectCardTypes.NEW_ASSESSMENT }, ...this.projects];
  }

  runDiagnostics(streamid: string) {
    this.diagnosticsStreamid = streamid;
    this.diagnosticKey++;
    this.diagnosticsDialog = true;
  }

  closeDiagnostics() {
    this.diagnosticsDialog = false;
  }

  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1;
  }

  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1;
  }

  openStream(streamid: string) {
    this.$router.push(`/${streamid}`);
  }

  closeErrorInfoDialog() {
    this.errorInfoDialog = false;
  }
  openErrorInfoDialog() {
    this.errorInfoDialog = true;
    return;
  }

  landingErrorRerun(streamid: string) {
    this.$router.push(`/assessment/${streamid}`);
  }
  async landingErrorRetry(streamFolderError: StreamFolderError) {
    this.loadProjectFolder(streamFolderError.streamData);
  }
}
</script>
