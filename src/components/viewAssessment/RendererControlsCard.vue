<template>
  <v-card class="card pa-4" flat outlined>
    <v-card-title class="pt-0 px-0">
      <span class="text-h7">Viewer controls</span>
    </v-card-title>
    <v-card-text>
      Model showing:
      <v-select
        v-model="select"
        :items="displayOptions"
        item-text="name"
        item-value="value"
      />
      <div v-if="showHeatmapKey">
        <div class="d-flex align-center">
          <div
            style="width: 1rem; height: 1rem; background-color: #3f5efb"
            class="mr-2"
          ></div>
          = low
        </div>
        <div class="d-flex align-center">
          <div
            style="width: 1rem; height: 1rem; background-color: #f9466d"
            class="mr-2"
          ></div>
          = high
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Emit, Watch } from "vue-property-decorator";

interface DisplayOption {
  name: string;
  value: string;
}

@Component
export default class RendererControlsCard extends Vue {
  displayOptions: DisplayOption[] = [
    {
      name: "Materials",
      value: "materials",
    },
    {
      name: "Total Carbon",
      value: "parameters.Total Carbon.value",
    },
    {
      name: "Product Stage Carbon A1-A3",
      value: "parameters.Product Stage Carbon A1-A3.value",
    },
    {
      name: "Transport Carbon A4",
      value: "parameters.Transport Carbon A4.value",
    },
    {
      name: "Construction Carbon A5",
      value: "parameters.Construction Carbon A5.value",
    },
    {
      name: "None",
      value: "none",
    },
  ];

  select = "materials";
  get showHeatmapKey() {
    if (
      this.select === "parameters.Total Carbon.value" ||
      this.select === "parameters.Product Stage Carbon A1-A3.value" ||
      this.select === "parameters.Transport Carbon A4.value" ||
      this.select === "parameters.Construction Carbon A5.value"
    ) {
      return true;
    } else {
      return false;
    }
  }

  @Watch("select")
  @Emit("selectChanged")
  selectChanged() {
    return this.select;
  }
}
</script>
