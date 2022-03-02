<template>
  <v-card width="">
    <v-card-title class="d-flex justify-space-between mb-5">
      <span class="text-h5">{{ name }}</span>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>
      <BECChip :category="type" />
    </v-card-subtitle>
    <v-card-text>
      <v-divider class="mb-4 mt-3"></v-divider>
      <div class="text-center">
        <div>
          <span class="text-h5 mr-2">{{ totalCO2e }}</span
          ><span class="font-weight-light">tCO2e</span>
        </div>
        <div class="font-weight-bold">TOTAL A-5 CARBON</div>
        <div class="font-weight-light">{{ totalkgCO2e }} kgCO2e/m2</div>
      </div>
      <v-expand-transition>
        <div v-show="show">
          <v-divider class="mb-4 mt-4"></v-divider>
          <div class="d-flex justify-space-between">
            <div>Report Date:</div>
            <div>{{ reportDate }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <div>Author:</div>
            <div>{{ author }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <div>Job Number:</div>
            <div>{{ jn }}</div>
          </div>
          <v-divider class="mb-4 mt-4"></v-divider>
          <div class="d-flex justify-space-between">
            <div>System cost:</div>
            <div>{{ systemCost }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <div>Gross Floor Area:</div>
            <div>{{ floorArea }}</div>
          </div>
          <div class="d-flex justify-space between">
            <div>Notes:</div>
            <div>{{ notes }}</div>
          </div>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { ProjectInfo } from "@/models/assessment";
import { Vue, Component, Prop } from "vue-property-decorator";
import BECChip from "../shared/BECChip.vue";

@Component({
  components: { BECChip },
})
export default class ProjectInfoCard extends Vue {
  @Prop() projectInfo!: ProjectInfo;
  show = false;

  get name() {
    return this.projectInfo.name;
  }
  get type() {
    return this.projectInfo.type;
  }
  get totalCO2e() {
    return this.projectInfo.totalCO2e
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  get totalkgCO2e() {
    return this.projectInfo.totalkgCO2e
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  get reportDate() {
    return this.projectInfo.reportDate.toLocaleString("en-UK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  }
  get author() {
    return this.projectInfo.author;
  }
  get jn() {
    return this.projectInfo.JN;
  }
  get systemCost() {
    return `£${this.projectInfo.systemCost
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  get floorArea() {
    return `${this.projectInfo.floorArea
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} m2`;
  }
  get notes() {
    return this.projectInfo.notes;
  }
}
</script>
