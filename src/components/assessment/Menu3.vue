<template>
  <div>
    <p>Objects grouped by material</p>
    <transport-item
      v-for="material in groupedMaterials"
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
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import TransportItem from "./TransportItem.vue";

@Component({
  components: { TransportItem },
})
export default class Menu3 extends Vue {
  @Prop() transportTypes!: TransportType[];
  @Prop() groupedMaterials!: GroupedMaterial[];

  @Emit("transportSelected")
  transportSelected(selected: TransportSelected) {
    console.log("emitting transportSelected for some reason?????")
    return selected;
  }
}
</script>
