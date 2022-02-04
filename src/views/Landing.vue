<template>
  <v-main class="page">
    <landing-header />
    <v-container v-if="!loading && !error">
      <v-data-iterator
        :items="displayProjects"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        hide-default-footer
      >
        <template v-slot:header>
          <landing-search :projects="projects" @projectSearch="projectSearch" />
        </template>
        <template v-slot:default="props" class="my-2">
          <v-row>
            <v-col cols="12" md="6" lg="4" v-if="page === 1">
              <new-assessment-card />
            </v-col>
            <v-col
              v-for="item in props.items"
              :key="item.id"
              cols="12"
              md="6"
              lg="4"
            >
              <project-card :project="item" :becs="becs"></project-card>
            </v-col>
          </v-row>
        </template>
        <template v-slot:footer>
          <landing-footer
            :numberOfPages="numberOfPages"
            :page="page"
            @formerPage="formerPage"
            @nextPage="nextPage"
          />
        </template>
      </v-data-iterator>
    </v-container>
    <div
      v-else-if="loading && !error"
      style="width: 100%"
      class="d-flex justify-center"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        :size="200"
      ></v-progress-circular>
    </div>
    <div v-else>
      <landing-error @retry="loadStreams" />
    </div>
  </v-main>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProjectCard from "@/components/landing/ProjectCard.vue";
import NewAssessmentCard from "@/components/landing/NewAssessmentCard.vue";
import LandingHeader from "@/components/landing/LandingHeader.vue";
import LandingFooter from "@/components/landing/LandingFooter.vue";
import LandingSearch from "@/components/landing/LandingSearch.vue";
import LandingError from "@/components/landing/LandingError.vue";
import { Project } from "@/models/project";
import { BEC } from "@/store/utilities/BECs";

@Component({
  components: {
    ProjectCard,
    NewAssessmentCard,
    LandingHeader,
    LandingFooter,
    LandingSearch,
    LandingError,
  },
})
export default class Landing extends Vue {
  carbonBranches: any[] = [];
  branchData: any[] = [];
  token = "";
  itemsPerPage = 8;
  search = "";
  page = 1;
  displayProjects: Project[] = [];
  projects: Project[] = [];
  loading = true;
  becs: BEC[] = [];
  error = false;

  async mounted() {
    this.token = this.$store.state.token.token;
    this.loadStreams();
    this.becs = await this.$store.dispatch("getBECs");
  }

  get numberOfPages() {
    const items = this.projects.length;
    return Math.ceil(items / this.itemsPerPage);
  }

  nextPage() {
    if (this.page + 1 <= this.numberOfPages) this.page += 1;
  }

  formerPage() {
    if (this.page - 1 >= 1) this.page -= 1;
  }

  projectSearch(project: Project | undefined) {
    if (project) {
      this.displayProjects = [project];
    } else {
      this.displayProjects = this.projects;
    }
  }

  async loadStreams() {
    try {
      const streams = await this.$store.dispatch("getUserStreams");
      const streamID = streams.data.user.streams.items.map((stream: any) => {
        return { name: stream.name, id: stream.id };
      });
      const streamBranches: any[] = [];
      for (let i = 0; i < streamID.length; i++) {
        const branches = await this.$store.dispatch(
          "getStreamBranches",
          streamID[i].id
        );
        streamBranches.push([branches, streamID[i]]);
      }
      for (let i = 0; i < streamBranches.length; i++) {
        streamBranches[i][0].data.stream.branches.items.forEach(
          (branch: any) => {
            if (branch.name === "actcarbonreport") {
              this.carbonBranches.push(streamBranches[i][1]);
            }
          }
        );
      }
      for (let i = 0; i < this.carbonBranches.length; i++) {
        const branchCommit = await this.$store.dispatch(
          "getStreamCommit",
          streamBranches[i][1].id
        );
        var carbonCommit = "";
        if (branchCommit.data.stream.branch) {
          carbonCommit =
            branchCommit.data.stream.branch.commits.items[0].referencedObject;
        }
        const branch = await this.$store.dispatch("getBranchData", [
          this.carbonBranches[i].id,
          carbonCommit,
        ]);
        if (!Object.prototype.hasOwnProperty.call(branch, "errors")) {
          this.branchData.push({
            id: this.carbonBranches[i].id,
            name: this.carbonBranches[i].name,
            data: branch,
          });
        }
      }
      const co2Obj: {
        [key: string]: { value: number; color: string };
      } = {};
      this.projects = this.branchData.map((proj) => {
        const children = proj.data.data.stream.object.children.objects;
        children.forEach((material: any) => {
          const materialValue =
            parseFloat(material.data.act.reportData.productStageCarbonA1A3) +
            parseFloat(material.data.act.reportData.transportCarbonA4) +
            parseFloat(material.data.act.reportData.constructionCarbonA5.site) +
            parseFloat(
              material.data.act.reportData.constructionCarbonA5.value
            ) +
            parseFloat(material.data.act.reportData.constructionCarbonA5.waste);
          const materialKey = material.data.act.formData.material.name;
          const materialColor = material.data.act.formData.material.color;
          if (Object.prototype.hasOwnProperty.call(co2Obj, materialKey)) {
            co2Obj[materialKey] = {
              value: co2Obj[materialKey].value + materialValue,
              color: materialColor,
            };
          } else {
            co2Obj[materialKey] = {
              value: materialValue,
              color: materialColor,
            };
          }
        });
        const co2Arr = Object.entries(co2Obj);
        const co2Data = co2Arr.map((obj) => {
          return {
            label: obj[0],
            value: obj[1].value,
            color: obj[1].color,
          };
        });
        return {
          title: `${proj.name}`,
          id: `${proj.id}`,
          co2Values: co2Data,
          totalCO2e: proj.data.data.stream.object.data.totalCO2,
          link: "",
          category: `${proj.data.data.stream.object.data.projectData.component}`,
        };
      });

      this.displayProjects = this.projects;
      this.loading = false;
    } catch (err) {
      this.error = true;
      this.loading = false;
    }
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
