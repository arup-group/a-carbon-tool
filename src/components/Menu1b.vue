<template>
  <v-container class="d-flex justify-center align-center">
    <v-card style="width: 50%">
      <v-card-title class="">New Assessment</v-card-title>
      <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="isFormValid" step="1" @click.native="e6 = 1">
          Data
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-form v-model="isFormValid">
            <v-card-text>
              <v-text-field
                v-model="speckleStream"
                :rules="textRules"
                label="Speckle Stream"
                required
              ></v-text-field>
              <v-text-field
                v-model="project"
                :rules="textRules"
                label="Project"
                required
              ></v-text-field>
              <v-select
                v-model="component"
                :items="items_comp"
                :rules="selectionRules"
                label="Component"
              ></v-select>
              <v-text-field
                v-model="projectValue"
                :rules="valueRules"
                label="Project Value (£)"
                required
              ></v-text-field>
              <v-text-field
                v-model="gia"
                label="Gross Internal Area (m2)"
                :rules="valueRules"
                required
              ></v-text-field>
            </v-card-text>
          </v-form>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 2" step="2" @click.native="e6 = 2">
          Materials
        </v-stepper-step>
        <v-stepper-content step="2"> </v-stepper-content>
        <v-stepper-step :complete="e6 > 3" step="3" @click.native="e6 = 3">
          Transport
        </v-stepper-step>
        <v-stepper-content step="3"> </v-stepper-content>
        <v-stepper-step :complete="e6 > 4" step="4" @click.native="e6 = 4">
          Quantities
        </v-stepper-step>
        <v-stepper-content step="5"> </v-stepper-content>
        <v-stepper-step :complete="e6 > 5" step="5" @click.native="e6 = 5">
          Review
        </v-stepper-step>
        <v-stepper-content step="5"> </v-stepper-content>
        <v-stepper-step :complete="e6 > 6" step="6" @click.native="e6 = 6">
          preview
        </v-stepper-step>
        <v-stepper-content step="6"> </v-stepper-content>
        <v-stepper-step :complete="e6 > 7" step="7" @click.native="e6 = 7">
          Report
        </v-stepper-step>
        <v-stepper-content step="7"> </v-stepper-content>
      </v-stepper>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Menu1b extends Vue {
  get items_comp() {
    return ["Substructure", "Superstructure"];
  }
  data() {
    return {
      e6: 1,
      isFormValid: false,
      project: "",
      speckleStream: "",
      textRules: [(v: string) => !!v || "Text is required"],
      selectionRules: [(v: string) => !!v || "Input is required"],
      valueRules: [
        (v: number) => Number.isInteger(Number(v)) || "Number is required",
      ],
    };
  }
}
</script>
