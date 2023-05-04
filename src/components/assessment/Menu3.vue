<template>
  <div>
    <p>Objects grouped by material</p>
    <transport-item
      v-for="material in transportGroups"
      :key="material.name"
      @transportSelected="transportSelected"
      :transportTypes="transportTypes"
      :groupedMaterial="material"
    />
  </div>
</template>

<script lang="ts">
import {
  GroupedMaterial,
  TransportSelected,
  TransportType,
} from "@/models/newAssessment";
import { ReportFullTransportGroup } from "@/models/report";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import TransportItem from "./TransportItem.vue";

@Component({
  components: { TransportItem },
})
export default class Menu3 extends Vue {
  @Prop() transportTypes!: TransportType[];
  @Prop() groupedMaterials!: GroupedMaterial[];
  @Prop() transportGroups!: ReportFullTransportGroup[];

  mounted() {
    console.log("mounted transportGroups:", this.transportGroups)
  }

  @Emit("transportSelected")
  transportSelected(selected: TransportSelected) {
    return selected;
  }
}
</script>
