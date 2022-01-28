<template>
  <v-container>
    <v-row>
      <v-col cols="12" xl='8'>
        <v-card flat outlined class="mt-8">
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
          <v-img src='/assets/globe.png' contain height='480'></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" xl='8'>
        <v-card flat outlined>
          <v-card-title class="text-h4">Speckle</v-card-title>
          <v-card-text class='mb-4'>
            <strong>act</strong> is built on top of Speckle - a cloud based solution for the AEC industry that provides honest interoperability, real time collaboration, 
            data management, versioning and automation. Speckle allows us to directly plug into BIM projects and store the resulting assessment in an accessible location 
            which could form part of a wider workflow. But don't take it from us. Watch the video and follow the links below for more information.
          </v-card-text>
          <v-card-actions class="justify-center">
            <iframe 
              width="560"
              height="315"
              src="https://www.youtube.com/embed/B9humiSpHzM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </v-card-actions>
          <v-card-actions class="my-4">
            <v-row dense>
              <v-col cols='6' align='right'>
                <v-btn color='primary' outlined src='https://speckle.systems/' target='_blank'>
                  Speckle Home
                </v-btn>
              </v-col>
              <v-col cols='6' align='left' scr='https://speckle.xyz/' target='_blank'>
                <v-btn color='secondary' outlined>
                  Speckle XYZ
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl='8'>
        <v-card flat outlined>
          <v-card-title class="text-h4">Methodology</v-card-title>
          <v-card-text>
            <strong>act</strong> follows the methodology set out in <a href='https://www.rics.org/globalassets/rics-website/media/news/whole-life-carbon-assessment-for-the--built-environment-november-2017.pdf' target='_blank'>
            RICS: Whole life carbon assessment for the build environment (2017)</a> and <a href='https://www.en-standard.eu/bs-en-15978-2011-sustainability-of-construction-works-assessment-of-environmental-performance-of-buildings-calculation-method/'
            target='_blank'>BS EN 15978 (2011)</a>. 
            <br /><br />
            act currently covers stages A1 - A5 of this scope, from cradle to practical completion. This includes the calculation of product stage carbon (A1-A3) - 
            the carbon emissions associated with material extraction and processing, transport to site (A4), and emissions on site (A5). The calculation methods 
            used for each of these stages are detailed below.
          </v-card-text>
          <v-img src='/assets/carbon-stages.svg' height='600' contain class='mb-8'></v-img>
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
          <v-img src='/assets/a5-site-equation.png' height='320' contain class="mb-4"></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" xl='8'>
        <v-card flat outlined>
          <v-card-title class='text-h4'>Data</v-card-title>
          <v-card-text>
            The data within <strong>act</strong> has been segregated by region. Carbon factors have been selected from the following, openly available, 
            sources...
          </v-card-text>
          <v-card-actions class="mx-3 mb-4">
            <v-row>
              <v-col v-for='geo in dataSources' :key='geo.name' cols='12'>
                <div><strong>{{ geo.name }}</strong></div>
                <div v-for='source in geo.sources' :key='source.name'>
                  <v-btn outlined small :src='source.url' class='my-1' color='secondary' target="_blank">
                    {{ source.name }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" xl='8'>
        <v-card flat outlined>
          <v-card-title class="text-h4">Contributing</v-card-title>
          <v-card-text>
            <strong>act</strong> is an open-source initiative with a GPL3 licence. Anyone is welcome to contribute.
            Check out our repository for guidance on how best to get involved
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              outlined
              color='primary'
              href="https://github.com/arup-group/a-carbon-tool"
              target="_blank"
              class='mx-2'
            >
              Github
            </v-btn>
          </v-card-actions>
          <v-card-title >Contributors</v-card-title>
            <v-card-actions class="mb-4 mx-4">
              <v-row style="width:100%">
                <v-col cols='12' sm="6" md="4" v-for="item in contributors" :key='item.name'>
                  <v-sheet 
                    outlined
                    color='primary'
                    rounded
                    class='my-1'
                    height="100%"
                  >
                    <v-card flat height='100%' class='card-outter'>
                      <v-img :src="item.img" aspect-ratio="1" contain max-height='240px'></v-img>
                      <v-card-title>{{ item.name }}</v-card-title>
                      <v-card-subtitle>{{ item.byline }}</v-card-subtitle>
                      <v-card-actions fill-height class='card-actions'>
                        <v-btn icon color='primary' class="ma-2" :disabled="item.git===''" :src="item.git">
                          <v-icon>
                            mdi-github
                          </v-icon>
                        </v-btn>
                        <v-btn icon color='primary' class="ma-2" :disabled="item.linkedin===''">
                          <v-icon>
                            mdi-linkedin
                          </v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class About extends Vue {
  contributors = [
    {
      name: "Tom Bunn",
      img: "/assets/contributors/placeholder-2.png",
      byline: "Product manager @ Arup | environmental sustainability evangalist",
      git: "https://github.com/tomhebunn",
      linkedin: "https://www.linkedin.com/in/tom-bunn-8251a45a/"
    },
    {
      name: "Katharyn Church",
      img: "/assets/contributors/placeholder-1.png",
      byline: "Transport consultant / software developer @ Arup",
      git: "https://github.com/kchurch2",
      linkedin: ""
    },
    {
      name: "Daniel O'Dowd",
      img: "/assets/contributors/placeholder-2.png",
      byline: "BIM manager / developer @ Arup",
      git: "https://github.com/ninehundred",
      linkedin: ""
    },
    {
      name: "Stam Psarras",
      img: "/assets/contributors/placeholder-3.png",
      byline: "Software developer @ Arup",
      git: "https://github.com/psarras",
      linkedin: ""
    },
    {
      name: "Rob Salca",
      img: "/assets/contributors/placeholder-2.png",
      byline: "Software engineer @ Arup | sustainability and salsa enthusiast",
      git: "https://github.com/ro-sa",
      linkedin: "https://www.linkedin.com/in/robert-salca"
    },
    {
      name: "Rory Webber",
      img: "/assets/contributors/placeholder-3.png",
      byline: "Front end dev @ Arup",
      git: "https://github.com/exilliar",
      linkedin: ""
    },
  ]

  dataSources = [
    {
      name: "UK",
      sources: [
        {
          name: "ICE v3.0b (2019)",
          url: "https://circularecology.com/embodied-carbon-footprint-database.html"
        },
        {
          name: "IStructE - How to calculate embodied carbon (2021)",
          url: "https://www.istructe.org/resources/guidance/how-to-calculate-embodied-carbon/"
        },
        {
          name: "IStructE - Mass Timber Embodied Carbon Factors (2022)",
          url: "https://www.istructe.org/resources/blog/mass-timber-embodied-carbon-factors/"
        },
      ]
    },
    {
      name: "Australia",
      sources: [
        {
          name: "coming soon",
          url: ""
        }
      ]
    },
    {
      name: "East Asia",
      sources: [
        {
          name: "coming soon",
          url: ""
        }
      ]
    },
    {
      name: "Europe",
      sources: [
        {
          name: "coming soon",
          url: ""
        }
      ]
    },
    {
      name: "India",
      sources: [
        {
          name: "coming soon",
          url: ""
        }
      ]
    }
  ]
}
</script>

<style>
.card-outter {
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
