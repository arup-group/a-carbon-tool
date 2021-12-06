<template>
  <v-form ref="form" @submit.prevent="checkSubmit">
    <v-container class="d-flex justify-center align-center">
      <v-card style="width: 80%">
        <v-card-title class="">New Assessment</v-card-title>
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
            :items="items"
            label="component"
          ></v-select>
          <v-text-field
            v-model="projectValue"
            label="Project Value (£)"
            required
          ></v-text-field>
          <v-text-field
            v-model="gia"
            label="Gross Internal Area"
            required
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Menu1b extends Vue {}
</script>
