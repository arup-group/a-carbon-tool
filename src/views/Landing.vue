<template>
  <v-main class="mr-7 ml-7 pb-4">
    <landing-header />
    <loading-container :error="error" :loading="loading" @retry="loadStreams">
      <template v-slot="{ loaded }">
        <v-container v-if="loaded">
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
            <template v-slot:default="props" class="my-2">
              <v-row class="d-flex align-stretch">
                <v-col
                  v-for="item in props.items"
                  :key="item.title"
                  cols="12"
                  md="6"
                  lg="4"
                  style="display: flex"
                >
                  <new-assessment-card
                    v-if="item.title === 'New Assessment'"
                    @newAssessment="newAssessment"
                  />
                  <project-folder-card
                    v-else-if="projectError(item)"
                    :stream="item"
                    @openStream="openStream"
                  />
                  <landing-error
                    v-else
                    :streamFolder="item"
                    @rerun="landingErrorRerun"
                    @retry="landingErrorRetry"
                    @openErrorInfoDialog="openErrorInfoDialog"
                    @diagnostics="runDiagnostics"
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
      </template>
    </loading-container>
    <error-info-dialog :dialog="errorInfoDialog" @close="closeErrorInfoDialog" />
    <diagnostics-dialog :dialog="diagnosticsDialog" :streamid="diagnosticsStreamid" @close="closeDiagnostics" />
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import { StreamData } from "@/models/graphql";

import {
  GetBranchDataInputs,
  GetStreamBranchesOutput,
  GetStreamCommitInput,
  LoadActReportDataInput,
} from "@/store";
import { loadParent, LoadStreamOut } from "../views/utils/viewAssessmentUtils";
import {
  CarbonBranch,
  BranchData,
  StreamId,
  StreamFolder,
  instanceOfBranchData,
  instanceOfStreamFolder,
  BranchDataError,
  StreamFolderError,
} from "@/models/landing";

import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import LandingHeader from "@/components/landing/LandingHeader.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import ProjectFolderCard from "@/components/landing/ProjectFolderCard.vue";
import LandingError from "@/components/landing/LandingError.vue";
import ErrorInfoDialog from "@/components/landing/ErrorInfoDialog.vue";
import DiagnosticsDialog from "@/components/landing/DiagnosticsDialog.vue";

import LoadingContainer from "@/components/shared/LoadingContainer.vue";

type ProjectFolder = StreamFolder | StreamFolderError;

@Component({
  components: {
    NewAssessmentCard,
    LandingHeader,
    LandingFooter,
    ProjectFolderCard,
    LoadingContainer,
    LandingError,
    ErrorInfoDialog,
    DiagnosticsDialog
  },
})
export default class Landing extends Vue {
  token = "";
  itemsPerPage = 8;
  search = "";
  page = 1;
  projects: Array<ProjectFolder> = [];
  loading = true;
  error = false;
  errorInfoDialog = false;
  diagnosticsDialog = false;
  diagnosticsStreamid = "";

  async mounted() {
    this.token = this.$store.state.token.token;
    this.loadStreams();
  }

  newAssessment() {
    this.$router.push("/assessment");
  }

  projectError(item: ProjectFolder) {
    return instanceOfStreamFolder(item);
  }

  get numberOfPages() {
    const items = this.projects.length;
    if (!items) return 1;
    return Math.ceil(items / this.itemsPerPage);
  }

  get projectData() {
    return [{ title: "New Assessment" }, ...this.projects];
  }

  runDiagnostics(streamid: string) {
    this.diagnosticsStreamid = streamid;
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
    let streamData = await this.getStreamData({
      id: streamFolderError.streamId,
      name: streamFolderError.streamName,
      createdAt: streamFolderError.createdAt,
    });

    if (this.instaceOfProjectFolder(streamData)) {
      this.projects = this.projects.map((p) =>
        p.streamId === streamFolderError.streamId && streamData !== undefined
          ? streamData
          : p
      );
    }

    streamFolderError.loading = false;
  }

