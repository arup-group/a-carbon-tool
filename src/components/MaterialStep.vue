<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-size-100 md-layout md-alignment-center-left md-gutter"
    >
      <div
        class="md-layout-item md-size-20 md-caption"
        style="margin-left: -16px;"
      >
        Source:
      </div>
      <div class="md-layout-item md-size-100">
        <md-field>
          <!-- <label for='database'>Database</label> -->
          <md-select v-model="selectedSource" name='database' id='database' md-dense>
            <md-option
              v-for="key in distinctDbSources"
              :value="key"
              :key="key"
              >{{ key }}</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div
        class="md-layout-item md-size-20 md-caption"
        style="margin-left: -16px;"
      >
        Group objects by:
      </div>
      <div class="md-layout-item md-size-100">
        <md-field>
          <md-select v-model="groupByKey" md-dense>
            <md-option
              v-for="key in propertyKeysThatAreStrings"
              :value="key"
              :key="key"
              >{{ key }}</md-option
            >
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item xxxmd-size-20 md-caption text-right">
        <md-button
          v-show="groupByKey !== 'material_name'"
          class="md-raised md-primary"
          @click.native="setMaterialGroupKey()"
          >Review Materials</md-button
        >
      </div>
    </div>
    <div class="md-layout-item md-size-100">
      <object-groups
        :group-key="groupByKey"
        :selection="selectedObjects"
      ></object-groups>
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
      selectedSource: this.$store.state.selectedDbSource,
      firstKeySet: false,
      distinctDbSources: this.$store.state.distinctDbSources.sort(),
    };
  },
  watch: {
    isActive(newVal) {
      if (newVal && !this.groupByKey) this.groupByKey = "speckle_type";
    },
    groupByKey() {
      window.renderer.showObjects([]);
    },
    selectedSource(newVal) {
      this.$store.commit("SET_SELECTED_DB_SOURCE", newVal);
    },
  },
  computed: {
    isActive() {
      return this.$store.state.appStep === "material-input";
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
    setMaterialGroupKey() {
      this.groupByKey = "material_name";
      this.$store.commit("FLUSH_SELECTED_OBJECTS");
      window.bus.$emit("clear-selection");
    },
  },
};
</script>
<style scoped lang="scss" />
