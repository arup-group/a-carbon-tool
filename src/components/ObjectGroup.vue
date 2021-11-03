<template>
  <div v-if="group">
    <md-card
      class="md-layout object-row md-elevation-0 md-alignment-center-left"
      md-with-hover
      @mouseover.native="hover()"
      @mouseleave.native="unhover()"
    >
      <div class="md-layout-item md-size-50 md-medium-size-100 row-cell">
        <md-icon
          :style="visible ? 'color:#434343' : 'color:gray'"
          @click.native="toggleVisible()"
          >remove_red_eye</md-icon
        >&nbsp;
        <md-icon
          :style="isolated ? 'color:#434343' : 'color:gray'"
          @click.native="toggleIsolation()"
          >location_searching</md-icon
        >&nbsp;
        <md-chip
          :style="
            'width: auto;' + (isByMaterial && `background-color:${color};`)
          "
          class="md-elevation-2"
        >
          {{ group.name }}
          <span class="md-caption" style="color:#808080"
            >{{ group.objects.length }} objs</span
          >
        </md-chip>
      </div>
      <div
        class="md-layout-item md-size-10 md-medium-size-30 md-caption row-cell xxxtext-right"
        v-if="!isForTransport"
      >
        Set material:
      </div>
      <div
        class="md-layout-item md-size-40 md-medium-size-100 md-caption xxx-row-cell"
        v-if="!isForTransport"
      >
        <md-autocomplete
          v-model="selectedMaterialName"
          :md-options="getMaterialsPerSource"
          :md-fuzzy-search="false"
          @md-selected="assignMaterials($event, group)"
        >
          <template slot="md-autocomplete-item" slot-scope="{ item }">{{
            item
          }}</template>
          <template slot="md-autocomplete-empty" slot-scope="{ term }"
            >No materials matching "{{ term }}" were found.</template
          >
        </md-autocomplete>
      </div>
      <div
        class="md-layout-item md-size-70 md-caption row-cell"
        v-if="isForTransport"
      >
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-30">
            <md-field>
              <md-select v-model="selectedScenario" name="transport-scenario">
                <md-option
                  v-for="scenario in transportScenarios"
                  :value="scenario"
                  :key="scenario"
                  >{{ scenario }}</md-option
                >
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-70 text-center">
            <md-field style="width:25%;float:left">
              <label>road (km)</label>
              <md-input
                v-model="road"
                type="number"
                :disabled="selectedScenario !== 'custom'"
              ></md-input>
            </md-field>
            <md-field style="width:25%;float:left">
              <label>rail (km)</label>
              <md-input
                v-model="rail"
                type="number"
                :disabled="selectedScenario !== 'custom'"
              ></md-input>
            </md-field>
            <md-field style="width:25%;float:left">
              <label>sea (km)</label>
              <md-input
                v-model="sea"
                type="number"
                :disabled="selectedScenario !== 'custom'"
              ></md-input>
            </md-field>
            <md-button
              :disabled="selectedScenario !== 'custom'"
              @click.native="assignTransport()"
              >save</md-button
            >
          </div>
        </div>
      </div>
    </md-card>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-100">
        <md-progress-bar
          md-mode="determinate"
          v-if="settingMaterials"
          :md-value="progress"
          style="height:2px"
        ></md-progress-bar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ObjectGroup",
  components: {},
  props: {
    group: Object,
    isForTransport: { type: Boolean, default: false },
  },
  watch: {
    group() {
      this.currentIndex = 0;
    },
    selectedScenario(val) {
      switch (val) {
        case "local":
          this.road = 50;
          this.rail = 0;
          this.sea = 0;
          break;
        case "regional":
          this.road = 300;
          this.rail = 0;
          this.sea = 0;
          break;
        case "global":
          this.road = 200;
          this.rail = 0;
          this.sea = 10000;
          break;
        case "custom":
          break;
        default:
          break;
      }
      this.assignTransport();
    },
  },
  computed: {
    isByMaterial() {
      return this.group.key === "material_name";
    },
    color() {
      return this.getHexFromString(this.group.name);
    },
    getMaterialsPerSource() {
      return this.$store.getters.materialsPerSource(
        this.$store.state.selectedDbSource,
      );
    },
  },
  data() {
    return {
      isolated: false,
      visible: true,
      currentIndex: 5,
      showDetails: false,
      selectedMaterialName: null,
      transportScenarios: ["local", "regional", "global", "custom"],
      selectedScenario: "",
      road: 0,
      rail: 0,
      sea: 0,
      setMaterialChunks: [],
      dbMaterial: null,
      settingMaterials: false,
      animFrame: null,
      progress: 0,
    };
  },
  methods: {
    assignTransport() {
      this.settingMaterials = true; // used for the display of the progress bar
      let objsToSet = this.$store.state.objects.filter(
        ({ _id }) => this.group.objects.indexOf(_id) !== -1,
      );

      this.processLargeArrayAsync(objsToSet, (obj, index) => {
        const copy = { ...obj };
        copy.properties.transport = {
          road: this.road,
          rail: this.rail,
          sea: this.sea,
          scenario: this.selectedScenario,
        };
        window.renderer.updateObjectsProperties({ objects: [copy] });
        this.$store.commit("SET_OBJECT", Object.freeze(copy));
        this.progress = (index / objsToSet.length) * 100;
        if (index === objsToSet.length - 1) {
          this.settingMaterials = false;
          window.renderer.resetColors();
          window.renderer.colorByProperty({
            propertyName: "transport.scenario",
          });
        }
      });
    },
    assignMaterials(evt) {
      this.settingMaterials = true;
      const objsToSet = this.$store.state.objects.filter(
        ({ _id }) => this.group.objects.indexOf(_id) !== -1,
      );

      const i = evt.split(" ")[0];
      const row = this.$store.state.matsPerSource[
        this.$store.state.selectedDbSource
      ][i];

      this.processLargeArrayAsync(
        objsToSet,
        (obj, index) => {
          const copy = { ...obj };
          copy.properties.database = this.$store.state.selectedDbSource;
          copy.properties.material_name = `${row.material ||
            row.Material} - ${row.subtype || row.Subtype}`;
          copy.properties._material_index = evt.split(" ")[0];
          this.$store.commit("SET_OBJECT", Object.freeze(copy));
          this.progress = (index / objsToSet.length) * 100;
          window.renderer.updateObjectsProperties({ objects: [obj] });
          if (index === objsToSet.length - 1) {
            window.renderer.resetColors();
            window.renderer.colorByProperty({ propertyName: "material_name" });
            this.settingMaterials = false;
            this.$emit("refresh", null);
          }
        },
        500,
      );

      // After assigning remove selected objects to prevent weird bugs
      this.$store.commit("FLUSH_SELECTED_OBJECTS");
      window.bus.$emit("clear-selection");
    },

    hover() {
      if (this.isHovering) return;
      this.isHovering = true;
      window.renderer.highlightObjects(this.group.objects);
    },
    unhover() {
      if (!this.isHovering) return;
      this.isHovering = false;
      window.renderer.unHighlightObjects(this.group.objects);
    },
    toggleVisible() {
      if (this.visible) {
        window.renderer.hideObjects(this.group.objects);
        this.visible = false;
      } else {
        window.renderer.showObjects(this.group.objects);
        this.visible = true;
      }
    },
    toggleIsolation() {
      if (this.isolated) {
        window.renderer.showObjects([]);
        this.isolated = false;
      } else {
        this.visible = true;
        window.renderer.isolateObjects(this.group.objects);
        this.isolated = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
/*
  TODO: Cleanup, this is copypasted css from object detail row component
 */
.object-row {
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  border-radius: 20px;
  border-bottom: 0 !important;
  height: auto !important;
}

.object-row:first-of-type {
  border-top: 0 !important;
}

.row-cell:last-of-type {
  border-right: 0;
}

.row-cell {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 8px;
  padding-right: 8px;
  display: inline-block;
  border-right: 0 !important;
}
</style>
