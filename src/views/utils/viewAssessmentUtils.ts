import {
  getBranchData,
  getActReportBranchInfo,
} from "@/store/speckle/speckleUtil";

export async function loadStream(context: any, streamId: string) {
  const actReportBranchInfo = await getActReportBranchInfo(context, streamId);

  const branchData = await getBranchData(
    context,
    streamId,
    actReportBranchInfo.data.stream.branch.commits.items[0].referencedObject
  );

  const projectInfoUpdated = {
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

  const co2Obj: { [key: string]: { value: number; color: string } } = {};
  branchData.data.stream.object.children.objects.forEach((object: any) => {
    levelsUpdated.levels[0].kgCO2e += parseFloat(
      object.data.act.reportData.productStageCarbonA1A3
    );
    levelsUpdated.levels[0].tCO2e +=
      parseFloat(object.data.act.reportData.productStageCarbonA1A3) / 1000;
    levelsUpdated.levels[1].kgCO2e += parseFloat(
      object.data.act.reportData.transportCarbonA4
    );
    levelsUpdated.levels[1].tCO2e +=
      parseFloat(object.data.act.reportData.transportCarbonA4) / 1000;
    levelsUpdated.levels[2].kgCO2e += parseFloat(
      object.data.act.reportData.constructionCarbonA5.value
    );
    levelsUpdated.levels[2].tCO2e +=
      parseFloat(object.data.act.reportData.constructionCarbonA5.value) / 1000;

    const totalObjectCarbon =
      parseFloat(object.data.act.reportData.productStageCarbonA1A3) +
      parseFloat(object.data.act.reportData.transportCarbonA4) +
      parseFloat(object.data.act.reportData.constructionCarbonA5.value);

    const materialKey = object.data.act.formData.material.name;
    const materialColor = object.data.act.formData.material.color;
    if (Object.prototype.hasOwnProperty.call(co2Obj, materialKey)) {
      co2Obj[materialKey] = {
        value: co2Obj[materialKey].value + totalObjectCarbon,
        color: materialColor,
      };
    } else {
      co2Obj[materialKey] = {
        value: totalObjectCarbon,
        color: materialColor,
      };
    }
  });

  const co2Arr = Object.entries(co2Obj);
  const materials = co2Arr.map((obj) => {
    return {
      name: obj[0],
      value: obj[1].value,
      color: obj[1].color,
    };
  });

  const materialBreakdownUpdated = {
    materials,
  };

  levelsUpdated.levels[0].kgCO2e = Math.ceil(levelsUpdated.levels[0].kgCO2e);
  levelsUpdated.levels[0].tCO2e = Math.ceil(levelsUpdated.levels[0].tCO2e);
  levelsUpdated.levels[1].kgCO2e = Math.ceil(levelsUpdated.levels[1].kgCO2e);
  levelsUpdated.levels[1].tCO2e = Math.ceil(levelsUpdated.levels[1].tCO2e);
  levelsUpdated.levels[2].kgCO2e = Math.ceil(levelsUpdated.levels[2].kgCO2e);
  levelsUpdated.levels[2].tCO2e = Math.ceil(levelsUpdated.levels[2].tCO2e);

  return {
    ready: true,
    data: {
      streamId: streamId,
      projectInfo: projectInfoUpdated,
      materialBreakdown: materialBreakdownUpdated,
      aBreakdown: levelsUpdated,
    },
  };
}
