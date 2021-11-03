<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <br />
      <md-progress-bar
        v-if="showProgress && $store.state.objects.length !== 0"
        md-mode="determinate"
        :md-value="reviewProgress"
      ></md-progress-bar>
      <br />
    </div>
    <div
      v-for="check in checks"
      :key="check.name"
      class="md-layout-item md-size-100"
    >
      <md-card
        :class="check.passed ? 'md-elevation-0' : 'md-elevation-0 md-accent'"
        style="border-radius: 20px;margin-bottom: 20px"
        md-with-hover
        @mouseover.native="hover(check.problematicObjects)"
        @mouseleave.native="unhover(check.problematicObjects)"
      >
        <md-card-content style="padding-bottom:16px;">
          <p class="text-center-xxx">
            <md-icon>
              {{ !check.passed ? "error_outline" : "check_circle" }}
            </md-icon>
            &nbsp;
            {{ check.message }}
            <span class="md-caption">
              ({{ check.problematicObjects.length }} problematic objects).
            </span>
          </p>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import get from "lodash.get";

export default {
  name: "ReviewStep",
  props: {
    streamIds: Array,
  },
  watch: {
    isActive(val) {
      if (!val) return;
      window.renderer.showObjects([]);
      this.checkModel();
    },
  },
  computed: {
    isActive() {
      return this.$store.state.appStep === "review";
    },
  },
  data() {
    return {
      checks: [],
      showProgress: false,
      isHovering: false,
      reviewProgress: 0,
      unitThreshold: 1000000,
    };
  },
  methods: {
    hover(objs) {
      if (this.isHovering) return;
      this.isHovering = true;
      window.renderer.highlightObjects(objs);
    },
    unhover(objs) {
      if (!this.isHovering) return;
      this.isHovering = false;
      window.renderer.unHighlightObjects(objs);
    },
    // Things to check:
    // Do all objects have a material?
    // Do all objects have a volume?
    // Are there any negative volumes?
    // Are all units of the loaded streams the same (and metric)?
    checkModel() {
      this.showProgress = true;
      this.checks = [];
      this.reviewProgress = 0;
      let unitCheck = {
        passed: true,
        message: "Data inputs all have metric units.",
        name: "Unit check",
        problematicObjects: [],
      };
      let volumeCheck = {
        passed: true,
        message: "All input data has a volume property.",
        name: "Quantities check",
        problematicObjects: [],
      };
      let transportCheck = {
        passed: true,
        message: "All input data has transport info associated with it.",
        name: "Transport check",
        problematicObjects: [],
      };
      let materialCheck = {
        passed: true,
        message: "All input data has an assigned material.",
        name: "Materials check",
        problematicObjects: [],
      };

      this.checks.push(unitCheck, transportCheck, volumeCheck, materialCheck);

      this.processLargeArrayAsync(this.$store.state.objects, (obj, index) => {
        let volume = get(obj, "properties." + this.$store.state.volumeKey);

        try {
          if (isNaN(volume) || volume < 0) {
            volumeCheck.passed = false;
            volumeCheck.message =
              "Some object have either a volume of zero or negative, or no volume at all. They will be ignored.";
            volumeCheck.problematicObjects.push(obj);
          }
        } catch (e) {
          volumeCheck.passed = false;
          volumeCheck.message = "Some objects do not have a volume property.";
          volumeCheck.problematicObjects.push(obj);
        }

        try {
          let nDigits = Math.round(volume).toString().length;
          //Check number of digits the volume is. If it's too high then it's likely in the wrong units
          if (nDigits >= this.unitThreshold.toString().length) {
            unitCheck.passed = false;
            unitCheck.message =
              "Object volumes  seem to be outside of a sensible range. Verify that the object volumes are being calculated correctly.";
          }
        } catch (e) {
          unitCheck.passed = false;
          unitCheck.message = "There was an error during the unit check.";
          unitCheck.problematicObjects.push(obj);
        }

        if (!obj.properties.hasOwnProperty("transport")) {
          transportCheck.passed = false;
          transportCheck.message =
            "Some objects do not have a transport scenario associated with them.";
          transportCheck.problematicObjects.push(obj);
        }

        if (!obj.properties.hasOwnProperty("_material_index")) {
          materialCheck.passed = false;
          materialCheck.message =
            "Some objects do not have assigned materials. They will be ignored.";
          materialCheck.problematicObjects.push(obj);
        }
        this.reviewProgress = (index / this.$store.state.objects.length) * 100;
        if (index === this.$store.state.objects.length - 1) {
          this.showProgress = false;
        }
      });
    },
  },
};
</script>
<style scoped lang="scss" />
