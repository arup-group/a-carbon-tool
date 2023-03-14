<template>
  <v-card
    flat
    color=""
    :style="[
      this.$store.state.darkMode
        ? { 'background-color': '#1C1C1C !important' }
        : { 'background-color': '#FFFFFF !important' },
    ]"
  >
    <v-row dense align="center">
      <v-col cols="12" md="4" class="pl-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip v-bind="attrs" v-on="on" @click="selectMaterial">
              {{ cleanType(type.type) }}
            </v-chip>
          </template>
          <span>Objects: {{ type.ids.length }} </span>
        </v-tooltip>
      </v-col>
      <v-col coles="12" md="8" class="pr-2">
        <v-combobox
          v-model="currentMaterial"
          :items="materials"
          :item-text="(materials) => materials['name']"
          @change="checkMaterialUpdated"
          chips
        >
          <template #selection="{ item }">
            <v-chip
              :color="item.color"
              :textColor="getContrastYIQ(item.color)"
              >{{ item.name }}</v-chip
            >
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <div class="d-flex align-center justify-space-between"></div>
  </v-card>
</template>
<script lang="ts">
import { MaterialUpdateOut, SelectedMaterialEmit, MaterialGrouping } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class MaterialType extends Vue {
  @Prop() materials!: MaterialFull[];
  @Prop() type!: MaterialGrouping;

  currentMaterial = this.type && this.type.material ? this.type.material : null;
  filtered = true;

  mounted() {
    this.currentMaterial = this.type && this.type.material ? this.type.material : null;
  }

  @Emit("selectMaterial")
  selectMaterial(): SelectedMaterialEmit {
    return {
      ids: this.type.ids,
      type: this.type.type
    };
  }

  cleanType(type: string) {
    const typeArr = type.split(".");
    return typeArr[typeArr.length - 1];
  }

  getContrastYIQ(hexcolor: string) {
    if (hexcolor.slice(0, 1) === "#") {
      hexcolor = hexcolor.slice(1);
    }
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
  }

  materialChanged(material: MaterialFull) {
    if (this.materials.includes(material)) {
      this.materialUpdated(material);
    }
  }

  checkMaterialUpdated(material: MaterialFull) {
    if (this.instanceOfMaterialFull(material)) {
      this.materialUpdated(material);
    }
  }

  @Emit("materialUpdated")
  materialUpdated(material: MaterialFull): MaterialUpdateOut {
    return {
      material,
      type: this.type,
    };
  }


instanceOfMaterialFull(object: any): object is MaterialFull {
    return "name" in object;
  }
}
</script>
