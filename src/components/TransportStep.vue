<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-size-100 md-layout md-alignment-center-left md-gutter"
    >
      <div
        class="md-layout-item md-size-50 md-caption"
        style="margin-left: -16px;"
      >
        Group objects by:
      </div>
      <div class="md-layout-item md-size-50">
        <md-field>
          <md-select v-model="groupByKey" md-dense>
            <md-option
              v-for="key in propertyKeysThatAreStrings"
              :value="key"
              :key="key"
            >
              {{ key }}
            </md-option>
          </md-select>
        </md-field>
      </div>
    </div>
    <div class="md-layout-item md-size-100">
      <object-groups
        :group-key="groupByKey"
        :selection="selectedObjects"
        :is-for-transport="true"
      ></object-groups>
    </div>
    <div class="md-layout-item md-size-100 text-center">
      <div class="md-caption">Legend:</div>
      <br />
      <md-chip :style="'background-color:' + getHexFromString('local')"
        >local</md-chip
      >
      <md-chip :style="'background-color:' + getHexFromString('regional')"
        >regional</md-chip
      >
      <md-chip :style="'background-color:' + getHexFromString('global')"
        >global</md-chip
      >
      <md-chip :style="'background-color:' + getHexFromString('custom')"
        >custom</md-chip
      >
    </div>
  </div>
</template>
<script>
import flatten from "flat";
import ObjectGroups from "@/components/ObjectGroups.vue";

export default {
  name: "ObjectDataView",
  components: {
    ObjectGroups,
  },
  props: {
    selectedObjects: {
      type: Array,
      default: () => [],
    },
    analysisLegend: Object,
  },
  data() {
    return {
      paginationIncrement: 25,
      currentIndex: 25,
      groupByKey: null,
      firstKeySet: false,
    };
  },
  watch: {
    isActive(newVal) {
      if (newVal) this.groupByKey = "material_name";
      window.renderer.showObjects([]);
    },
    groupByKey() {
      window.renderer.showObjects([]);
    },
  },
  computed: {
    isActive() {
      return this.$store.state.appStep === "transport-input";
    },
    populatedSelectedObjects() {
      return this.selectedObjects.map(id =>
        this.$store.state.objects.find(o => o._id === id),
      );
    },
    objects() {
      if (this.selectedObjects.length > 0)
        return this.populatedSelectedObjects.slice(0, this.currentIndex);
      return this.$store.state.objects.slice(0, this.currentIndex);
    },
    propertyKeysThatAreStrings() {
      let keySet = new Set();
      this.$store.state.objects.forEach(obj => {
        if (!obj.properties) return;
        let flatProps = flatten(obj.properties);
        for (let key in flatProps) {
          if (
            key === "hash" ||
            key === "id" ||
            key.toLowerCase().includes("hash") ||
            key.toLowerCase().includes("_carbon") ||
            key.includes("__")
          )
            continue;
          if (typeof flatProps[key] === "string") keySet.add(key);
        }
      });
      return [...keySet];
    },
    propertyKeys() {
      let keySet = new Set();
      this.$store.state.objects.forEach(obj => {
        if (!obj.properties) return;
        let flatProps = flatten(obj.properties);
        for (let key in flatProps) keySet.add(key);
      });
      return [...keySet];
    },
    disableShowMoreButton() {
      if (this.$store.state.objects.length === 0) return true;
      if (this.selectedObjects.length > 0)
        return this.currentIndex > this.selectedObjects.length;
      else return this.currentIndex > this.$store.state.objects.length;
    },
  },
  methods: {
    clearColorBy() {
      this.groupByKey = null;
    },
  },
};
</script>
<style scoped lang="scss" />
