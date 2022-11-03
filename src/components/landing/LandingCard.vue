<template>
  <div style="width: 100%; height: 100%">
    <new-assessment-card
      v-if="isNewAssessment"
      :noProjects="noProjects"
      @newAssessment="newAssessment"
    />
    <error-retry v-else-if="isError" @retry="loadStreams" />
    <loading-spinner v-else-if="isLoading" />
    <landing-error
      v-else-if="projectError"
      :streamFolder="item"
      @rerun="landingErrorRerun"
      @retry="landingErrorRetry"
      @openErrorInfoDialog="openErrorInfoDialog"
      @diagnostics="runDiagnostics"
    />
    <project-folder-card v-else :stream="item" @openStream="openStream" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import {
  instanceOfProjectDataShort,
  instanceOfStreamFolderError,
  ProjectCardTypes,
  ProjectData,
  StreamFolderError,
} from "@/models/landing";

import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import ProjectFolderCard from "@/components/landing/ProjectFolderCard.vue";
import LandingError from "@/components/landing/LandingError.vue";
import ErrorRetry from "@/components/shared/ErrorRetry.vue";
import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";

@Component({
  components: {
    NewAssessmentCard,
    ProjectFolderCard,
    LandingError,
    LoadingSpinner,
    ErrorRetry,
  },
})
export default class LandingCard extends Vue {
  @Prop() item!: ProjectData;
  @Prop() noProjects!: boolean;

  @Emit("newAssessment")
  newAssessment() {
    return;
  }
  @Emit("rerun")
  loadStreams(streamid: string) {
    return streamid;
  }
  @Emit("fullRetry")
  fullRetry() {
    return;
  }
  @Emit("retry")
  landingErrorRetry(streamFolderError: StreamFolderError) {
    return streamFolderError;
  }
  @Emit("openErrorInfoDialog")
  openErrorInfoDialog() {
    return;
  }
  @Emit("diagnostics")
  runDiagnostics(streamid: string) {
    return streamid;
  }
  @Emit("openStream")
  openStream(streamid: string) {
    return streamid;
  }

  get isNewAssessment() {
    if (instanceOfProjectDataShort(this.item))
      return this.item.title === ProjectCardTypes.NEW_ASSESSMENT;
    return false;
  }
  get isError() {
    if (instanceOfProjectDataShort(this.item))
      return this.item.title === ProjectCardTypes.ERROR;
    return false;
  }
  get isLoading() {
    if (instanceOfProjectDataShort(this.item))
      return this.item.title === ProjectCardTypes.LOADING;
    return false;
  }
  get projectError() {
    return instanceOfStreamFolderError(this.item);
  }
}
</script>