  async getStreamData(streamID: StreamId): Promise<ProjectFolder | undefined> {
    let carbonBranch: CarbonBranch;
    let branchData: BranchData | BranchDataError;

    const branches: GetStreamBranchesOutput = await this.$store.dispatch(
      "getStreamBranches",
      streamID.id
    );
    const mainreportidtemp = branches.reportBranches.find(
      (rb) => rb.name === `${this.$store.state.speckleFolderName}/main`
    )?.id;
    const mainreportid = mainreportidtemp ? mainreportidtemp : "";

    carbonBranch = {
      id: streamID.id,
      name: streamID.name,
      branchid: mainreportid,
      mainBranchID: branches.mainBranch.id,
    };
    if (carbonBranch.branchid === "") return;

    try {
      const streamCommitInput: GetStreamCommitInput = {
        streamid: carbonBranch.id,
        branchName: `${this.$store.state.speckleFolderName}/main`,
      };
      const branchCommit = await this.$store.dispatch(
        "getStreamCommit",
        streamCommitInput
      );

      const mainBranchCommits = await this.$store.dispatch(
        "getMainStreamCommit",
        carbonBranch.id
      );

      let carbonCommit = "";
      if (branchCommit.data.stream.branch) {
        carbonCommit =
          branchCommit.data.stream.branch.commits.items[0].referencedObject;
      }
      let latestMainCommitObj = "";
      if (mainBranchCommits.data.stream.branch) {
        latestMainCommitObj =
          mainBranchCommits.data.stream.branch.commits.items[0]
            .referencedObject;
      }

      // Get data from the most recent arupcarbon branch
      const getBranchDataInputs1: GetBranchDataInputs = {
        streamid: carbonBranch.id,
        objId: carbonCommit,
      };
      const latestCarbonBranchData: StreamData = await this.$store.dispatch(
        "getBranchData",
        getBranchDataInputs1
      );

      const getBranchDataInputs2: GetBranchDataInputs = {
        streamid: carbonBranch.id,
        objId: latestMainCommitObj,
      };
      const latestMainBranchData: StreamData = await this.$store.dispatch(
        "getBranchData",
        getBranchDataInputs2
      );

      const latestCarbonBranchCommit = new Date(
        latestCarbonBranchData.data.stream.object.createdAt
      ).getTime();
      const latestMainBranchCommit = new Date(
        latestMainBranchData.data.stream.object.createdAt
      ).getTime();

      const parent = await loadParent(
        this.$store.state.selectedServer.url,
        carbonBranch.id,
        carbonCommit,
        this.$store.state.token.token
      );
      const loadActReportDataInput: LoadActReportDataInput = {
        streamId: carbonBranch.id,
        branchName: "main",
      };
      const data: LoadStreamOut = await this.$store.dispatch(
        "loadActReportData",
        loadActReportDataInput
      );

      branchData = {
        id: carbonBranch.id,
        name: carbonBranch.name,
        data,
        projectDate: latestCarbonBranchData.data.stream.object.createdAt,
        newMainAvailable: latestMainBranchCommit > latestCarbonBranchCommit,
      };
    } catch (err) {
      branchData = {
        id: carbonBranch.id,
        name: carbonBranch.name,
      };
    }

    if (instanceOfBranchData(branchData)) {
      const projName = branchData.data.data.projectInfo.name;
      return {
        streamName: branchData.name,
        streamId: branchData.id,
        mainProject: {
          title: `${projName} - ${branchData.name}`,
          id: `${branchData.id}`,
          co2Values: branchData.data.data.materialBreakdown.materials,
          totalCO2e: branchData.data.data.projectInfo.totalCO2e,
          link: "",
          category: branchData.data.data.projectInfo.components,
          projectDate: branchData.projectDate,
          newMainAvailable: branchData.newMainAvailable,
        },
      };
    } else
      return {
        streamId: branchData.id,
        streamName: branchData.name,
        createdAt: streamID.createdAt,
        loading: false
      };
  }

  instaceOfProjectFolder(
    item: ProjectFolder | undefined
  ): item is ProjectFolder {
    return !!item;
  }

  async loadStreams() {
    this.loading = true;
    this.error = false;
    this.projects = [];

    try {
      // get all of the user's streams
      const streams = await this.$store.dispatch("getUserStreams");
      // format the streams into a more usable format
      const streamIDs: StreamId[] = streams.data.user.streams.items.map(
        (stream: any) => {
          return { name: stream.name, id: stream.id };
        }
      );

      this.projects = await Promise.all(
        streamIDs.map((sid) => this.getStreamData(sid))
      ).then((sd) => sd.filter(this.instaceOfProjectFolder));

      this.loading = false;
    } catch (err) {
      console.error(err);
      this.error = true;
      this.loading = false;
    }
  }
}
</script>
