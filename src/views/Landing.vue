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
import { Vue, Component } from "vue-property-decorator";
import ProjectCard from "../components/ProjectCard.vue";
import { Project } from "@/models/project";

@Component ({ components: {ProjectCard} })

export default class Landing extends Vue {
  
    itemsPerPage = 8
    search = ''
    filter = {}
    sortdesc = false
    page = 1
    keys = [
      'title',
      'category'
    ]
    projects = [
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
