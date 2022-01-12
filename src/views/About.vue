<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="9">
        <v-card flat>
          <v-card-title class="text-h4">About</v-card-title>
          <v-card-text>
            A carbon tool (act) is an open source web application that enables
            users to estimate embodied carbon equivalent content from Building
            Information Models (BIM) - using Speckle to solve the challenge of
            data interoperability in the AEC industry. It is designed to provide
            quick and efficient feedback during the design process to enable
            users to identify carbon hotspots and reduce the impact their design
            has on the built environment.
            <br /><br />
            In November 2021 we officially open-sourced this initiative to
            foster collaboration in solving the most significant challenge the
            construction industry faces today - how to minimise the envionmental
            impact of new construction and major interventions. We believe that
            this platform can aid in this. Carbon emissions are far from the
            only climate indicator the construction industry should focus it's
            attention on. Getting them fully understood so that we can measure
            and manage them towards our Net Zero aspirations is a step in the
            right direction.
            <br /><br />
            We hope that this platform can be a vehicle for change. This version
            is open to anyone with access to a Speckle server. Instructions on
            how to deploy your own version of this platform can be found within
            our git repository. If you would like to contribute to this
            initiative please contact us through the links provided.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class About extends Vue {}
</script>
