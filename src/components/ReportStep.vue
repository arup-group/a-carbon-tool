<template>
  <div class="md-layout md-alignment-center-center" xxxv-if="isActive">
    <div class="md-layout-item md-size-100" v-if="showLoading">
      <br />
      <md-progress-bar
        md-mode="determinate"
        :md-value="progress"
      ></md-progress-bar>
      <br />&nbsp;
    </div>
    <div
      class="md-layout-item md-size-100 text-center"
      v-if="retrievedReport === null"
    >
      <h2 class="md-display-1" style="font-weight: 200">CO2 Overview</h2>
    </div>
    <div class="md-layout-item md-size-100" style="padding-left:16px;" v-else>
      <report-details :report="retrievedReport"></report-details>
    </div>
    <div
      class="md-layout-item md-size-100 md-small-size-100"
      xxxstyle="height: 320px"
      v-if="totalCost !== 0"
    >
      <ring-chart
        :chart-data="mainChartData.chartData"
        :colors="mainChartData.colors"
        :is-loading="showLoading"
        @legend-clicked="toggleVisibilities"
        proportional
      ></ring-chart>
      <br />
      <div class="text-center md-caption">
        <b>Hint:</b> you can click on the legend to show/hide elements.
      </div>
    </div>
    <div
      class="md-layout-item md-size-100 md-small-size-100 text-center md-layout md-alignment-top-center"
    >
      <h2 class="md-display-3 md-layout-item md-size-100">
        <span class="md-subheading">Total C02</span>
        <br />
        <i>
          <strong>{{ formatedCost }}</strong>
          kgCO2e
        </i>
        <div class="md-subheading">{{ formattedCostM2(totalCost) }}</div>
        <br />
        <span class="md-caption">
          From {{ $store.state.objects.length - totalOmitted }} building
          elements.
          <strong>Excludes A5 Site costs.</strong>
        </span>
      </h2>
      <br />
      <div
        class="md-layout-item md-size-25 md-medium-size-50 md-small-size-100"
      >
        <h3 class="md-body-1">
          <b>A1A3:</b>
          {{ Math.round(report.totalCarbonA1A3).toLocaleString() }} kgCO2e
        </h3>
        <div class="md-body-1">
          {{ formattedCostM2(report.totalCarbonA1A3) }}
        </div>
        <span class="md-caption">Total material lifecycle</span>
      </div>
      <div
        class="md-layout-item md-size-25 md-medium-size-50 md-small-size-100"
      >
        <h3 class="md-body-1">
          <b>A4:</b>
          {{ Math.round(report.totalCarbonA4Transport).toLocaleString() }}
          kgCO2e
        </h3>
        <div class="md-body-1">
          {{ formattedCostM2(report.totalCarbonA4Transport) }}
        </div>
        <span class="md-caption">Total transport</span>
      </div>
      <div
        class="md-layout-item md-size-25 md-medium-size-50 md-small-size-100"
      >
        <h3 class="md-body-1">
          <b>A5:</b>
          {{ Math.round(report.totalCarbonA5Wastage).toLocaleString() }} kgCO2e
        </h3>
        <div class="md-body-1">
          {{ formattedCostM2(report.totalCarbonA5Wastage) }}
        </div>
        <span class="md-caption">Total material wastage</span>
      </div>
      <md-content
        class="md-layout-item md-size-25 md-medium-size-50 md-small-size-100"
        xxxstyle="border-radius:20px"
      >
        <h3 class="md-body-1">
          <b>A5 Site:</b>
          {{ Math.round(report.totalCarbonA5Site).toLocaleString() }} kgCO2e
        </h3>
        <div class="md-body-1">
          {{ formattedCostM2(report.totalCarbonA5Site) }}
        </div>
        <span class="md-caption"
          >Costs associated with on-site processing.</span
        >
      </md-content>
      <md-card
        class="md-layout-item md-size-100 md-elevation-10"
        style="border-radius:20px;margin-top: 20px;"
        md-with-hover
      >
        <h3 class="md-display-1" style="margin-top:0px;">
          <span class="md-caption">total, including a5 plant costs</span>
          <br />
          <b>
            {{
              Math.round(
                report.totalCarbonA5Site +
                  report.totalCarbonA1A3 +
                  report.totalCarbonA4Transport +
                  report.totalCarbonA5Wastage,
              ).toLocaleString()
            }}
            kgCO2e
          </b>
        </h3>
      </md-card>
      <md-card
        class="md-elevation-0 md-primary-xxx md-size-100"
        style="border-radius: 20px; margin-bottom: 20px;"
        md-with-hover
        v-if="retrievedReport === null"
      >
        <md-card-content
          class="md-layout md-alignment-center-center"
          style="padding-bottom:16px;"
        >
          Model completion:
          {{
            (
              (($store.state.objects.length - totalOmitted) /
                $store.state.objects.length) *
              100
            ).toFixed(2)
          }}% &nbsp;
          <md-button
            class="md-icon-button md-raised"
            @click.native="computeMainReport()"
          >
            <md-icon>refresh</md-icon>
          </md-button>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-size-100">
      <br />&nbsp;
      <material-descriptions :materials="materialTable"></material-descriptions>
    </div>
    <div class="md-layout-item md-size-100 md-layout md-alignment-center-left">
      <div
        class="md-layout-item md-size-50 xxxmd-caption"
        style="margin-left: -16px;"
      >
        <h2 style="margin-left:20px;">Create a summary by:</h2>
        <div class="md-caption" style="margin-left:20px; max-width: 80%">
          This section allows you to group objects by any of their common
          properties, such as family, level, etc.
        </div>
      </div>
      <div class="md-layout-item md-size-50">
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
      <div class="md-layout-item md-size-100">
        <object-groups
          :group-key="groupByKey"
          :is-for-report="true"
        ></object-groups>
      </div>
    </div>
    <div class="md-layout-item md-size-100">
      <br />&nbsp; <br />&nbsp; <br />&nbsp;
      <br />
      <object-list-report
        :selected-objects="selectedObjects"
        :totalCost="totalCost"
      ></object-list-report>
    </div>
    <md-card
      class="md-layout-item md-size-100 md-elevation-10 md-accent"
      style="border-radius:20px;margin-top: 20px; padding:20px;"
      md-with-hover
    >
      <b>Disclaimer:</b> It is recommended that you use this tool in conjunction
      with discussions with an Arup carbon expert (see
      <router-link style="font-weight:700;" to="/contact"
        >contact us</router-link
      >page) and with awareness of its limitations. The analysis results reflect
      the completeness and quality of the input digital design model. The tool
      does not yet replace other ‘standards-approved’ licenced Lifecycle Carbon
      Assessment tools and software. <br />&nbsp; <br />&nbsp;
      <div class="text-center">
        <router-link to="/methodology">
          <md-chip class="md-accent md-elevation-5" md-clickable
            >methodology</md-chip
          > </router-link
        >&nbsp;
        <router-link to="/contact">
          <md-chip class="md-accent md-elevation-5" md-clickable
            >contact</md-chip
          >
        </router-link>
      </div>
    </md-card>
  </div>
