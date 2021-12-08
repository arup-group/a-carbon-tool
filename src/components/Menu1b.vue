<template>
  <v-form v-model="isFormValid">
    <v-card-text>
      <v-text-field
        v-model="form.speckleStream"
        :rules="textRules"
        label="Speckle Stream"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.project"
        :rules="textRules"
        label="Project"
        required
      ></v-text-field>
      <v-select
        v-model="form.component"
        :items="items_comp"
        :rules="selectionRules"
        label="Component"
      ></v-select>
      <v-text-field
        v-model="form.projectValue"
        :rules="valueRules"
        label="Project Value (£)"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.gia"
        label="Gross Internal Area (m2)"
        :rules="valueRules"
        required
      ></v-text-field>
    </v-card-text>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Menu1b extends Vue {
  data() {
    return {
      items_comp: ["Substructure", "Superstructure"],
      isFormValid: false,
      form: {},
      textRules: [(v: string) => !!v || "Text is required"],
      selectionRules: [(v: string) => !!v || "Input is required"],
      valueRules: [
        (v: number) => Number.isInteger(Number(v)) || "Number is required",
      ],
    };
  }
}
</script>
