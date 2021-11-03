<template>
  <div class="md-layout md-gutter">
    <md-card
      :class="
        !filtering
          ? 'md-layout-item md-size-100 md-elevation-0'
          : 'md-layout-item md-size-100 md-elevation-10'
      "
      style="margin-bottom: 40px; padding:20px;border-radius:20px;"
      md-with-hover
    >
      <div class="md-layout">
        <div class="md-layout-item">
          <h2>Filter by total kgCO2e</h2>
        </div>
        <div class="md-layout-item md-size-50 text-right">
          <md-button
            :class="filtering ? 'md-raised md-primary' : 'md-raised'"
            @click.native="toggleCCFilter()"
            >{{ filtering ? "disable" : "enable" }}</md-button
          >
        </div>
        <div
          class="md-layout-item md-size-100"
          style="margin-top: 30px;"
          v-if="filtering"
        >
          <vue-slider
            v-if="legendIsSet"
            process-dragable
            v-model="volumeRange"
            :min="Math.max(0, Math.floor(legendStart.min))"
            :max="Math.ceil(legendStart.max)"
            lazy
            :bgStyle="'{background-color:#707070}'"
            :processStyle="
              '{backgroundImage: -webkit-linear-gradient(left, #3498db, #f05b72 )}'
            "
            :tooltipStyle="'{background-color:black, border-color:black}'"
            @callback="sliderChanged"
          ></vue-slider>
        </div>
        <div
          class="md-layout-item md-size-100 text-center md-caption"
          style
          v-if="filtering"
        >
          Global
          <b>Min</b>
          {{ legendStart.min.toLocaleString() }} |
          <b>Max</b>
          : {{ legendStart.max.toLocaleString() }}
        </div>
      </div>
    </md-card>
    <div class="md-layout-item md-size-100" style="margin-bottom: 40px">
      <h2>
        {{ isDisplayingSelection ? "Selected" : "All" }} Objects
        <span v-if="isDisplayingSelection" class="md-body-2">
          Total kgCO2e: {{ selectionTotal.toFixed(2) }} ({{
            selectedObjects.length
          }}
          objects)
        </span>
      </h2>
      <div class="md-caption">
        Select an object in the 3d view to view its properties.
      </div>
    </div>
    <md-card
      class="md-layout-item md-size-100 obj-item md-elevation-0"
      md-with-hover
      v-for="(obj, i) in displayObjects"
      :key="`${obj._id}-${i}`"
    >
      <div
        class="md-layout md-alignment-top-left md-gutterxxx"
        style="margin-bottom:30px"
        @mouseover="hover(obj._id)"
        @mouseleave="unHover(obj._id)"
        @click="zoomTo(obj._id)"
      >
        <div class="md-layout-item md-size-33 md-medium-size-90 xxxmd-caption">
          <strong>
            <span
              :style="`color:${getHexFromString(obj.properties.material_name)}`"
              >{{ obj.properties.material_name }}</span
            >
          </strong>
          <div class="md-caption">Obj Id: {{ obj._id }}</div>
          <br />
        </div>
        <div
          class="md-layout-item md-size-66 md-medium-size-100 md-caption"
          v-if="obj.properties.carbon_cost"
          style="padding-left:4px"
        >
          Total:
          <strong>{{ obj.properties.carbon_cost.toLocaleString() }}</strong>
          kgCO2e ({{
            getPercentageOfTotal(obj.properties.carbon_cost).toLocaleString()
          }}
          %)
          <br />&nbsp;
          <md-divider></md-divider>
          <br />
          <span class="md-caption"
            >A1A3: {{ obj.properties.carbonA1A3.toLocaleString() }} kgCO2e</span
          >
          <br />
          <span class="md-caption">
            A4:
            {{ obj.properties.carbonA4Transport.toLocaleString() }} kgCO2e
          </span>
          <br />
          <span class="md-caption">
            A5:
            {{ obj.properties.carbonA5Wastage.toLocaleString() }} kgCO2e
          </span>
          <br />
          <br />
          <md-divider></md-divider>
          <br />
          <span v-if="obj.properties.weight">
            Weight:
            <strong>{{ obj.properties.weight.toFixed(3) }}</strong> kg;
          </span>
          <span v-if="obj.properties.volume">
            Volume:
            <strong>{{ obj.properties.volume.toFixed(3) }}</strong> m3
          </span>
        </div>
      </div>
    </md-card>
    <div
      class="md-layout-item md-size-100 text-center"
      style="margin-top:40px;margin-bottom:20px"
    >
      <md-button
        class="md-icon-button"
        @click.native="pageNumber = 0"
        :disabled="pageNumber === 0"
      >
        <md-icon>first_page</md-icon>
      </md-button>
      <md-button
        class="md-icon-button"
        @click.native="pageNumber -= 1"
        :disabled="pageNumber === 0"
      >
        <md-icon>chevron_left</md-icon>
      </md-button>
      <span class="md-caption" style="position: relative;top:8px;">
        {{ pageNumber }} /
        {{ (sourceObjects.length / sliceSize).toFixed(0) }}
      </span>
      <md-button
        class="md-icon-button"
        @click.native="pageNumber += 1"
        :disabled="pageNumber >= Math.round(sourceObjects.length / sliceSize)"
      >
        <md-icon>chevron_right</md-icon>
      </md-button>
      <md-button
        class="md-icon-button"
        @click.native="
          pageNumber = Math.round(sourceObjects.length / sliceSize)
        "
        :disabled="pageNumber >= Math.round(sourceObjects.length / sliceSize)"
      >
        <md-icon>last_page</md-icon>
      </md-button>
    </div>
  </div>
