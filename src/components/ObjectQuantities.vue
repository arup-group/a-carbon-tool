<template>
  <div class="md-layout md-alignment-center-center" v-if="isActive">
    <div class="md-layout-item md-size-100">
      <br />
      <md-field>
        <label for="volume"
          >How do you want to calculate object quantities?</label
        >
        <md-select v-model="calcMode" name="volume">
          <md-option value="property"
            >Using an object's volume property</md-option
          >
          <md-option value="automatic"
            >Try calculating volumes automatically</md-option
          >
        </md-select>
      </md-field>
    </div>
    <div class="md-layout-item md-size-100">
      <template v-if="!isAutoCalc">
        <p>
          Select the key where the volume of the objects can be found! The app
          looks for any property called
          <code>volume</code>
        </p>

        <md-field>
          <label for="volume" v-if="!hasProps"
            >There are no volume properties on any objects</label
          >
          <label for="volume" v-else>Select Volume key</label>
          <md-select
            v-model="volumeKey"
            name="volume"
            md-dense
            :disabled="!hasProps"
          >
            <md-option v-for="key in propertyKeys" :value="key" :key="key">{{
              key
            }}</md-option>
          </md-select>
        </md-field>
      </template>
      <br />
    </div>
    <div class="md-layout md-gutter md-alignment-center-center">
      <div class="md-layout-item md-size-30">
        <md-field>
          <label for="conversionFactor">Volume Conversion Factor</label>
          <md-input
            v-model="volumeConversionFactor"
            name="conversionFactor"
            type="number"
            >1</md-input
          >
        </md-field>
      </div>
      <div class="md-layout-item">
        <md-button class="md-icon-button">
          <md-icon>help</md-icon>
          <md-tooltip md-direction="top">
            If the volume is expressed in a different unit other than m3, please
            specify a conversion factor. Leave "1" if no change is needed. Cubic
            feet to cubic meters ratio, for example, is
            <code>0.02832</code>
            (1/35.315).
          </md-tooltip>
        </md-button>
      </div>
    </div>
    <div class="md-layout-item md-size-100">
      <br />
    </div>
    <!-- <div class="md-layout-item md-size-100" v-if="volumeKey">
      Range for "{{ this.volumeKey }}" is:
      {{ this.legend && this.legend.min * this.volumeConversionFactor }} to
      {{ this.legend && this.legend.max * this.volumeConversionFactor }} (volume
      conversion factor is applied).
      <br />
    </div>-->
    <div class="md-layout-item md-size-60" v-if="isAutoCalc">
      <md-button
        class="md-primary md-raised"
        style="width: 100%"
        @click.native="recalculateAllVolumes()"
      >
        Calculate All Object Volumes
        <md-tooltip md-direction="top">
          <md-icon>warning</md-icon>&nbsp; Please note, for the volume
          calculation to be accurate, the objects need to be closed meshes with
          no duplicate vertices or naked edges. Use at your own risk!
        </md-tooltip>
      </md-button>

      <template v-if="settingVolumes">
        <br />
        <md-progress-bar
          md-mode="determinate"
          v-show="settingVolumes"
          :md-value="progress"
        ></md-progress-bar>
        <br />
      </template>
    </div>

    <div class="md-layout-item md-size-100" v-if="this.volumeKey">
      <object-group-simple
        :group="withoutVolume"
        :isOk="false"
      ></object-group-simple>
      <object-group-simple
        :group="withVolume"
        :isOk="true"
      ></object-group-simple>
    </div>

    <md-divider></md-divider>
    <br />
    <br />
    <custom-quantities></custom-quantities>
  </div>
</template>
<script>
import flatten from "flat";
import get from "lodash.get";

import ObjectGroupSimple from "@/components/ObjectGroupSimple.vue";
import CustomQuantities from "@/components/CustomQuantities.vue";
import VueSlider from "vue-slider-component";