</template>
<script>
import flatten from "flat";
import get from "lodash.get";

import RingChart from "@/charts/RingChart.vue";
import ObjectListReport from "@/components/ObjectListReport.vue";
import ObjectGroups from "@/components/ObjectGroups.vue";
import MaterialDescriptions from "@/components/MaterialDescriptions.vue";
import ReportDetails from "@/components/ReportDetails.vue";

export default {
  name: "ReportStep",
  components: {
    RingChart,
    ObjectListReport,
    ObjectGroups,
    MaterialDescriptions,
    ReportDetails,
  },
  props: {
    selectedObjects: { type: Array, default: () => [] },
    retrievedReport: { type: Object, default: () => null },
    squareMeters: { type: Number },
  },
  watch: {
    groupByKey() {},
    isActive(val) {
      if (!val) return;
      this.computeMainReport();
      window.renderer.showObjects([]);
      window.renderer.resetColors();
      window.renderer.colorByProperty({ propertyName: "material_name" });
    },
    retrievedReport(newVal) {
      if (newVal !== null) {
        this.computeMainReport();

        window.renderer.colorByProperty({ propertyName: "material_name" });
      }
    },
  },
  computed: {
    report() {
      if (this.retrievedReport) {
        return this.retrievedReport.globalMeasures.carbonReport;
      }
      return this.$store.state.report;
    },
    isActive() {
      return this.$store.state.appStep === "report";
    },
    formatedCost() {
      return Math.round(this.totalCost).toLocaleString();
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
            key
              .toLowerCase()
              .includes("_carbon") /*|| key === 'material_name'*/ ||
            key === "_material_index" ||
            key.includes("__")
          )
            continue;
          if (typeof flatProps[key] === "string") keySet.add(key);
        }
      });
      return [...keySet];
    },
  },
  data() {
    return {
      totalCost: 0,
      totalA1A3: 0,
      totalA4Transport: 0,
      totalA5Wastage: 0,
      mainChartData: { chartData: null, colors: [] },
      materialTable: null,
      showLoading: false,
      groupByKey: null,
      totalOmitted: 0,
      progress: 0,
    };
  },
  methods: {
    toggleVisibilities(materialLegendStats) {
      let matIndex = this.$store.state.materialsDb.findIndex(
        mat =>
          `${mat.material || mat.Material} - ${mat.subtype || mat.Subtype}` ===
          materialLegendStats.name,
      );
      if (matIndex === -1) return;
      this.materialTable[matIndex].visible = !this.materialTable[matIndex]
        .visible;
      if (this.materialTable[matIndex].visible) {
        window.renderer.showObjects(this.materialTable[matIndex].objectIds);
        this.totalCost += this.materialTable[matIndex].totalCost;
      } else {
        window.renderer.hideObjects(this.materialTable[matIndex].objectIds);
        this.totalCost -= this.materialTable[matIndex].totalCost;
      }
    },

    computeMainReport() {
      if (this.retrievedReport) {
        this.$store.commit(
          "SET_REPORT",
          this.retrievedReport.globalMeasures.carbonReport,
        );
        this.materialTable = this.retrievedReport.globalMeasures.carbonReport.materialTable;
        this.totalCost = 0;
        this.generateMaterialDataset(this.materialTable);
        window.renderer.colorByProperty({ propertyName: "material_name" });
        return;
      }
      let materialTable = {};
      this.materialTable = {};
      this.totalCost = 0;
      this.progress = 0;
      this.showLoading = true;
      this.totalOmitted = 0;

      let report = {
        constructionCost: this.$store.state.report.constructionCost,
        squareMeters: 0,
        totalCarbon: 0,
        totalCarbonA1A3: 0,
        totalCarbonA4Transport: 0,
        totalCarbonA5Wastage: 0,
        totalCarbonA5Site: 0,
        numberOfObjects: 0,
        materialTable: {},
      };

      // Site-wide A5 Cost
      report.totalCarbonA5Site =
        (this.$store.state.report.constructionCost / 1e5) * 1400;
      report.totalCarbon += report.totalCarbonA5Site;

      const roadCost = 0.0001136; // (kgCO2/km)
      const railCost = 0.00003351; // (kgCO2/km)
      const seaCost = 0.000016143; // (kgCO2/km)

      this.processLargeArrayAsync(this.$store.state.objects, (obj, index) => {
        let volTest = get(obj, "properties." + this.$store.state.volumeKey);
        if (
          typeof volTest === "undefined" ||
          !volTest ||
          !obj.properties.hasOwnProperty("_material_index")
        ) {
          this.totalOmitted++;
        } else {
          const material = this.$store.state.matsPerSource[
            obj.properties.database || this.$store.state.selectedDbSource // used for custom quantity material
          ][+obj.properties._material_index];

          const myObject = { ...obj };

          // Initialise the base variables
          const volume =
            get(obj, "properties." + this.$store.state.volumeKey) *
            this.$store.state.volumeConversionFactor;
          const transport = obj.properties.transport || {
            road: 100,
            rail: 100,
            sea: 500,
          };
          const wastage = material.wastage ? material.wastage / 100 : 0.05;
          const density = material.density || 1;
          // const carbon_cost = 0; // Total (we will accumulate A1A3, A4 and A5wastage in here as we calc them below)

          const weight = volume * density;
          const carbonA1A3 = weight * material.kgcO2;
          const carbonA4Transport =
            weight * transport.road * roadCost +
            weight * transport.sea * seaCost +
            weight * transport.rail * railCost;
          const wastedMaterialWeight = weight * (1 / (1 - wastage) - 1);
          const wasteTransportRoad = 50; // assumes all waste from site travels 50km
          const carbonA5Wastage =
            wastedMaterialWeight * material.kgcO2 +
            wastedMaterialWeight * // its actual CO2e cost
              (transport.road * roadCost +
                transport.sea * seaCost +
                transport.rail * railCost) + // and its transport cost
            wastedMaterialWeight * (wasteTransportRoad * roadCost);

          // Fin: Set props back on original object
          myObject.properties.weight = weight;
          myObject.properties.wastage = wastage;
          myObject.properties.density = density;
          myObject.properties.transport = transport;
          myObject.properties.carbonA1A3 = carbonA1A3;
          myObject.properties.carbonA4Transport = carbonA4Transport;
          myObject.properties.carbonA5Wastage = carbonA5Wastage;
          // note: this is is a hack
          myObject.properties.volume = volume;

          // Total cost:
          myObject.properties.carbon_cost =
            carbonA1A3 + carbonA4Transport + carbonA5Wastage;
          obj = Object.freeze(myObject);

          // Global
          report.totalCarbon += myObject.properties.carbon_cost;
          report.totalCarbonA1A3 += carbonA1A3;
          report.totalCarbonA4Transport += carbonA4Transport;
          report.totalCarbonA5Wastage += carbonA5Wastage;
          report.numberOfObjects++;

          const i = +obj.properties._material_index;

          // set things up for the material table summary & handle initialisation first as well
          if (materialTable.hasOwnProperty(i)) {
            materialTable[i].totalA1A3 += carbonA1A3;
            materialTable[i].totalA4Transport += carbonA4Transport;
            materialTable[i].totalA5Wastage += carbonA5Wastage;
            materialTable[i].totalCost +=
              carbonA1A3 + carbonA4Transport + carbonA5Wastage;
            materialTable[i].totalWeight += weight;
            materialTable[i].totalVolume += volume;
            materialTable[i].objectIds.push(obj._id);
          } else {
            materialTable[i] = {
              ...material,
            };
            materialTable[i].totalA1A3 = carbonA1A3;
            materialTable[i].totalA4Transport = carbonA4Transport;
            materialTable[i].totalA5Wastage = carbonA5Wastage;
            materialTable[i].totalCost =
              carbonA1A3 + carbonA4Transport + carbonA5Wastage;
            materialTable[i].totalWeight = weight;
            materialTable[i].totalVolume = volume;
            materialTable[i].objectIds = [obj._id];
            materialTable[i].visible = true;
          }
        }

        // set the progress bar
        this.progress = (index / this.$store.state.objects.length) * 100;
        // are we done?
        if (index === this.$store.state.objects.length - 1) {
          report.materialTable = materialTable;
          // TODO: A report can only be saved if you previewed it according to this logic
          // Since previewing is optional we are inviting users to break the application
          this.$store.commit("SET_REPORT", report);
          this.materialTable = materialTable;
          this.generateMaterialDataset(materialTable);
        }
      });
    },

    generateMaterialDataset(materialTable) {
      let data = [];
      let colors = [];

      for (let i in materialTable) {
        let mat = materialTable[i];
        // backwards compatibility
        const matConcat = `${mat.material || mat.Material} - ${mat.subtype ||
          mat.Subtype}`;

        colors.push(this.getHexFromString(matConcat));
        data.push({
          material: matConcat,
          kgCO2: Number.parseFloat(mat.totalCost.toFixed(2)),
        });
        this.totalCost += mat.totalCost;
      }

      this.mainChartData = {
        chartData: {
          columns: ["material", "kgCO2"],
          rows: data,
        },
        colors: colors,
      };
      window.renderer.resetColors();
      window.renderer.colorByProperty({ propertyName: "material_name" });
      this.showLoading = false;
    },
    formattedCostM2(cost) {
      // Depending on flow m2 is either a prop or retrieved from report
      const m2 = this.retrievedReport
        ? this.retrievedReport.squareMeters
        : this.squareMeters;
      const squareMeters = m2 && m2 !== 0 ? m2 : 1;

      // Dividing by 1 won't provide a meaningful kgCO2e/m2, so just omit it
      if (squareMeters === 1) return;

      return `${(
        Math.round(+cost) / +squareMeters
      ).toLocaleString()} kgCO2e/m2`;
    },
  },
  mounted() {
    if (this.retrievedReport !== null) this.computeMainReport();
  },
};
</script>
<style scoped lang="scss" />
