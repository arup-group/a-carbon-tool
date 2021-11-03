<template>
  <div class="md-layout" style="padding:16px; overflow: hidden;">
    <div class="md-layout-item md-size-100 text-center" v-if="showLoading">
      <div class="md-caption">{{ loadingMessage }}</div>
      <br />
      <md-progress-bar md-mode="indeterminate"></md-progress-bar>
      <br />&nbsp;
    </div>
    <div class="md-layout-item md-size-100">
      <report-step
        :selected-objects="selectedObjectsIds"
        :retrieved-report="reportStream"
        v-if="readyForReport"
      ></report-step>
      <div v-else>
        <div v-if="!notAutorised && currentReportId === null">
          No report to show. Got a wrong link maybe?
        </div>
        <div v-if="notAutorised">
          <h1 class="md-display-2">
            Oups.
            <i>Status 401</i>.
          </h1>
          <p>
            In human terms, this means you are not authorised to view this
            report.
            <span v-if="$store.state.isAuth" class="md-caption"
              >You will need to request access from the owner.</span
            >
          </p>
          <div v-if="!$store.state.isAuth">
            <md-button
              :to="`/login/${getRedirect()}`"
              class="btn-no-margin md-raised md-primary"
              >Login</md-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReportStep from "@/components/ReportStep.vue";
import decodeJwt from "@/utils/decodeJwt";

export default {
  name: "ReportViewer",
  components: {
    ReportStep,
  },
  watch: {},
  props: {},
  data() {
    return {
      showLoading: false,
      notAutorised: false,
      readyForReport: false,
      loadingMessage: "",
      progress: 0,
    };
  },
  computed: {
    currentReportId() {
      return this.$route.params.reportId;
    },
    reportStream() {
      return this.$store.state.streams.find(
        s => s.streamId === this.currentReportId,
      );
    },
    selectedObjectsIds() {
      // return this.$store.state.streams.find(
      //   s => s.streamId === this.currentReportId,
      // ).objects;
      return this.$store.state.selectedObjects;
    },
  },
  methods: {
    async fetchReport() {
      this.showLoading = true;

      try {
        // get the report stream
        this.loadingMessage = "Fetching report.";

        const encodedServerObject = this.$route.query.s;
        let server;
        if (encodedServerObject && !this.$store.state.server) {
          // Application entered using shareable link and circumventing login flow
          // Use queryParam `s` to decode and set API baseURL downstream

          const decoded = decodeJwt(encodedServerObject);
          server = decoded.server;
        }

        const myRep = await this.$store.dispatch("getStream", {
          server,
          streamId: this.currentReportId,
        });

        // get the object ids belonging to stream
        const objIds = await this.$store.dispatch(
          "getStreamObjectsIds",
          this.currentReportId,
        );

        // TODO: this seems broken
        this.$store.commit(
          "SET_CONSTRUCTION_COST",
          myRep.globalMeasures.carbonReport.constructionCost,
        );

        // Toggle ready for Report Stepper component
        this.readyForReport = true;

        //Break up object id list into request buckets
        let buckets = this.chunk(objIds, 50);
        let requestBuckets = buckets.map(b => {
          return { objectIds: b, streamId: this.currentReportId };
        });

        this.loadingMessage = "Fetching 3D model.";
        this.$emit("set-buckets", requestBuckets);
      } catch (e) {
        console.error(e);
        this.showLoading = false;
        this.currentReportId = null;
        this.notAutorised = true;
      }
    },
    getRedirect() {
      return window.btoa(this.$route.path);
    },
  },
  mounted() {
    //After request buckets are processed for all objects, this will get called
    window.bus.$on("loading-done", () => {
      this.loadingMessage = "Setting object properties.";
      window.renderer.resetColors();
      window.renderer.colorByProperty({ propertyName: "material_name" });
      this.showLoading = false;
      this.readyForReport = true;
    });
  },
  activated() {
    this.fetchReport();
  },
};
</script>
<style scoped lang="scss" />
