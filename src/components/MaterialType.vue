<template>
  <div>
    <div>{{ cleanType(type.type) }}</div>
    <v-combobox
      :items="materials"
      style="max-width: 50%"
      @change="materialChanged"
    ></v-combobox>
  </div>
</template>
<script lang="ts">
import { MaterialUpdateOut, SpeckleType } from "@/models/newAssessment";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class MaterialType extends Vue {
  @Prop() materials!: string[];
  @Prop() type!: SpeckleType;

  cleanType(type: string) {
    const typeArr = type.split(".");
    return typeArr[typeArr.length - 1];
  }

  materialChanged(material: string) {
    if (this.materials.includes(material)) {
      this.materialUpdated(material);
    }
  }

  @Emit("materialUpdated")
  materialUpdated(material: string): MaterialUpdateOut {
    return {
      material,
      type: this.type,
    };
  }
}
</script>
