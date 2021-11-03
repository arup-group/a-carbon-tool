<template>
  <div>
    <md-steppers
      md-vertical
      style="-webkit-user-select: none; --moz-user-select: none; margin-bottom:100px"
      @md-changed="stepChanged"
      md-dynamic-height
    >
      <md-step
        id="data-input"
        md-label="Data"
        md-description="Add or remove streams that you want to perform CO2 cost estimations on"
      >
        <stream-search
          @selected-stream="addStream"
          :streams-to-omit="streamIds"
        ></stream-search>
        <br />
        <stream-card-renderer
          v-for="stream in streams"
          :stream="stream"
          :key="stream.streamId"
          @remove-stream="removeStream"
        ></stream-card-renderer>
        <md-divider></md-divider>
        <br />
        <md-card
          class="md-elevation-0 xxxmd-accent"
          xxxmd-with-hover
          style="border-radius: 20px;"
        >
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Project Total Construction Cost</div>
              <div class="md-caption">
                In pounds sterling. This is used for calculating the A5 plant
                costs (on-site processing).
              </div>
            </md-card-header-text>
          </md-card-header>
          <md-card-content>
            <md-field>
              <label>The total construction cost.</label>
              <span class="md-prefix">£</span>
              <md-input v-model="constructionCost" type="number"></md-input>
            </md-field>
          </md-card-content>
        </md-card>
        <md-card
          class="md-elevation-0 xxxmd-accent"
          xxxmd-with-hover
          style="border-radius: 20px;"
        >
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Project Total Square Meters</div>
            </md-card-header-text>
          </md-card-header>
          <md-card-content>
            <md-field>
              <label>The total square meters</label>
              <span class="md-prefix">&#13217;</span>
              <md-input v-model="squareMeters" type="number"></md-input>
            </md-field>
          </md-card-content>
        </md-card>
      </md-step>
      <md-step
        id="material-input"
        md-label="Materials"
        md-description="Assign materials to the various building objects (A1-A3)"
      >
        <material-step
          :selected-objects="selectedObjects"
          :analysis-legend="analysisLegend"
          v-if="streamIds.length > 0"
        ></material-step>
        <p v-else>No data.</p>
      </md-step>
      <md-step
        id="transport-input"
        md-label="Transport"
        md-description="Assign and review transport costs (A4)"
      >
        <transport-step
          :selected-objects="selectedObjects"
          :analysis-legend="analysisLegend"
          v-if="streamIds.length > 0"
        ></transport-step>
      </md-step>
      <md-step
        id="quant-input"
        md-label="Quantities"
        md-description="Check and/or calculate quantities"
      >
        <quant-step
          :selected-objects="selectedObjects"
          :legend="analysisLegend"
          v-if="streamIds.length > 0"
        ></quant-step>
        <p v-else>No data.</p>
      </md-step>
      <md-step
        id="review"
        md-label="Review"
        md-description="Check with objects will be included in the calculation"
      >
        <review-step
          :streamIds="streamIds"
          v-if="streamIds.length > 0"
        ></review-step>
        <p v-else>No data.</p>
      </md-step>
      <md-step
        id="report"
        md-label="Report Preview"
        md-description="Final model statistics."
      >
        <report-step
          :selected-objects="selectedObjects"
          v-if="streamIds.length"
          :square-meters="+squareMeters"
        ></report-step>
        <p v-else>No data.</p>
      </md-step>
      <md-step
        id="save"
        md-label="Save Report"
        md-description="Save this report so you can retrieve it later."
      >
        <save-report
          v-if="streamIds.length"
          v-bind:squareMeters="+squareMeters"
        ></save-report>
        <p v-else>No data.</p>
      </md-step>
    </md-steppers>
  </div>
</template>
<script>
import StreamSearch from "@/components/StreamSearch.vue";
import StreamCardRenderer from "@/components/StreamCardRenderer.vue";
import MaterialStep from "@/components/MaterialStep.vue";
import TransportStep from "@/components/TransportStep.vue";
import QuantStep from "@/components/ObjectQuantities.vue";
import ReviewStep from "@/components/ReviewStep.vue";
import ReportStep from "@/components/ReportStep.vue";
import SaveReport from "@/components/SaveReport.vue";

export default {
  name: "CarbonCalculator",
  components: {
    StreamSearch,
    StreamCardRenderer,
    QuantStep,
    ReviewStep,
    ReportStep,
    MaterialStep,
    TransportStep,
    SaveReport,
  },
  props: {},
  watch: {
    constructionCost(newVal) {
      this.$store.commit("SET_CONSTRUCTION_COST", parseInt(newVal));
    },
  },
  computed: {
    selectedObjects() {
      return this.$store.state.selectedObjects;
    },
    streams() {
      return this.streamIds.map(id =>
        this.$store.state.streams.find(s => s.streamId === id),
      );
    },
    streamIds() {
      return this.$store.state.loadedStreamIds;
    },
  },
  data() {
    return {
      toRequest: [],
      requestBuckets: [],
      isRequesting: false,
      pauseRequesting: false,
      bucketInProgress: false,
      removeInterval: null,
      streamsToRemove: [],
      analysisLegend: null,
      showLoading: false,
      constructionCost: 1,
      squareMeters: null,
    };
  },
  methods: {
    addStream(streamId) {
      this.$emit("add-stream", streamId);
    },
    removeStream(streamId) {
      this.$emit("remove-stream", streamId);
    },
    stepChanged(step) {
      // used to keep track accross components (hacky no-routing scenario)
      this.$store.commit("SET_APP_STEP", step);
      if (step === "quant-input") {
        window.renderer.resetColors();
        window.renderer.showObjects([]);
        window.renderer.colorByProperty({ propertyName: "volume" });
      }
      if (step === "transport-input") {
        window.renderer.resetColors();
        window.renderer.showObjects([]);
        window.renderer.colorByProperty({ propertyName: "material_name" });
      }
      if (step === "material-input") {
        window.renderer.resetColors();
        window.renderer.showObjects([]);
        window.renderer.colorByProperty({ propertyName: "material_name" });
      }
    },
  },
  mounted() {
    this.objectAccumulator = [];
    if (window.renderer)
      window.renderer.unloadObjects({
        objIds: this.$store.state.objects.map(o => o._id),
      });
    this.$store.commit(
      "REMOVE_OBJECTS",
      this.$store.state.objects.map(o => o._id),
    );
  },
};
</script>
<style scoped lang="scss" />
