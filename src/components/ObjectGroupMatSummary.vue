<template>
  <div v-if="group">
    <md-card
      class="md-layout object-row md-elevation-0 md-alignment-top-left"
      md-with-hover
      @mouseover.native="hover()"
      @mouseleave.native="unhover()"
      style="height: auto;border-radius: 20px;margin-bottom: 10px;"
    >
      <div class="md-layout-item md-size-40 md-medium-size-100 row-cell">
        <md-icon
          :style="visible ? 'color:#303030;' : 'color:gray;'"
          @click.native="toggleVisible()"
          >remove_red_eye</md-icon
        >&nbsp;
        <md-icon
          :style="isolated ? 'color:#303030;' : 'color:gray;'"
          @click.native="toggleIsolation()"
          >location_searching</md-icon
        >&nbsp;
        <md-chip
          :style="`width: auto; ${isByMaterial} && background-color:${color};`"
          class="md-elevation-2"
        >
          {{ group.name }}
          <span class="md-caption" style="color:#808080"
            >{{ group.objects.length }} objs</span
          >
        </md-chip>
      </div>
      <div
        class="md-layout-item md-size-60 md-caption xxx-row-cell"
        style="padding-top:10px;"
      >
        <span>
          <strong>Total CO2: {{ this.totalCarbonCost.toFixed(2) }} kg</strong>
        </span>
        <br />&nbsp;
        <md-divider></md-divider>
        <br />
        <div
          v-for="mat in materialStats"
          :key="mat.name"
          style="xxxdisplay: inline-block; padding: 2px;"
        >
          <span :style="`color:${getHexFromString(mat.name)};`">
            <strong>{{ mat.name }}</strong>
          </span>
          : {{ mat.totalCost.toFixed(2) }} kgCO2e <br />&nbsp; &nbsp;
        </div>
      </div>
    </md-card>
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-100">
        <md-progress-bar
          md-mode="indeterminate"
          v-if="settingMaterials"
        ></md-progress-bar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ObjectGroupMatSummary",
  components: {},
  props: {
    group: Object,
  },
  watch: {
    group() {
      this.calculateMaterialPercentages();
    },
  },
  computed: {
    isByMaterial() {
      return this.group.key === "material_name";
    },
    color() {
      return this.getHexFromString(this.group.name);
    },
    objects() {
      return this.allObjects.slice(0, this.currentIndex);
    },
    allObjects() {
      return this.$store.state.objects.filter(obj =>
        this.group.objects.includes(obj._id),
      );
    },
    materials() {
      return this.$store.getters.materialMap(
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
      selectedMaterialName: this.group.materialName,
      setMaterialChunks: [],
      dbMaterial: null,
      settingMaterials: false,
      animFrame: null,
      materialStats: [],
      totalCarbonCost: 0,
      chartData: {
        columns: [],
        rows: [],
      },
    };
  },
  methods: {
    calculateMaterialPercentages() {
      this.settingMaterials = true;
      this.totalCarbonCost = 0;
      this.materialStats = [];
      let materials = [];
      this.processLargeArrayAsync(this.allObjects, (obj, index) => {
        if (obj.properties.hasOwnProperty("material_name")) {
          let mat = materials.find(
            m => m.name === obj.properties.material_name,
          );
          if (mat) {
            mat.totalCost += obj.properties.carbon_cost;
          } else {
            materials.push({
              name: obj.properties.material_name,
              totalCost: obj.properties.carbon_cost,
            });
          }
          this.totalCarbonCost += obj.properties.carbon_cost;
        }
        if (index === this.allObjects.length - 1) {
          this.settingMaterials = false;
          this.materialStats = materials;
        }
      });
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
  mounted() {
    this.calculateMaterialPercentages();
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
  border-bottom: 0 !important;
  min-height: 60px;
  line-height: 60px;
}

.object-row:first-of-type {
  border-top: 0 !important;
}

.row-cell:last-of-type {
  border-right: 0;
}

.row-cell {
  border-right: 0 !important;
  display: inline-block;
}
</style>
