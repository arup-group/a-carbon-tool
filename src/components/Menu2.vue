<template>
  <div>
    <v-form>
      <p>Grouping objects by speckle type</p>
      <div
        v-for="type in loadedTypes"
        :key="type.type"
        class="d-flex align-center justify-space-between"
        style="width: 100%"
      >
        <material-type
          :materials="materials"
          :type="type"
          @materialUpdated="materialUpdated"
        />
      </div>
    </v-form>
  </div>
</template>

<script lang="ts">
import { MaterialUpdateOut, SpeckleType } from "@/models/newAssessment";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import MaterialType from "./MaterialType.vue";

@Component({
  components: { MaterialType },
})
export default class Menu2 extends Vue {
  @Prop() types!: SpeckleType[];
  @Prop() materials!: string[];

  get loadedTypes() {
    return this.types ? this.types : [];
  }

  @Emit("materialUpdated")
  materialUpdated(material: MaterialUpdateOut) {
    return material;
  }

  setMaterial = "";
  groupBy = "";
  source = "";
  sourceItems = [];
  groupByItems = [];
  materialItems = [];
}
</script>
