<template>
    <v-card class="card pa-4" flat outlined>
    <v-card-title class="pt-0 px-0">
      <span class="text-h7">Viewer controls</span>
    </v-card-title>
    <v-card-text>
        These are some controls...
        <v-select
          v-model="select"
          :items="displayOptions"
          item-text="name"
          item-value="value"
        />
        {{ select }}
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
  displayOptions: DisplayOption[] = [{
    name: "Total Carbon",
    value: "parameters.Total Carbon.value"
  }, {
    name: "Product Stage Carbon A1-A3",
    value: "parameters.Product Stage Carbon A1-A3.value"
  }, {
    name: "Transport Carbon A4",
    value: "parameters.Transport Carbon A4.value"
  }, {
    name: "Construction Carbon A5",
    value: "parameters.Construction Carbon A5.value"
  },
  // {
  //   name: "Materials",
  //   value: "materials"
  // }, {
  //   name: "None",
  //   value: "none"
  // }
  ];

  select = "parameters.Total Carbon.value";

  @Watch("select")
  @Emit("selectChanged")
  selectChanged() {
    return this.select;
  }
}
</script>
