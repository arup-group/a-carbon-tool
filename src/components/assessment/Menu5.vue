<template>
  <div>
    <div v-if="emptyProps">
      <div
        v-for="poss in possibleEmpty"
        :key="poss"
        class="d-flex justify-space-between"
      >
        <div>
          <v-btn icon color="primary">
            <v-icon>{{ getIcon(poss) }}</v-icon>
          </v-btn>
          <strong> {{ poss }}: </strong>
          {{ getFilleds(poss) }}
        </div>
      </div>
    </div>
    <div v-else>Empty props loading</div>
  </div>
</template>
<script lang="ts">
import { EmptyPropsPassdown } from "@/models/newAssessment";
import { Vue, Component, Prop } from "vue-property-decorator";

type PossibleEmpty = "Data" | "Materials" | "Transport" | "Volume";

@Component
export default class Menu5 extends Vue {
  @Prop() emptyProps!: EmptyPropsPassdown;

  possibleEmpty: PossibleEmpty[] = ["Data", "Materials", "Transport", "Volume"];

  getFilleds(val: PossibleEmpty) {
    switch (val) {
      case "Data":
        return this.projectFilled;
      case "Materials":
        return this.materialsFilled;
      case "Transport":
        return this.transportsFilled;
      case "Volume":
        return this.volumesFilled;
      default:
        console.error("error in Menu5.vue, getFilleds");
        return "something went wrong";
    }
  }

  getIcon(val: PossibleEmpty) {
    switch (val) {
      case "Data":
        if (this.projectFilled === "Data step is complete") {
          return "mdi-check-circle";
        } else {
          return "mdi-alert-circle";
        }
      case "Materials":
        if (this.materialsFilled === "All objects have materials") {
          return "mdi-check-circle";
        } else {
          return "mdi-alert-circle";
        }
      case "Transport":
        if (this.transportsFilled === "All objects have a transport type") {
          return "mdi-check-circle";
        } else {
          return "mdi-alert-circle";
        }
      case "Volume":
        if (this.volumesFilled === "All objects have a volume") {
          return "mdi-check-circle";
        } else {
          return "mdi-alert-circle";
        }
      default:
        console.error("error in Menu5.vue, getFilleds");
        return "something went wrong";
    }
  }

  get projectFilled() {
    if (this.emptyProps)
      return this.emptyProps.projectEmpty
        ? "Data step is complete"
        : "Data step is not complete ";
    else return "";
  }
  get materialsFilled() {
    if (this.emptyProps)
      return this.emptyProps.materialsEmpty.length
        ? `${this.emptyProps.materialsEmpty.length} Objects without materials`
        : "All objects have materials";
    else return "";
  }
  get transportsFilled() {
    if (this.emptyProps)
      return this.emptyProps.transportsEmpty.length
        ? `${this.emptyProps.transportsEmpty.length} Objects without a transport type`
        : "All objects have a transport type";
    else return "";
  }
  get volumesFilled() {
    if (this.emptyProps)
      return this.emptyProps.volumesEmpty.length
        ? `${this.emptyProps.volumesEmpty.length} Objects without a volume`
        : "All objects have a volume";
    else return "";
  }
}
</script>
