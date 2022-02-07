<template>
  <v-container class="d-flex justify-space-between pt-5 container">
    <div class="d-flex flex-column justify-space-between card-container">
      <project-info-card class="card" :projectInfo="projectInfo" />
      <view-assessment-buttons class="card" />
    </div>
    <Renderer
      v-if="urlsLoaded"
      :objecturls="objectUrls"
      :token="token"
      class="renderer"
    />
    <div class="d-flex flex-column justify-space-between card-container">
      <a-breakdown-card class="card" :aBreakdown="aBreakdown" />
      <material-breakdown-card
        class="card"
        :materialBreakdown="materialBreakdown"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AssessmentComplete } from "@/models/assessment";

import Renderer from "@/components/Renderer.vue";
import ProjectInfoCard from "@/components/ProjectInfoCard.vue";
import ABreakdownCard from "@/components/ABreakdownCard.vue";
import MaterialBreakdownCard from "@/components/MaterialBreakdownCard.vue";
import ViewAssessmentButtons from "@/components/ViewAssessmentButtons.vue";

@Component({
  components: {
    Renderer,
    ProjectInfoCard,
    ABreakdownCard,
    MaterialBreakdownCard,
    ViewAssessmentButtons,
  },
})
export default class ViewAssessment extends Vue {
  objectUrls: string[] = [];
  token!: string;

  mounted() {
    this.$store
      .dispatch("getObjectUrls", this.assessment.streamId)
      .then((res: string[]) => {
        this.objectUrls = res;
      });

    this.token = this.$store.state.token.token;
  }

  created() {
    this.loadStream(this.$route.params.streamId);
  }

  async loadStream(streamId: string) {
    const actReportBranchInfo = await this.$store.dispatch(
      "getActReportBranchInfo",
      streamId
    );
    console.log(actReportBranchInfo.data.stream.branch.commits.items[0]);

    const branchData = await this.$store.dispatch("getBranchData", [
      streamId,
      actReportBranchInfo.data.stream.branch.commits.items[0].referencedObject,
    ]);

    this.assessment.projectInfo = {
      name: branchData.data.stream.object.data.projectData.name,
      type: branchData.data.stream.object.data.projectData.component,
      reportDate: new Date(
        actReportBranchInfo.data.stream.branch.commits.items[0].createdAt
      ),
      author:
        actReportBranchInfo.data.stream.branch.commits.items[0].authorName,
      JN: "000001",
      systemCost: branchData.data.stream.object.data.projectData.cost,
      floorArea: branchData.data.stream.object.data.projectData.floorArea,
      notes: "",
      totalCO2e: Math.floor(branchData.data.stream.object.data.totalCO2 / 1000),
      totalkgCO2e: Math.floor(branchData.data.stream.object.data.totalCO2),
    };

    const levelsUpdated = {
      levels: [
        {
          name: "A1-A3",
          tCO2e: 0,
          kgCO2e: 0,
        },
        {
          name: "A4",
          tCO2e: 0,
          kgCO2e: 0,
        },
        {
          name: "A5",
          tCO2e: 0,
          kgCO2e: 0,
        },
      ],
    };

    const materialBreakdownUpdated = {
      materials: [
        {
          name: branchData.data.stream.object.children.objects[0].data.act
            .formData.material.name,
          value: 0,
        },
      ],
    };

    // console.log(branchData);
    branchData.data.stream.object.children.objects.forEach((object: any) => {
      console.log(object);
      levelsUpdated.levels[0].kgCO2e +=
        object.data.act.reportData.productStageCarbonA1A3;
      levelsUpdated.levels[0].tCO2e +=
        object.data.act.reportData.productStageCarbonA1A3 / 1000;
      levelsUpdated.levels[1].kgCO2e +=
        object.data.act.reportData.transportCarbonA4;
      levelsUpdated.levels[1].tCO2e +=
        object.data.act.reportData.transportCarbonA4 / 1000;
      levelsUpdated.levels[2].kgCO2e +=
        object.data.act.reportData.constructionCarbonA5.site;
      levelsUpdated.levels[2].tCO2e +=
        object.data.act.reportData.constructionCarbonA5.site / 1000;

      var totalObjectCarbon =
        object.data.act.reportData.productStageCarbonA1A3 +
        object.data.act.reportData.transportCarbonA4 +
        object.data.act.reportData.constructionCarbonA5.site;

      var needToAddMaterial = false;

      materialBreakdownUpdated.materials.forEach((material: any) => {
        if ("name" in material) {
          console.log("it found a materialk");
          if (material.name === object.data.act.formData.material.name) {
            material.value += totalObjectCarbon;
          }
        } else {
          needToAddMaterial = true;
        }
      });

      if (needToAddMaterial)
        materialBreakdownUpdated.materials.push({
          name: object.data.act.formData.material.name,
          value: totalObjectCarbon,
        });
    });

    levelsUpdated.levels[0].kgCO2e = Math.ceil(levelsUpdated.levels[0].kgCO2e);
    levelsUpdated.levels[0].tCO2e = Math.ceil(levelsUpdated.levels[0].tCO2e);
    levelsUpdated.levels[1].kgCO2e = Math.ceil(levelsUpdated.levels[1].kgCO2e);
    levelsUpdated.levels[1].tCO2e = Math.ceil(levelsUpdated.levels[1].tCO2e);
    levelsUpdated.levels[2].kgCO2e = Math.ceil(levelsUpdated.levels[2].kgCO2e);
    levelsUpdated.levels[2].tCO2e = Math.ceil(levelsUpdated.levels[2].tCO2e);

    this.assessment.aBreakdown = levelsUpdated;
    console.log(materialBreakdownUpdated);
    this.assessment.materialBreakdown = materialBreakdownUpdated;
  }

  get urlsLoaded() {
    return this.objectUrls.length > 0;
  }
  get projectInfo() {
    return this.assessment.projectInfo;
  }
  get aBreakdown() {
    return this.assessment.aBreakdown;
  }
  get materialBreakdown() {
    return this.assessment.materialBreakdown;
  }
  get streamId() {
    return this.$route.params.streamId;
  }

  assessment: AssessmentComplete = {
    // dummy data
    streamId: this.$route.params.streamId,
    projectInfo: {
      name: "",
      type: "",
      reportDate: new Date(1946, 4, 1),
      author: "",
      JN: "000001",
      systemCost: 0,
      floorArea: 0,
      notes: "",
      totalCO2e: 0,
      totalkgCO2e: 0,
    },
    materialBreakdown: {
      materials: [
        {
          name: "some value 1",
          value: 50,
        },
        {
          name: "some value 2",
          value: 20,
        },
        {
          name: "some value 3",
          value: 10,
        },
      ],
    },
    aBreakdown: {
      levels: [
        {
          name: "A1-A3",
          tCO2e: 0,
          kgCO2e: 0,
        },
        {
          name: "A4",
          tCO2e: 0,
          kgCO2e: 0,
        },
        {
          name: "A5",
          tCO2e: 0,
          kgCO2e: 0,
        },
      ],
    },
  };
}
</script>

<style scoped>
.renderer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.card {
  position: relative;
  z-index: 1;
}
.container {
  height: 80vh;
}
.card-container {
  width: 25%;
  min-width: 20rem;
}
</style>
