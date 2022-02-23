import {
  getBranchData,
  getActReportBranchInfo,
} from "@/store/speckle/speckleUtil";

export function extractCo2Data(branchData: any) {
  const levels = {
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

  const co2Obj: {
    [key: string]: { value: number; color: string; id: string };
  } = {};
  branchData.data.stream.object.children.objects.forEach((object: any) => {
    levels.levels[0].kgCO2e += parseFloat(
      object.data.act.reportData.productStageCarbonA1A3
    );
    levels.levels[0].tCO2e +=
      parseFloat(object.data.act.reportData.productStageCarbonA1A3) / 1000;
    levels.levels[1].kgCO2e += parseFloat(
      object.data.act.reportData.transportCarbonA4
    );
    levels.levels[1].tCO2e +=
      parseFloat(object.data.act.reportData.transportCarbonA4) / 1000;
    levels.levels[2].kgCO2e += parseFloat(
      object.data.act.reportData.constructionCarbonA5.value
    );
    levels.levels[2].tCO2e +=
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
        id: object.data.act.speckle_type,
      };
    } else {
      co2Obj[materialKey] = {
        value: totalObjectCarbon,
        color: materialColor,
        id: object.data.act.speckle_type,
      };
    }
  });
  const co2Arr = Object.entries(co2Obj);
  const materials = co2Arr.map((obj) => {
    return {
      label: obj[0],
      value: obj[1].value,
      color: obj[1].color,
    };
  });

  const colors = co2Arr.map((obj) => {
    return {
      id: obj[1].id,
      color: obj[1].color,
    };
  });
  return { levels, materials, colors };
}

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

  const co2Data = extractCo2Data(branchData);

  const levelsUpdated = co2Data.levels;

  const materialBreakdownUpdated = {
    materials: co2Data.materials,
  };

  levelsUpdated.levels[0].kgCO2e = Math.ceil(levelsUpdated.levels[0].kgCO2e);
  levelsUpdated.levels[0].tCO2e = Math.ceil(levelsUpdated.levels[0].tCO2e);
  levelsUpdated.levels[1].kgCO2e = Math.ceil(levelsUpdated.levels[1].kgCO2e);
  levelsUpdated.levels[1].tCO2e = Math.ceil(levelsUpdated.levels[1].tCO2e);
  levelsUpdated.levels[2].kgCO2e = Math.ceil(levelsUpdated.levels[2].kgCO2e);
  levelsUpdated.levels[2].tCO2e = Math.ceil(levelsUpdated.levels[2].tCO2e);

  return {
    ready: true,
    colors: co2Data.colors,
    data: {
      streamId: streamId,
      projectInfo: projectInfoUpdated,
      materialBreakdown: materialBreakdownUpdated,
      aBreakdown: levelsUpdated,
    },
  };
}
