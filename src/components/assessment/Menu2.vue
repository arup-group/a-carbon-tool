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
    <v-divider class="pb-4 mt-4"></v-divider>
    <custom-group
      :invalidObjects="invalidObjects"
      :selectedObjects="selectedObjects"
      @createNewGroup="createNewGroup"
    />
  </div>
</template>

<script lang="ts">
import { SelectedMaterialEmit, SpeckleType } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import MaterialType from "./MaterialType.vue";
import CustomGroup from "./CustomGroup.vue";

@Component({
  components: { MaterialType, CustomGroup },
})
export default class Menu2 extends Vue {
  @Prop() types!: SpeckleType[];
  @Prop() materials!: MaterialFull[];
  @Prop() selectedObjects!: string[];
  @Prop() invalidObjects!: boolean;

  get loadedTypes() {
    return this.types ? this.types : [];
  }

  @Emit("createNewGroup")
  createNewGroup(name: string) {
    return name;
  }

  @Emit("materialUpdated")
  materialUpdated(material: SelectedMaterialEmit) {
    return material;
  }

  @Emit("selectMaterial")
  selectMaterial(selectedMaterial: SelectedMaterialEmit) {
    return selectedMaterial;
  }
}
</script>
