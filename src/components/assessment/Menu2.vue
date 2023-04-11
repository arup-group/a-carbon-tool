<template>
  <div>
    <v-form>
      <div class="d-flex align-center">
        <strong class="mr-3">Objects grouped by:</strong>
        <v-combobox
          v-model="objectGroup"
          :items="objectGroups"
          @change="groupSelected"
        ></v-combobox>
      </div>
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
      :key="groupKey"
      :invalidObjects="invalidObjects"
      :selectedObjects="selectedObjects"
      @createNewGroup="createNewGroup"
    />
  </div>
</template>

<script lang="ts">
import { SelectedMaterialEmit, MaterialGrouping } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import MaterialType from "./MaterialType.vue";
import CustomGroup from "./CustomGroup.vue";

@Component({
  components: { MaterialType, CustomGroup },
})
export default class Menu2 extends Vue {
  @Prop() types!: MaterialGrouping[];
  @Prop() materials!: MaterialFull[];
  @Prop() selectedObjects!: string[];
  @Prop() invalidObjects!: boolean;
  @Prop() objectGroups!: string[];
  @Prop() defaultGroup!: string;

  _objectGroup = "";
  get objectGroup() {
    return this.defaultGroup;
  }
  set objectGroup(val: string) {
    this._objectGroup = val;
  }

  groupKey = 0;

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

  @Emit("groupSelected")
  groupSelected() {
    this.groupKey++;
    return this._objectGroup;
  }
}
</script>
