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
    <v-form v-if="selectedObjects.length > 0" @submit.prevent="newGroup">
      <v-divider class="pb-4 mt-4"></v-divider>
      <strong>{{ selectedObjects.length }} Objects selected</strong>
      <v-text-field
        label="Group name"
        v-model="newGroupName"
        :rules="nameRules"
      ></v-text-field>
      <v-btn type="submit" outlined class="mb-4">Create new group</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { SelectedMaterialEmit, SpeckleType } from "@/models/newAssessment";
import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import MaterialType from "./MaterialType.vue";

@Component({
  components: { MaterialType },
})
export default class Menu2 extends Vue {
  @Prop() types!: SpeckleType[];
  @Prop() materials!: MaterialFull[];
  @Prop() selectedObjects!: string[];

  newGroupName = "";
  groupNames: string[] = [];

  nameRules = [
    (n: string) => this.newGroupCheck(this.groupNames, n) || "Group name already taken",
  ];

  get loadedTypes() {
    return this.types ? this.types : [];
  }

  newGroup() {
    if (this.newGroupName && this.newGroupCheck(this.groupNames, this.newGroupName)) this.createNewGroup();
  }

  newGroupCheck(groupNames: string[], name: string) {
    return !groupNames.includes(name)
  }

  @Emit("createNewGroup")
  createNewGroup() {
    const name = this.newGroupName;
    this.groupNames.push(name);
    this.newGroupName = "";
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

  setMaterial = "";
  groupBy = "";
  source = "";
  sourceItems = [];
  groupByItems = [];
  materialItems = [];
}
</script>
