<template>
  <div>
    <div v-if="emptyProps">
      <div
        v-for="poss in possibleEmpty"
        :key="poss"
        class="d-flex justify-space-between"
      >
        <div>
          <v-icon icon :color="getCol(poss)">{{ getIcon(poss) }}</v-icon>
          <strong> {{ poss }}: </strong>
          {{ getFilleds(poss) }}
        </div>
      </div>
      <v-card-actions>
        <v-btn :style="colStyle" @click="stepMinus" color="primary">
          Previous
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="this.incomplete"
          :style="colStyle"
          @click="stepPlus"
          color="primary"
        >
          Next
        </v-btn>
      </v-card-actions>
    </div>
    <div v-else>Empty props loading</div>
  </div>
</template>
<script lang="ts">
import { EmptyPropsPassdown } from "@/models/newAssessment";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

type PossibleEmpty = "Data" | "Materials" | "Transport" | "Volume";

@Component
export default class Menu5 extends Vue {
  @Prop() emptyProps!: EmptyPropsPassdown;
  @Prop() colStyle!: any;

  possibleEmpty: PossibleEmpty[] = ["Data", "Materials", "Transport", "Volume"];
  colorCheck = "primary";

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

  getCol(val: PossibleEmpty) {
    switch (val) {
      case "Data":
        if (this.projectFilled === "Data step is complete") {
          return "primary";
        } else {
          return "red";
        }
      case "Materials":
        if (this.materialsFilled === "All objects have materials") {
          return "primary";
        } else {
          return "red";
        }
      case "Transport":
        if (this.transportsFilled === "All objects have a transport type") {
          return "primary";
        } else {
          return "red";
        }
      case "Volume":
        if (this.volumesFilled === "All objects have a volume") {
          return "primary";
        } else {
          return "red";
        }
      default:
        return "red";
    }
  }
  getIcon(val: PossibleEmpty) {
    switch (val) {
      case "Data":
        if (this.projectFilled === "Data step is complete") {
          this.colorCheck = "primary";
          return "mdi-check-circle";
        } else {
          this.colorCheck = "red";
          return "mdi-alert-circle";
        }
      case "Materials":
        if (this.materialsFilled === "All objects have materials") {
          this.colorCheck = "primary";
          return "mdi-check-circle";
        } else {
          this.colorCheck = "red";
          return "mdi-alert-circle";
        }
      case "Transport":
        if (this.transportsFilled === "All objects have a transport type") {
          this.colorCheck = "primary";
          return "mdi-check-circle";
        } else {
          this.colorCheck = "red";
          return "mdi-alert-circle";
        }
      case "Volume":
        if (this.volumesFilled === "All objects have a volume") {
          this.colorCheck = "primary";
          return "mdi-check-circle";
        } else {
          this.colorCheck = "Red";
          return "mdi-alert-circle";
        }
      default:
        console.error("error in Menu5.vue, getFilleds");
        return "something went wrong";
    }
  }

  get incomplete() {
    if (
      this.projectFilled === "Data step is complete" &&
      this.transportsFilled === "All objects have a transport type" &&
      this.materialsFilled === "All objects have materials" &&
      this.volumesFilled === "All objects have a volume"
    ) {
      return false;
    } else {
      return true;
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
  @Emit("stepPlus")
  stepPlus() {
    return;
  }
  @Emit("stepMinus")
  stepMinus() {
    return;
  }
}
</script>
