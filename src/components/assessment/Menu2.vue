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
        <expanded-material-type
          v-if="expandedTypes.includes(type.name)"
          :materials="materials"
          @selectBuildup="selectBuildup"
          @selectMaterial="selectMaterial"
          :type="type"
        />
        <material-type
          v-else
          :materials="materials"
          :type="type"
          :expandOption="true"
          @materialUpdated="materialUpdated"
          @selectMaterial="selectMaterial"
          @expandSelection="expandSelection"
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
import { SelectedMaterialEmit, SelectedBuildupEmit } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";

import MaterialType from "./MaterialType.vue";
import CustomGroup from "./CustomGroup.vue";
import ExpandedMaterialType from "./ExpandedMaterialType.vue";
import { ReportFullGroup } from "@/models/report";

@Component({
  components: { MaterialType, CustomGroup, ExpandedMaterialType },
})
export default class Menu2 extends Vue {
  @Prop() fullGroups!: ReportFullGroup[];
  @Prop() materials!: MaterialFull[];
  @Prop() selectedObjects!: string[];
  @Prop() invalidObjects!: boolean;
  @Prop() objectGroups!: string[];
  @Prop() defaultGroup!: string;

  updated = false; // for when a report is being updated

  _objectGroup = "";
  get objectGroup() {
    return this.defaultGroup;
  }
  set objectGroup(val: string) {
    this._objectGroup = val;
  }

  expandedTypes: string[] = [];

  @Watch("fullGroups", { deep: true })
  watchFullGroups() {
    if (!this.updated) {
      this.fullGroups.forEach(fg => {
        if (Object.keys(fg.objects[0].materials).length > 1) this.expandSelection(fg);
      });
      this.updated = true;
    }
  }

  groupKey = 0;

  get loadedTypes() {
    return this.fullGroups ? this.fullGroups : [];
  }

  expandSelection(type: ReportFullGroup) {
    this.expandedTypes.push(type.name);
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

  @Emit("selectBuildup")
  selectBuildup(selectedBuildup: SelectedBuildupEmit) {
    return selectedBuildup;
  }

  @Emit("groupSelected")
  groupSelected() {
    this.groupKey++;
    return this._objectGroup;
  }
}
</script>
