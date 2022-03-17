<template>
  <div>
    <v-form>
      <strong>Objects by speckle type</strong>
      <div v-for="type in loadedTypes" :key="type.type" style="width: 100%">
        <material-type
          :materials="materials"
          :type="type"
          @materialUpdated="materialUpdated"
          @selectMaterial="selectMaterial"
        />
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { MaterialUpdateOut, SpeckleType } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import MaterialType from "./MaterialType.vue";

@Component({
  components: { MaterialType },
})
export default class Menu2 extends Vue {
  @Prop() types!: SpeckleType[];
  @Prop() materials!: MaterialFull[];

  get loadedTypes() {
    console.log("types", this.types)
    return this.types ? this.types : [];
  }

  @Emit("materialUpdated")
  materialUpdated(material: MaterialUpdateOut) {
    return material;
  }

  @Emit("selectMaterial")
  selectMaterial(objects: []) {
    return;
  }

  setMaterial = "";
  groupBy = "";
  source = "";
  sourceItems = [];
  groupByItems = [];
  materialItems = [];
}
</script>