export default {
  name: "ObjectQuantities",
  components: { ObjectGroupSimple, VueSlider, CustomQuantities },
  props: {},
  watch: {
    legend(val) {
      if (!val) return;
      if (val.propertyName !== this.volumeKey) return;
      if (this.legendIsSet) return;
      this.legendIsSet = true;
      this.volumeRange = [
        Number.parseFloat(val.min.toFixed(2)),
        Number.parseFloat(val.max.toFixed(2)) + 1,
      ];
      this.legendStart = { min: val.min, max: val.max };
    },
    volumeKey(val) {
      this.$store.commit("SET_VOL_KEY", val);
      this.calculateGroups();
      this.updateRender();
    },
    volumeConversionFactor(val, oldVal) {
      this.$store.commit("SET_VOL_CONV", val);
    },
  },
  computed: {
    isActive() {
      return this.$store.state.appStep === "quant-input";
    },
    hasProps() {
      return this.propertyKeys.length > 0;
    },
    isAutoCalc() {
      return this.calcMode == "automatic";
    },
    withVolume() {
      return this.groups[1];
    },
    withoutVolume() {
      return this.groups[0];
    },
    legend() {
      return this.$store.state.legend;
    },
    propertyKeys() {
      let keySet = new Set();
      this.$store.state.objects.forEach(obj => {
        if (!obj.properties) return;
        let flatProps = flatten(obj.properties);
        for (let key in flatProps) keySet.add(key);
      });
      return [...keySet].filter(myKey =>
        myKey.toLowerCase().includes("volume"),
      );
    },
  },
  data() {
    return {
      selectionModes: [],
      settingVolumes: false,
      calcMode: "property",
      volumeError: false,
      volumeCalculated: false,
      volumeRange: [0, 1],
      groups: [],
      legendStart: this.legend,
      legendIsSet: false,
      progress: 0,
      volumeConversionFactor: 1,
      volumeKey: null,
      defaultVolumeKey: "volume",
    };
  },
  methods: {
    recalculateAllVolumes() {
      let volumes = [];
      this.settingVolumes = true;

      this.processLargeArrayAsync(
        this.$store.state.objects,
        (obj, index) => {
          let renderObj = window.renderer.scene.children.find(
            x => x.userData._id === obj._id,
          );
          if (!renderObj) {
            this.settingVolumes = false;
            return;
          }

          // Calculate object volume
          let volume = null;
          try {
            volume = Converter.getMeshVolume(renderObj);
          } catch (e) {
            console.error(e);
          }

          if (!volume) {
            console.error(
              `Could not calcluate volume for ${renderObj.userData._id}`,
            );
          }

          // Update object store with new volume property
          this.volumeKey = this.defaultVolumeKey;

          const copy = { ...obj };
          copy.properties[this.volumeKey] = volume;
          obj = Object.freeze(copy);

          // UPdate object even if volume property is null, so that it can be shown in the UI
          this.$store.commit("SET_OBJECT", obj);

          // Update progressbar
          this.progress = (index / this.$store.state.objects.length) * 100;

          this.volumeCalculated = true;

          // Update render view window
          renderObj.userData.properties[this.volumeKey] = volume;
          if (index === this.$store.state.objects.length - 1) {
            this.updateRender();
            this.calculateGroups();
            this.settingVolumes = false;
          }
        },
        500,
      );
    },
    updateRender() {
      window.renderer.resetColors();
      window.renderer.colorByProperty({
        propertyName: this.$store.state.volumeKey,
      });
    },
    calculateGroups() {
      let withVolume = this.$store.getters
        .getObjectsByProperty(this.$store.state.volumeKey)
        .map(o => o._id);

      let withoutVolume = this.$store.getters
        .getObjectsWithoutProperty(this.$store.state.volumeKey)
        .map(o => o._id);

      this.groups = [
        {
          name: "Objects *without* a volume property",
          objects: withoutVolume,
        },
        {
          name: "Objects with a volume property",
          objects: withVolume,
        },
      ];
    },
  },
};
</script>
<style scoped lang="scss"></style>