</template>
<script>
import VueSlider from "vue-slider-component";

export default {
  name: "ObjectListReport",
  components: { VueSlider },
  props: {
    selectedObjects: { type: Array, default: () => [] },
    totalCost: { type: Number, default: 1 },
  },
  watch: {
    selectedObjects(newVal) {
      if (newVal.length !== 0) {
        this.currentIndex = 0;
        this.pageNumber = 0;
        this.computeTotalForSelection();
      }
    },
    legend(val) {
      if (!val) return;
      if (val.propertyName !== "carbon_cost") return;
      if (this.legendIsSet) return;
      this.legendIsSet = true;
      this.volumeRange = [
        Number.parseFloat(val.min.toFixed(2)),
        Number.parseFloat(val.max.toFixed(2)) + 1,
      ];
      this.legendStart = { min: val.min, max: val.max };
    },
  },
  computed: {
    isDisplayingSelection() {
      return this.selectedObjects.length !== 0;
    },
    displayObjects() {
      return this.sourceObjects.slice(
        this.currentIndex + this.pageNumber * this.sliceSize,
        this.sliceSize * (this.pageNumber + 1),
      );
    },
    sourceObjects() {
      if (this.selectedObjects.length !== 0) return this.selectedObjectsMap;
      if (this.filteredObjects.length !== 0)
        return this.$store.state.objects.filter(
          obj => this.filteredObjects.indexOf(obj._id) !== -1,
        );
      return this.allObjects;
    },
    selectedObjectsMap() {
      const selectedObjs = this.$store.state.objects.filter(
        obj => this.selectedObjects.indexOf(obj._id) !== -1,
      );
      return selectedObjs;
    },
    allObjects() {
      const copiedObjs = [...this.$store.state.objects];
      return copiedObjs.sort(
        (a, b) => b.properties.carbon_cost - a.properties.carbon_cost,
      );
    },
    legend() {
      return this.$store.state.legend;
    },
  },
  data() {
    return {
      currentIndex: 0,
      sliceSize: 10,
      pageNumber: 0,
      switchToSelection: false,
      selectionTotal: 0,
      volumeRange: [0, 1],
      filtering: false,
      legendIsSet: false,
      legendStart: { min: 0, max: 1 },
      filteredObjects: [],
    };
  },
  methods: {
    toggleCCFilter() {
      this.filtering = !this.filtering;
      if (this.filtering) {
        window.renderer.colorByProperty({ propertyName: "carbon_cost" });
      } else {
        this.volumeRange = [this.legendStart.min, this.legendStart.max];
        window.renderer.colorByProperty({ propertyName: "material_name" });
        window.renderer.showObjects([]);
        this.filteredObjects = [];
        this.legendIsSet = false;
      }
    },
    sliderChanged(args) {
      let objIds = [];
      this.processLargeArrayAsync(this.$store.state.objects, (obj, index) => {
        try {
          if (
            obj.properties.carbon_cost >= args[0] &&
            obj.properties.carbon_cost <= args[1]
          )
            objIds.push(obj._id);
        } catch (e) {
          console.log(e);
        }
        if (index === this.$store.state.objects.length - 1) {
          this.filteredObjects = objIds;
          window.renderer.isolateObjects(objIds);
          window.renderer.resetColors();
          setTimeout(
            window.renderer.colorByProperty({ propertyName: "carbon_cost" }),
            10,
          );
        }
      });
    },
    setCarbonHover() {
      window.renderer.colorByProperty({ propertyName: "carbon_cost" });
    },
    removeCarbonHover() {
      window.renderer.colorByProperty({ propertyName: "material_name" });
    },
    computeTotalForSelection() {
      let totalSel = 0;
      this.processLargeArrayAsync(this.selectedObjectsMap, (obj, index) => {
        if (obj.properties.hasOwnProperty("carbon_cost"))
          totalSel += obj.properties.carbon_cost;
        if (index === this.selectedObjectsMap.length - 1) {
          this.selectionTotal = totalSel;
        }
      });
    },
    getPercentageOfTotal(x) {
      return ((x / this.totalCost) * 100).toFixed(3);
    },
    hover(id) {
      if (this.isHovering) return;
      this.isHovering = true;
      window.renderer.highlightObjects(id);
    },
    unHover(id) {
      if (!this.isHovering) return;
      this.isHovering = false;
      window.renderer.unHighlightObjects(id);
    },
    zoomTo(id) {
      window.renderer.zoomToObject(id);
    },
  },
};
</script>
<style scoped lang="scss">
.obj-item {
  padding: 20px;
  margin-top: 10px;
  border-radius: 20px;
}

.row-cell {
  border: 0 !important;
}
</style>
