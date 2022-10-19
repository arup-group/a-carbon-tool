<template>
  <div>
    <div class="d-flex align-center">
      <span class="text-h6">Custom Group Creation</span>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" class="ml-1" v-bind="attrs" v-on="on">
            <v-icon> mdi-information-outline </v-icon>
          </v-btn>
        </template>
        <span>
          Select an object on the model to create a custom group. Hold "shift"
          so select multiple objects.
        </span>
      </v-tooltip>
    </div>
    <div v-if="invalidObjects" class="red--text">
      Some selected objects are not valid.
    </div>
    <v-form v-if="selectedObjects.length > 0" @submit.prevent="newGroup">
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
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class CustomGroup extends Vue {
  @Prop() selectedObjects!: string[];
  @Prop() invalidObjects!: boolean;

  newGroupName = "";
  groupNames: string[] = [];

  nameRules = [
    (n: string) =>
      this.newGroupCheck(this.groupNames, n) || "Group name already taken",
  ];

  newGroup() {
    if (
      this.newGroupName &&
      this.newGroupCheck(this.groupNames, this.newGroupName)
    )
      this.createNewGroup();
  }

  newGroupCheck(groupNames: string[], name: string) {
    return !groupNames.includes(name);
  }

  @Emit("createNewGroup")
  createNewGroup() {
    const name = this.newGroupName;
    this.groupNames.push(name);
    this.newGroupName = "";
    return name;
  }
}
</script>
