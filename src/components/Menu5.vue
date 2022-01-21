<template>
  <div>
    <p>Review working!</p>
    <div v-if="emptyProps">
      <div v-for="poss in possibleEmpty" :key="poss" class="d-flex justify-space-between">
        <div>{{ poss }}</div>
        <div>{{ getFilleds(poss) }}</div>
      </div>
    </div>
    <div v-else>Empty props loading</div>
  </div>
</template>
<script lang="ts">
import { EmptyPropsPassdown } from "@/models/newAssessment";
import { Vue, Component, Prop } from "vue-property-decorator";

type PossibleEmpty = "project"| "materials"| "transports"| "volumes";

@Component
export default class Menu5 extends Vue {
  @Prop() emptyProps!: EmptyPropsPassdown;

  possibleEmpty: PossibleEmpty[] = ["project", "materials", "transports", "volumes"];

  getFilleds(val: PossibleEmpty) {
    switch(val) {
      case "project":
        return this.projectFilled;
      case "materials":
        return this.materialsFilled;
      case "transports":
        return this.transportsFilled;
      case "volumes":
        return this.volumesFilled;
      default:
        console.error("error in Menu5.vue, getFilleds");
        return "something went wrong";
    }
  }

  get projectFilled() {
    if (this.emptyProps) return this.emptyProps.projectEmpty ? "Data step is complete" : "Data step is not complete";
    else return "";
  }
  get materialsFilled() {
    if (this.emptyProps) return this.emptyProps.materialsEmpty.length ? `${this.emptyProps.materialsEmpty.length} objects without materials` : "All objects have materials";
    else return "";
  }
  get transportsFilled() {
    if (this.emptyProps) return this.emptyProps.transportsEmpty.length ? `${this.emptyProps.transportsEmpty.length} objects without a transport type` : "All objects have a transport type";
    else return "";
  }
  get volumesFilled() {
    if (this.emptyProps) return this.emptyProps.volumesEmpty.length ? `${this.emptyProps.volumesEmpty.length} objects without a volume` : "All objects have a volume";
    else return "";
  }
}
</script>
