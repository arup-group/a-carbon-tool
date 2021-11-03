<template>
  <div v-if="report" class="md-layout">
    <div class="md-layout-item text-center md-size-100">
      <h2 class="md-display-1" style="font-weight: 200">{{ report.name }}</h2>
      <span class="md-caption">
        Report date:
        {{ new Date(report.createdAt).toLocaleDateString() }}
      </span>
      |
      <span class="md-caption">Author: {{ reportOwner }}</span> |
      <span class="md-caption"
        >Job Number: {{ report.jobNumber || "None" }}</span
      >
      <div
        v-if="report.tags"
        class="md-caption"
        style="margin-top:5px;margin-bottom: 5px"
      >
        tags:
        <span
          v-for="tag in report.tags"
          v-bind:key="tag.id"
          style="background: #D4D4D4; border-radius:3px; margin-right:4px; padding:2px"
          >{{ tag }}</span
        >
      </div>
      <span class="md-caption">
        Assumed construction cost: £{{
          numberWithCommas(report.globalMeasures.carbonReport.constructionCost)
        }}
      </span>
      <br />
      <span class="md-caption">Notes:</span>
    </div>
    <div class="md-layout-item md-size-25"></div>
    <div class="md-layout-item md-size-50 md-small-size-90 md-medium-size-80">
      <div v-html="compiledDescription"></div>
      <br />
      <md-divider></md-divider>
      <br />
    </div>
    <div class="md-layout-item md-size-100 text-center">
      <md-chip class="md-elevation-5">
        <a
          :href="
            $store.state.server +
              '/streams/' +
              report.streamId +
              '?fields=globalMeasures.carbonReport'
          "
          target="_blank"
        >
          <span
            style="padding:2px; background-color:black; color: white; border-radius: 5px; margin:4px;"
            >API</span
          >Report summary </a
        >&nbsp;&nbsp;
        <a
          :href="
            $store.state.server +
              '/streams/' +
              report.streamId +
              '/objects?fields=properties,hash&limit=500'
          "
          target="_blank"
        >
          <span
            style="padding:2px; background-color:black; color: white; border-radius: 5px; margin:4px;"
            >API</span
          >Report Objects </a
        >&nbsp;&nbsp;
        <a
          :href="
            $store.state.server &&
              $store.state.server.replace('/api', '#') +
                '/streams/' +
                report.streamId +
                '/'
          "
          target="_blank"
          v-if="canWrite"
        >
          <span
            style="padding:2px; background-color:black; color: white; border-radius: 5px; margin:4px;"
            >SPK</span
          >Admin
        </a>
      </md-chip>
    </div>
  </div>
</template>
<script>
import marked from "marked";

export default {
  name: "ReportDetails",
  props: {
    report: { type: Object, default: () => null },
  },
  computed: {
    canWrite() {
      return this.isOwner
        ? true
        : this.report.canWrite.indexOf(this.$store.state.user._id) !== -1;
    },
    reportOwner() {
      if (this.isOwner)
        return `${this.$store.state.user.name}
                  ${this.$store.state.user.surname}`;
      let owner = this.$store.state.users.find(
        user => user._id === this.report.owner,
      );
      if (!owner) return "(loading)";
      return `${owner.name} ${owner.surname} ${
        owner.company ? "(" + owner.company + ")" : ""
      }`;
    },
    isOwner() {
      return this.report.owner === this.$store.state.user._id;
    },
    compiledDescription() {
      return marked(this.report.description, { sanitize: true });
    },
  },
  data() {
    return {};
  },
  methods: {
    fetchData() {
      this.$store.dispatch("getUser", { _id: this.report.owner });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped lang="scss">
.code {
  position: relative;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: all;
  font-family: monospace;
  background-color: ghostwhite;
  cursor: pointer;
}
</style>
