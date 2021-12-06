<template>
  <v-form ref="form" @submit.prevent="checkSubmit">
    <v-container class="d-flex justify-center align-center">
      <v-card style="width: 50%">
        <v-card-title class="">New Assessment</v-card-title>
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1"> Data </v-stepper-step>
          <v-stepper-content step="1">
            <v-card-text>
              <v-text-field
                v-model="speckleStream"
                label="Speckle Stream"
                required
              ></v-text-field>
              <v-text-field
                v-model="project"
                label="Project"
                required
              ></v-text-field>
              <v-select
                v-model="component"
                :items="items_comp"
                label="component"
              ></v-select>
              <v-text-field
                v-model="projectValue"
                label="Project Value (£)"
                required
              ></v-text-field>
              <v-text-field
                v-model="gia"
                label="Gross Internal Area (m2)"
                required
              ></v-text-field>
            </v-card-text>
          </v-stepper-content>
          <v-stepper-step :complete="e6 > 2" step="2">
            Materials
          </v-stepper-step>
          <v-stepper-content step="2"> </v-stepper-content>
          <v-stepper-step :complete="e6 > 3" step="3">
            Transport
          </v-stepper-step>
          <v-stepper-content step="3"> </v-stepper-content>
          <v-stepper-step :complete="e6 > 4" step="4">
            Quantities
          </v-stepper-step>
          <v-stepper-content step="2"> </v-stepper-content>
          <v-stepper-step :complete="e6 > 5" step="5"> Review </v-stepper-step>
          <v-stepper-content step="5"> </v-stepper-content>
          <v-stepper-step :complete="e6 > 6" step="6"> preview </v-stepper-step>
          <v-stepper-content step="6"> </v-stepper-content>
          <v-stepper-step :complete="e6 > 7" step="7"> Report </v-stepper-step>
          <v-stepper-content step="7"> </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Menu1b extends Vue {
  get items_comp() {
    return ["Substructure", "Superstructure"];
  }
}
</script>
