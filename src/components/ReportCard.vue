<template>
  <div
    class="stream-card md-layout-item md-size-33 md-medium-size-50 md-small-size-100"
  >
    <md-card class="md-elevation-1" md-with-hover>
      <md-card-header @click="selected = !selected">
        <md-card-header-text>
          <div class="md-title">{{ stream.name }}</div>
          <div class="md-subhead">
            Total kgCO2e:
            <b>{{ report.totalCarbon.toLocaleString() }}</b>
          </div>
          <br />
          <div class="md-caption" v-if="stream.tags">
            tags:
            <span
              v-for="tag in stream.tags"
              v-bind:key="tag.id"
              style="background: #D4D4D4; border-radius:3px; margin-right:4px; padding:2px"
              >{{ tag }}</span
            >
          </div>
        </md-card-header-text>
      </md-card-header>
      <md-card-content style="padding:40px;height:600px">
        <ring-chart
          :chart-data="chartData.chartData"
          :colors="chartData.colors"
          height="555px"
          proportional
        ></ring-chart>
        <br />
      </md-card-content>
      <md-card-actions>
        <md-button
          target="_blank"
          :href="
            $store.state.server +
              '/streams/' +
              stream.streamId +
              '?fields=globalMeasures.carbonReport'
          "
          >API</md-button
        >
        <md-button
          v-show="canEdit"
          target="_blank"
          :href="
            $store.state.server.href &&
              `${$store.state.server.href.replace('/api', '#')}/streams/${
                stream.streamId
              }/`
          "
          >admin</md-button
        >
        <md-button
          class="md-raised md-primary"
          :to="`/carbon/report/${stream.streamId}`"
          >view</md-button
        >
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import marked from "marked";
import RingChart from "@/charts/RingChart.vue";
export default {
  name: "ReportCard",
  components: { RingChart },
  props: {
    stream: Object,
  },
  watch: {
    selected() {
      this.$emit("selected", this.stream);
    },
  },
  computed: {
    owner() {
      return this.$store.state.users.find(u => u._id === this.stream.owner);
    },
    createdAt() {
      let date = new Date(this.stream.createdAt);
      return date.toLocaleString("en", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    compiledDescription() {
      return marked(this.stream.description.substring(0, 220) + " ...", {
        sanitize: true,
      });
    },
    canEdit() {
      return this.isOwner
        ? true
        : this.stream.canWrite.indexOf(this.$store.state.user._id) !== -1;
    },
    isOwner() {
      return this.stream.owner === this.$store.state.user._id;
    },
    units() {
      return this.stream.baseProperties && this.stream.baseProperties.units
        ? this.stream.baseProperties.units
        : "no unit specified";
    },
    report() {
      return this.stream.globalMeasures.carbonReport;
    },
    materialTable() {
      return this.stream.globalMeasures.carbonReport.materialTable;
    },
    chartData() {
      const data = [];
      const colors = [];
      const columns = ["material", "kgCO2"];

      for (let key in this.materialTable) {
        let mat = this.materialTable[key];
        const matConcat = `${mat.material || mat.Material} - ${mat.subtype ||
          mat.Subtype}`;
        colors.push(this.getHexFromString(matConcat));
        data.push({
          material: matConcat,
          kgCO2: Number.parseFloat(mat.totalCost.toFixed(2)),
        });
        // TODO: wtf
        // eslint-disable-next-line
        this.totalCost += mat.totalCost;
      }

      return {
        chartData: { columns: columns, rows: data },
        colors: colors,
      };
    },
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    removeStream() {
      this.$emit("remove-stream", this.stream.streamId);
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.stream-card {
  margin-bottom: 20px;
}
</style>
