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
          <v-card-title>Speckle</v-card-title>
          <v-card-text>
            <strong>act</strong> is built on top of <a href='https://speckle.systems' target='blank'>Speckle</a> - a cloud based solution 
            for the AEC industry that provides honest interoperability, real time collaboration, data management, versioning and automation. 
            The use of Speckle allows us access to BIM data agnostic of platform used.<br /><br />
            In order to use <strong>act</strong> you will need to be a registered user of the <a href='https://speckle.xyz/' target='_blank'>Speckle XYZ</a> 
            server or a member of Arup staff.<br /><br />
            If you want to know more about Speckle and to get set up using the Speckle XYZ server check out the 
            <a href='https://speckle.systems' target='blank'>Speckle systems website</a> <br /><br />
            If you are the owner or administrator of a Speckle 2.0 server and want to register your server on <strong>act</strong> please get in touch.
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols='12'>
        <v-card flat>
          <v-card-title>Definitions</v-card-title>
        </v-card>
      </v-col> -->
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Methodology</v-card-title>
          <v-card-text>
            <strong>act</strong> follows the methodology set out in <a href='https://www.rics.org/globalassets/rics-website/media/news/whole-life-carbon-assessment-for-the--built-environment-november-2017.pdf' target='_blank'>
            RICS: Whole life carbon assessment for the build environment (2017)</a> and <a href='https://www.en-standard.eu/bs-en-15978-2011-sustainability-of-construction-works-assessment-of-environmental-performance-of-buildings-calculation-method/'
            target='_blank'>BS EN 15978 (2011)</a>. 
            <br /><br />
            act currently covers stages A1 - A5 of this scope, from cradle to practical completion. This includes the calculation of product stage carbon (A1-A3) - 
            the carbon emissions associated with material extraction and processing, transport to site (A4), and emissions on site (A5). The calculation methods 
            used for each of these stages are detailed below.
          </v-card-text>
          <v-img src='/assets/carbon-stages.svg' height='600' contain></v-img>
          <v-card-text>
            <div><strong>Product Stage Carbon (A1-A3)</strong></div>
            Product stage carbon is calculated by applying the mass of material by a carbon factor representing the effort and energy expended in it's creation.
            The factors used within <strong>act</strong> are provided below. To estimate the mass of materials from Building Information Models (BIMs) act 
            calculate the volume of each object and applies the density of the selected material.
          </v-card-text>
          <v-img src='/assets/a1a3-equation.png' height='200' contain></v-img>
          <v-card-text>
            <div><strong>Transport emissions (A4)</strong></div>
            Calculated by applying a transport factor (kgCO2e/kg/km) against the mass of material in each object and the distance travelled from source location 
            to site. The factors used for transport emissions are taken from UK ONS 2018 data and are as follows:<br /><br />
            <ul>
            <li>Transport by road = 0.0001136 kgCO2e/kg/km (All HGVs – average laden)</li>
            <li>Transport by rail = 0.00003351 kgCO2e/kg/km (Rail – freight train)</li>
            <li>Transport by sea = 0.000016143kgCO2e/kg/km (Cargo ship – container ship – average)</li>
            </ul>
          </v-card-text>
          <v-card-text>
            <div><strong>Site emissions (A5)</strong></div>
            The emissions from site are split into 2 parts - the emissions as a result of site works, and the emissions generated from wasted material during
            construction. Site emissions are estimated based on the cost of construction for the design being assessed, as per the RICS methodology. A factor 
            of 1400 kgCO2e/£100k of cost can be used. If not known, the design cost can be set to 0.
            <br /><br />
            The amount of waste for each BIM object can be calulated using a waste factor taken from the WRAP database (2018). The emissions of this 
            waste can then be estimated using the A1-A4 equations above.<br /><br />
          </v-card-text>
          <v-img src='/assets/a5-waste-volume-equation.png' height='120' contain></v-img>
          <v-img src='/assets/a5-site-equation.png' height='320' contain></v-img>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Data</v-card-title>
          <v-card-text>
            The data within <strong>act</strong> has been segregated by region. Carbon factors have been selected from the following, openly available, 
            sources...<br /><br />
            <div><strong>UK:</strong></div>
            <ul>
              <li>ICE v3.0b (2019)</li>
              <li>IStructE - How to calculate embodied carbon (2020)</li>
            </ul><br />
            <div><strong>Australia:</strong></div>
            <ul>
              <li>coming soon</li>
            </ul><br />
            <div><strong>Europe:</strong></div>
            <ul>
              <li>coming soon</li>
            </ul><br />
            <div><strong>East Asia:</strong></div>
            <ul>
              <li>coming soon</li>
            </ul><br />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Contributing</v-card-title>
          <v-card-text>
            Check out our repository for guidance on how best to contribute - <a href='https://github.com/arup-group/a-carbon-tool'>github</a>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols='12'>
        <v-card flat>
          <v-card-title>Contributors</v-card-title>
          <v-card-text>
            <ul>
              <li>Tom Bunn - product manager and occasional front end dev</li>
              <li>Stam Psarras - tech lead</li>
              <li>Rory Webber - front end lead</li>
              <li>Katharyn Church - front end dev</li>
              <li>Daniel O'Dowd - front end dev</li>
              <li>Rob Salca - front end dev</li>
            </ul>
          </v-card-text>
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
