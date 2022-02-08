export async function loadStream(context: any, streamId: string) {
  const actReportBranchInfo = await this.$store.dispatch(
    "getActReportBranchInfo",
    streamId
  );
  // console.log(actReportBranchInfo.data.stream.branch.commits.items[0]);

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
    author: actReportBranchInfo.data.stream.branch.commits.items[0].authorName,
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
    // console.log(object);
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
        // console.log("it found a material");
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

  console.log("---> levels updated \n", levelsUpdated);
  this.assessment.aBreakdown = levelsUpdated;
  console.log("---> material breakdown \n", materialBreakdownUpdated);
  this.assessment.materialBreakdown = materialBreakdownUpdated;

  return {
    streamId: streamId,
    projectInfo: projectInfoUpdated,
    materialBreakdown: materialBreakdownUpdated,
    aBreakdown: levelsUpdated,
  };
}
