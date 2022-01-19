<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card flat>
          <v-card-title class="text-h4">Declaration</v-card-title>
          <v-card-text>
            The construction industry currently faces significant challenges in reducing its environmental impact. The built environment is directly responsible for
            nearly 40% of all carbon emissions, with 10% coming from embodied carbon - the emissions associated with the construction, maintenance and deconstruction
            (<a href='https://worldgbc.org/news-media/commitment-includes-embodied-carbon' target='_blank'>WGBC, 2021</a>).
            <br /><br />
            As an intitative, we believe that significant action needs to be taken to curb these emissions, with a target of limiting global temperature rise to 1.5C.
            Construction professionals - architects, engineers, designers, consultants and contractors - with the power to enact maningful change require the right tools to do so.
            <br /><br />
            A carbon tool, or 'act', is an open-source intitiative to create appropriate tools for the rapid assessment of embodied 
            carbon emissions within built-environment assets. It is a work in progress intended to evolve over time. It is free to all to use and it is open to anyone who 
            would like to contribute. Unlike other lifecycle analysis tools, act is intended to be used by designers as they work to provide quick feedback and enable carbon 
            to be included as a factor in design as it happens.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Description</v-card-title>
          <v-card-text>
            A carbon tool (act) is an open source web application that enables users to estimate embodied carbon equivalent content from Building
            Information Models (BIMs). It uses <a href='https://speckle.systems/' target='_blank'>Speckle</a> to access BIMs from a several established softwares,
            including Revit, Rhino and Civil3D. 
            <br /><br />
            It is designed to provide quick and efficient feedback during the design process to enable
            users to identify embodied carbon hotspots and reduce the impact their design has on the built environment.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Definitions</v-card-title>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Methodology</v-card-title>
          <v-card-text>
            <strong>act</strong> follows the methodology set out in <a href='https://www.rics.org/globalassets/rics-website/media/news/whole-life-carbon-assessment-for-the--built-environment-november-2017.pdf' target='_blank'>
            RICS: Whole life carbon assessment for the build environment (2017)</a> and <a href='https://www.en-standard.eu/bs-en-15978-2011-sustainability-of-construction-works-assessment-of-environmental-performance-of-buildings-calculation-method/'
            target='_blank'>BS EN 15978 (2011)</a>. 
            <br />
          </v-card-text>
          <v-img src='/assets/carbon-stages.svg' height='600' contain></v-img>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Data</v-card-title>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Speckle</v-card-title>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Contributing</v-card-title>
          <v-card-text></v-card-text>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card>
          <v-card-title>Contributors</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class About extends Vue {

}
</script>
