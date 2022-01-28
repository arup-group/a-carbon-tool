<template>
  <v-main class="page">
    <v-row justify='center'>
      <v-col cols='12'>
        <v-card flat class='mt-8'>
          <v-img src="/assets/logo.svg" height='80px' class='ma-4' contain>
          </v-img>
        </v-card>
      </v-col>
      <v-col cols='12' md='6'>
        <v-card flat class="mx-4 justify-center">
          <v-card-title class="text-h4">
            act | a carbon tool
          </v-card-title>
          <v-card-subtitle>
            An open-source platform for performing embodied carbon emission calculations from Building Information Models through <a href='https://speckle.systems/' target='_blank' class='secondary--text'>Speckle</a>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-container>
      <v-data-iterator
        :items='projects'
        :items-per-page.sync='itemsPerPage'
        :page.sync='page'
        hide-default-footer
      >
        <template v-slot:header>
          <v-toolbar
            flat
            rounded
            outlined
            class='my-4'
          >
            <v-text-field
              v-model='search'
              clearable
              flat
              solo
              hide-details
              label='Search'
              prepend-inner-icon="mdi-magnify"
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:default='props' class='my-2'>
          <v-row>
            <v-col
              cols='12'
              md='6'
              lg='4'
              v-if='page===1'
            >
              <v-container class='ma-0 pa-0' fluid>
                <v-sheet 
                  outlined
                  color='primary'
                  rounded
                  class='my-1'
                >
                  <v-card flat height='600' class='d-flex align-center justify-center'>
                    <v-card-actions class='justify-center'>
                      <v-btn x-large outlined color='primary' @click="$router.push('/assessment')">
                          <v-icon>
                            mdi-plus
                          </v-icon>
                          New Assessment
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-sheet>
              </v-container>
            </v-col>
            <v-col
              v-for='item in props.items'
              :key='item.id'
              cols='12'
              md='6'
              lg='4'
            >
              <project-card
                :project='item'
              ></project-card>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <v-row class='pb-2'>
            <v-spacer></v-spacer>
            <span
              class="mr-4
              grey--text"
            >
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <v-btn
              color='primary'
              class='mr-1'
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              color='primary'
              class='ml-1'
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>

  </v-main>
</template>
<script lang="ts">

import { Vue, Component, Emit } from "vue-property-decorator";
import ProjectCard from "../components/ProjectCard.vue";
import { Project } from "@/models/project";

@Component ({ components: {ProjectCard} })

export default class Landing extends Vue {
    carbonBranches : any[] = [];
    availableStreams : string[] = [];
    branchData : any[] = []
    token = "";
    itemsPerPage = 8
    search = ''
    filter = {}
    sortdesc = false
    page = 1
    keys = [
      'title',
      'category'
    ]
    projects : any[] = [];
    meta = [
      {
        title: "Super great project",
        id: 1,
        co2Values: [
          {
            label: "some value 1",
            value: 50,
          },
          {
            label: "some value 2",
            value: 20,
          },
          {
            label: "some value 3",
            value: 10,
          },
        ],
        link: "",
        category: "Superstructure",
      },
      {
        title: "Imaginary project 3",
        id: 2,
        co2Values: [
          {
            label: "some value 1",
            value: 50,
          },
          {
            label: "some value 2",
            value: 20,
          },
          {
            label: "some value 3",
            value: 10,
          },
        ],
        link: "",
        category: "Substructure",
      },
      {
        title: "Some other project",
        id: 3,
        co2Values: [
          {
            label: "some value 1",
            value: 50,
          },
          {
            label: "some value 2",
            value: 20,
          },
          {
            label: "some value 3",
            value: 10,
          },
        ],
        link: "",
        category: "Services",
      },
      {
        title: "Some other project",
        id: 4,
        co2Values: [
          {
            label: "some value 1",
            value: 50,
          },
          {
            label: "some value 2",
            value: 20,
          },
          {
            label: "some value 3",
            value: 10,
          },
        ],
        link: "",
        category: "Services",
      },
      {
        title: "Some other project",
        id: 5,
        co2Values: [
          {
            label: "some value 1",
            value: 50,
          },
          {
            label: "some value 2",
            value: 20,
          },
          {
            label: "some value 3",
            value: 10,
          },
        ],
        link: "",
        category: "Services",
      },
    ]

  get numberOfPages () {
    const items = this.projects.length
    return Math.ceil(items / this.itemsPerPage)
  }

  nextPage () {
    if (this.page + 1 <= this.numberOfPages) this.page += 1
  }

  formerPage () {
    if (this.page - 1 >= 1) this.page -= 1
  }
  
  mounted() {
    this.token = this.$store.state.token.token;
    this.loadStreams()
    }

    async loadStreams(){
    const streams = await this.$store.dispatch("getUserStreams")
    const streamID = streams.data.user.streams.items.map((stream : any) => {
      return { name: stream.name, id: stream.id }
    })
    const streamBranches  : any[] = [];
    for (let i = 0; i< streamID.length; i++) {
    const branches = await this.$store.dispatch("getStreamBranches", streamID[i].id)
    streamBranches.push([branches, streamID[i]])
    }
    for (let i = 0; i< streamBranches.length; i++) {
    streamBranches[i][0].data.stream.branches.items.forEach((branch : any) => {
      if(branch.name === 'actcarbonreport') {
      this.carbonBranches.push(streamBranches[i][1])
      }
    })
    }
    for (let i = 0; i< this.carbonBranches.length; i++){
    const branch = await this.$store.dispatch("getBranchData", this.carbonBranches[i].id)
    console.log(branch, 'branch')
    const id = JSON.stringify(this.carbonBranches[i].id);
    if (!Object.prototype.hasOwnProperty.call(branch, 'errors')){
    this.branchData.push({ id : this.carbonBranches[i].id, name: this.carbonBranches[i].name, data: branch })
    }
    }
    const co2Obj: {[key: string]: number} = {}
    this.projects = this.branchData.map((proj) => {
      const children = proj.data.data.stream.object.children.objects
        children.forEach((material : any) => {
        const materialValue = (parseFloat(material.data.act.reportData.productStageCarbonA1A3) +
          parseFloat(material.data.act.reportData.transportCarbonA4) +
          parseFloat(material.data.act.reportData.constructionCarbonA5.site) +
          parseFloat(material.data.act.reportData.constructionCarbonA5.value) +
          parseFloat(material.data.act.reportData.constructionCarbonA5.waste))
        const materialKey = material.data.act.formData.material.name
        if (Object.prototype.hasOwnProperty.call(co2Obj, materialKey)){
        co2Obj[materialKey] += materialValue
        } else {
        co2Obj[materialKey] = materialValue
        }
        })
      console.log(co2Obj, "<<<")
      const co2Arr = Object.entries(co2Obj)
      const co2Data = co2Arr.map((obj) => {
        return {
            label: obj[0],
            value: obj[1],
          }
        })
    return {
        title: `${proj.name}`,
        id: `${proj.id}`,
        co2Values: co2Data ,
        totalCO2e: `${proj.data.data.stream.object.data.totalCO2}`,
        link: "",
        category: `${proj.data.data.stream.object.data.projectData.component}`,
    }
    })
  }
}
</script>
<style scoped>
.titles {
  width: 70%;
}
.page {
  margin-left: 4rem;
  margin-right: 4rem;
}

.grid {
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  column-gap: 1rem;
  row-gap: 1rem;
}
</style>
