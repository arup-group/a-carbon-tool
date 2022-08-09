<template>
  <v-container>
    <v-sheet outlined color="error" rounded height="100%">
      <v-card v-if="!loading" flat height="100%" class="d-flex flex-column">
        <v-card-title> Error loading {{ streamName }} </v-card-title>
        <v-card-text style="height: 100%">
          <div
            style="height: 100%"
            class="d-flex flex-column justify-center align-center"
          >
            <v-btn x-large icon @click="openInfo">
              <v-icon x-large color="red darken-1">mdi-alert</v-icon>
            </v-btn>
            <div class="justify-space-around pt-5">
              <v-btn class="mr-3" @click="retry" outlined color="primary">
                Retry
              </v-btn>
              <v-btn @click="rerun" outlined color="primary">
                Rerun report
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
      <div v-else style="height: 100%">
        <v-card flat height="100%" class="d-flex flex-column justify-center">
          <loading-spinner />
        </v-card>
      </div>
    </v-sheet>
  </v-container>
</template>
<script lang="ts">
import { StreamFolderError } from "@/models/landing";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";

@Component({
  components: {
    LoadingSpinner,
  },
})
export default class LandingError extends Vue {
  @Prop() streamFolder!: StreamFolderError;

  get loading() {
    return this.streamFolder.loading;
  }

  get streamid() {
    return this.streamFolder.streamId;
  }

  get streamName() {
    return this.streamFolder.streamName;
  }

  @Emit("openErrorInfoDialog")
  openInfo() {
    return;
  }

  @Emit("retry")
  retry() {
    this.streamFolder.loading = true;
    return this.streamFolder;
  }

  @Emit("rerun")
  rerun() {
    return this.streamid;
  }
}
</script>
