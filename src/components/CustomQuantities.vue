<template>
  <div class="md-layout md-alignment-center-center">
    <div class="md-layout-item md-size-100">
      <h1 class="md-title">
        Custom Quantities
      </h1>
      <p>
        This section allows you to add "virtual objects" that will be taken into
        account in the report summary, nevertheless they will not be visible in
        the model view.
      </p>
    </div>
    <div class="md-layout-item md-size-100">
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-50">
          <md-field>
            <label>
              Volume
              <b>(in original model units!)</b>
            </label>
            <md-input v-model="volume" type="number" />
          </md-field>
        </div>
        <div class="md-layout-item md-size-50">
          <md-field>
            <label>Transport</label>
            <md-select
              v-model="selectedScenario"
              id="transport"
              name="transport-scenario"
            >
              <md-option
                v-for="scenario in transportScenarios"
                :key="scenario"
                :value="scenario"
              >
                {{ scenario }}
              </md-option>
            </md-select>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100 md-caption">
          Select Material:
          <md-autocomplete
            v-model="selectedMaterialName"
            :md-options="materials"
            :md-fuzzy-search="false"
          >
            <template slot="md-autocomplete-item" slot-scope="{ item }">
              {{ item }}
            </template>
            <template slot="md-autocomplete-empty" slot-scope="{ term }"
              >No materials matching "{{ term }}" were found.</template
            >
          </md-autocomplete>
        </div>
        <div class="md-layout-item md-size-100 md-caption">
          <md-button
            @click.native="addCustomElement()"
            :disabled="!!!selectedMaterialName"
            class="md-secondary md-raised"
            style="width:100%;"
            >Add</md-button
          >
        </div>
      </div>
    </div>
    <div
      v-for="obj in customObjects"
      v-bind:key="obj.id"
      class="md-layout-item md-size-100"
      style="margin:10px 0"
    >
      <b>Volume:</b>
      {{ obj.properties.volume }} |
      <b>Transport:</b>
      {{ obj.properties.transport.scenario }}
      <br />
      <b>Material:</b>
      {{ obj.properties.material_name }} |
      <a @click="removeObj(obj._id)">remove</a>
    </div>
  </div>
</template>
<script>
import set from "lodash.set";

export default {
  name: "ObjectQuantities",
  props: {},
  computed: {
    materials() {
      return this.$store.getters.materialMap(
        this.$store.state.selectedDbSource,
      );
    },
    customObjects() {
      return this.$store.state.objects.filter(
        obj => obj.type === "CustomQuantityObject",
      );
    },
  },
  data() {
    return {
      transportScenarios: ["local", "regional", "global"],
      selectedScenario: "local",
      volume: 1,
      selectedMaterialName: null,
    };
  },
  methods: {
    removeObj(id) {
      this.$store.commit("REMOVE_OBJECTS", [id]);
    },
    addCustomElement() {
      const i = this.selectedMaterialName.split(" ")[0];
      const row = this.$store.state.matsPerSource[
        this.$store.state.selectedDbSource
      ][i];

      let objProperties = {
        material_name: `${row.material || row.Material} - ${row.subtype ||
          row.Subtype}`,
        _material_index: i,
        transport: this.getTransportNumbersFromScenarioName(),
        volume: this.volume,
      };

      let obj = {
        properties: objProperties,
        type: "CustomQuantityObject",
      };

      set(obj, "properties." + this.$store.state.volumeKey, this.volume);

      this.$store.commit("ADD_OBJECTS", [obj]);

      // reset
      this.volume = 1;
      this.selectedScenario = "local";
    },
    getTransportNumbersFromScenarioName() {
      let val = this.selectedScenario;
      switch (val) {
        case "local":
          return {
            road: 50,
            rail: 0,
            sea: 0,
            scenario: this.selectedScenario,
          };
        case "regional":
          return {
            road: 300,
            rail: 0,
            sea: 0,
            scenario: this.selectedScenario,
          };
        case "global":
          return {
            road: 200,
            rail: 0,
            sea: 10000,
            scenario: this.selectedScenario,
          };
      }
    },
  },
};
</script>
<style scoped lang="scss" />
