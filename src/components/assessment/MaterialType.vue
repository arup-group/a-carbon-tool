<template>
  <v-row dense align="center">
    <v-col cols="12" md="4" class="pl-2">
      <v-chip>
        {{ cleanType(type.type) }}
      </v-chip>
    </v-col>
    <v-col coles="12" md="8" class="pr-2">
      <v-combobox
        v-model="selectedMaterial"
        :items="materials"
        :item-text="(materials) => materials['name']"
        @change="checkMaterialUpdated"
        chips
      >
        <template #selection="{ item }">
          <v-chip :color="item.color" :textColor="getContrastYIQ(item.color)">{{
            item.name
          }}</v-chip>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { MaterialUpdateOut, SpeckleType } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class MaterialType extends Vue {
  @Prop() materials!: MaterialFull[];
  @Prop() type!: SpeckleType;

  selectedMaterial = this.type.material ? this.type.material : null;

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
