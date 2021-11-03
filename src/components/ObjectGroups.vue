<template>
  <div>
    <md-progress-bar
      md-mode="indeterminate"
      v-show="recomputingGroups"
    ></md-progress-bar>
    <div v-if="!isForReport">
      <div v-if="asyncGroups.length !== 0">
        <object-group
          v-for="group in asyncGroups"
          :group="group"
          :key="group.name"
          @refresh="refreshGroups"
          :is-for-transport="isForTransport"
        ></object-group>
      </div>
      <div v-if="selection.length !== 0">
        <object-group
          :group="selectionGroup"
          @refresh="refreshGroups"
          :is-for-transport="isForTransport"
        ></object-group>
      </div>
    </div>
    <div v-else>
      <div v-if="asyncGroups.length !== 0">
        <object-group-mat-summary
          v-for="group in asyncGroups"
          :group="group"
          :key="group.name"
          @refresh="refreshGroups"
        ></object-group-mat-summary>
      </div>
    </div>
  </div>
</template>
<script>
import GroupGenWorker from "worker-loader!@/workers/worker.gengroups.js";

import ObjectGroup from "@/components/ObjectGroup.vue";
import ObjectGroupMatSummary from "@/components/ObjectGroupMatSummary.vue";
export default {
  name: "ObjectGroups",
  components: { ObjectGroup, ObjectGroupMatSummary },
  props: {
    groupKey: { type: String },
    selection: {
      type: Array,
      default: () => [],
    },
    isForReport: { type: Boolean, default: false },
    isForTransport: { type: Boolean, default: false },
    keys: { type: Array, default: () => [] },
  },
  watch: {
    groupKey(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.generateGroups(newVal);
      }
    },
  },
  computed: {
    materials() {
      return this.$store.getters.materialMap(
        this.$store.state.selectedDbSource,
      );
    },
    selectionGroup() {
      if (this.selection.length === 0) return;
      return {
        name: "Selected Objects",
        objects: this.selection,
        selectedMaterialName: null,
        isolated: false,
        visible: true,
      };
    },
  },
  data() {
    return {
      asyncGroups: [],
      recomputingGroups: false,
      defaultSet: false,
    };
  },
  methods: {
    refreshGroups() {
      if (this.groupKey === "material_name") {
        this.generateGroups(this.groupKey);
      }
    },
    async generateGroups(propToLookFor) {
      this.recomputingGroups = true;
      this.worker.postMessage({
        objects: this.$store.state.objects,
        propToLookFor: propToLookFor,
      });
    },
  },
  mounted() {
    this.worker = new GroupGenWorker();
    this.worker.onmessage = ({ data }) => {
      this.asyncGroups = data.groups;
      this.recomputingGroups = false;
    };
  },
};
</script>
<style scoped lang="scss" />
