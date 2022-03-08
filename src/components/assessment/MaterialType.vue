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
        <v-chip>
          {{ cleanType(type.type) }}
        </v-chip>
      </v-col>
      <v-col coles="12" md="8" class="pr-2">
        <v-combobox
          :items="materials"
          :item-text="(materials) => materials['name']"
          @change="checkMaterialUpdated"
          chips
        >
          <template #selection="{ item }">
            <v-chip :color="item.color"><strong>{{ item.name }}</strong></v-chip>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <div class="d-flex align-center justify-space-between"></div>
  </v-card>
</template>
<script lang="ts">
import { MaterialUpdateOut, SpeckleType } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class MaterialType extends Vue {
  @Prop() materials!: MaterialFull[];
  @Prop() type!: SpeckleType;

  cleanType(type: string) {
    const typeArr = type.split(".");
    return typeArr[typeArr.length - 1];
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
