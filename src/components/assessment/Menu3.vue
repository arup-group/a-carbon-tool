<template>
  <div>
    <p>Objects grouped by speckle_type</p>
    <transport-item
      v-for="type in types"
      :key="type.type"
      @transportSelected="transportSelected"
      :transportTypes="transportTypes"
      :type="type"
    />
  </div>
</template>

<script lang="ts">
import { SpeckleType, TransportSelected, TransportType } from "@/models/newAssessment";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import TransportItem from "./TransportItem.vue";

@Component({
  components: { TransportItem },
})
export default class Menu3 extends Vue {
  @Prop() transportTypes!: TransportType[];
  @Prop() types!: SpeckleType[];

  @Emit("transportSelected")
  transportSelected(selected: TransportSelected) {
    return selected;
  }
}
</script>
