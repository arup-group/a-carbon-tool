<template>
  <v-form v-model="isFormValid">
    <v-card-text>
      <v-combobox
        v-model="speckleStream"
        label="Speckle Stream"
        :items="streams"
        :item-text="(streams) => streams['label']"
        @change="streamSelected"
        required
      ></v-combobox>
      <v-text-field
        v-model="form.project"
        label="Project name"
        required
      ></v-text-field>
      <v-select
        v-model="form.component"
        :items="elementCategories()"
        :rules="selectionRules"
        label="Primary element category"
      ></v-select>
      <v-text-field
        v-model="form.projectValue"
        :rules="valueRules"
        label="System cost (£)"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.gia"
        label="System gross floor area (m2)"
        :rules="valueRules"
        required
      ></v-text-field>
    </v-card-text>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { StreamObject } from "@/models/newAssessment";
import store from "@/store";

@Component({})

export default class Menu1b extends Vue {
  @Prop() streams!: StreamObject;
  mounted() {
    console.log("[menu1b]", this.streams);
  }
  speckleStream!: StreamObject;
  streamSelected() {
    try {
      const id = this.speckleStream.value;
      console.log(id);
      if (id !== undefined) {
        this.loadStream(id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Emit("loadStream")
  loadStream(id: string) {
    return id;
  }

  isFormValid = false;
  form = {};
  // textRules = [(v: string) => !!v || "Text is required"];
  selectionRules = [(v: string) => !!v || "Input is required"];
  valueRules = [
    (v: number) => Number.isInteger(Number(v)) || "Number is required",
  ];

  elementCategories() {
    return store.state.buildingElementCategories
  }
}
</script>
