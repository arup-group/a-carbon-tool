<template>
  <v-main class="mr-7 ml-7">
    <v-container v-if="!loading && !error">
      <v-data-iterator
        :items="displayReports"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar class="mb-2" flat>
            <v-toolbar-title class="d-flex">
              {{ streamName }}
            </v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:default="props" class="my-2">
          <v-row>
            <v-col v-for="item in props.items" :key="item.id">
              {{ item.title }}
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
    <loading-spinner v-else-if="loading && !error" />
    <error-retry v-else @retry="load" />
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
import ErrorRetry from "@/components/shared/ErrorRetry.vue";
import { StreamName, StreamNameBranches } from "@/models/graphql";
import {
  GetAllReportObjectsOutputs,
  GetStreamNameReportBranchesOutput,
} from "@/store";
import { Project } from "@/models/project";
import { loadStream } from "./utils/viewAssessmentUtils";

@Component({
  components: { LoadingSpinner, ErrorRetry },
})
export default class Comparison extends Vue {
  streamid = "";
  streamName = "";
  loading = true;
  error = false;
  itemsPerPage = 10;
  page = 1;
  displayReports: Project[] = [];
  allReports: Project[] = [];
  async mounted() {
    this.streamid = this.$route.params.streamId;
    this.load();
  }
  async load() {
    this.error = false;
    this.loading = true;
    try {
      const { streamName, branches }: GetStreamNameReportBranchesOutput =
        await this.$store.dispatch(
          "getStreamNameReportBranches",
          this.streamid
        );
      this.streamName = streamName;
      const reportData = await Promise.all(
        branches.map((b) => loadStream(this.$store, this.streamid, b))
      );
      console.log("reportData:", reportData);
      // these events don't rely on each other so can happen at the same time
      // await Promise.all([this.loadReports(), this.loadStream()]);
      this.loading = false;
    } catch (err) {
      console.error(err);
      this.error = true;
    }
  }
}
</script>
