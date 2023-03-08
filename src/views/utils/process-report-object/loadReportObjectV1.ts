import { ActReportData, HTTPStreamDataParent } from "@/models/graphql/";
import {
  ChildSpeckleObjectData,
  HTTPStreamDataParentV1,
} from "@/models/graphql/StreamData.interface";
import { Color } from "@/models/renderer";
import {
  IABreakdown,
  IMaterialBreakdown,
  IProjectInfo,
  LoadStreamOut,
} from "./models";
import { getChildren } from "./utils";
import * as speckleUtil from "../../../store/speckle/speckleUtil";
import { IdMapper } from "../add-params/addParams";

export async function calcV1(
  branchData: HTTPStreamDataParentV1,
  actReportBranchInfo: ActReportData,
  context: any,
  streamId: string
): Promise<LoadStreamOut> {
  const projectInfoUpdated: IProjectInfo = {
    name: branchData.projectData.name,
    components: branchData.projectData.components,
    reportDate: new Date(
      actReportBranchInfo.data.stream.branch.commits.items[0].createdAt
    ),
    author: actReportBranchInfo.data.stream.branch.commits.items[0].authorName,
    jobNumber: branchData.projectData.jobNumber,
    cost: branchData.projectData.cost,
    floorArea: branchData.projectData.floorArea,
    notes: branchData.projectData.notes,
    totalCO2e: Math.round((branchData.totalCO2 / 1000) * 100) / 100,
    totalkgCO2e: Math.floor(branchData.totalCO2),
    region: branchData.projectData.region,
    volume: branchData.volume,
  };

  const childrenData = await getChildren<ChildSpeckleObjectData>(
    context.state.selectedServer.url,
    context.state.token.token,
    streamId,
    branchData
  );

  const co2Data = extractCo2Data(branchData, childrenData);

  const levelsUpdated: IABreakdown = co2Data.levels;

  const materialBreakdownUpdated: IMaterialBreakdown = {
    materials: co2Data.materials,
  };

  levelsUpdated.levels[0].kgCO2eperm2 = Math.ceil(
    levelsUpdated.levels[0].kgCO2eperm2
  );
  levelsUpdated.levels[0].tCO2e =
    Math.ceil(levelsUpdated.levels[0].tCO2e * 100) / 100;
  levelsUpdated.levels[1].kgCO2eperm2 = Math.ceil(
    levelsUpdated.levels[1].kgCO2eperm2
  );
  levelsUpdated.levels[1].tCO2e =
    Math.ceil(levelsUpdated.levels[1].tCO2e * 100) / 100;
  levelsUpdated.levels[2].kgCO2eperm2 = Math.ceil(
    levelsUpdated.levels[2].kgCO2eperm2
  );
  levelsUpdated.levels[2].tCO2e =
    Math.ceil(levelsUpdated.levels[2].tCO2e * 100) / 100;

  const objectIds = await speckleUtil.getStreamObjects(context, streamId);
  const modelId = objectIds.data.stream.branch.commits.items[0].referencedObject;

  return {
    ready: true,
    colors: co2Data.colors,
    version: "v1",
    data: {
      streamId: streamId,
      modelId,
      projectInfo: projectInfoUpdated,
      materialBreakdown: materialBreakdownUpdated,
      aBreakdown: levelsUpdated,
      children: childrenData,
      idMapper: {} as IdMapper
    },
  };
}

export function extractCo2Data(
  branchData: HTTPStreamDataParent,
  children: ChildSpeckleObjectData[]
) {
  const levels = {
    levels: [
      {
        name: "A1-A3",
        tCO2e: 0,
        kgCO2eperm2: 0,
      },
      {
        name: "A4",
        tCO2e: 0,
        kgCO2eperm2: 0,
      },
      {
        name: "A5",
        tCO2e: 0,
        kgCO2eperm2: 0,
      },
    ],
  };

  const floorArea = branchData.projectData.floorArea;

  const co2Obj: {
    [key: string]: { value: number; color: string; id: string };
  } = {};
  const colorsArr: Color[] = [];
  children.forEach((object) => {
    levels.levels[0].kgCO2eperm2 +=
      object.act.reportData.productStageCarbonA1A3 / floorArea;
    levels.levels[0].tCO2e +=
      object.act.reportData.productStageCarbonA1A3 / 1000;
    levels.levels[1].kgCO2eperm2 +=
      object.act.reportData.transportCarbonA4 / floorArea;
    levels.levels[1].tCO2e += object.act.reportData.transportCarbonA4 / 1000;
    levels.levels[2].kgCO2eperm2 +=
      object.act.reportData.constructionCarbonA5.value / floorArea;
    levels.levels[2].tCO2e +=
      object.act.reportData.constructionCarbonA5.value / 1000;

    const totalObjectCarbon =
      object.act.reportData.productStageCarbonA1A3 +
      object.act.reportData.transportCarbonA4 +
      object.act.reportData.constructionCarbonA5.value;

    const materialKey = object.act.formData.material.name;
    const materialColor = object.act.formData.material.color;
    if (Object.prototype.hasOwnProperty.call(co2Obj, materialKey)) {
      co2Obj[materialKey] = {
        value: co2Obj[materialKey].value + totalObjectCarbon,
        color: materialColor,
        id: object.act.speckle_type,
      };
    } else {
      co2Obj[materialKey] = {
        value: totalObjectCarbon,
        color: materialColor,
        id: object.act.speckle_type,
      };
    }
    colorsArr.push({
      id: object.act.id,
      color: object.act.formData.material.color,
    });
  });
  const co2Arr = Object.entries(co2Obj);
  const materials = co2Arr.map((obj) => {
    return {
      label: obj[0],
      value: obj[1].value,
      color: obj[1].color,
    };
  });
  const colors = colorsArr;
  return { levels, materials, colors };
}
