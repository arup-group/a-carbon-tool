import { Level } from "@/models/assessment";
import { ChartData } from "@/models/chart";
import { ActReportData, HTTPStreamDataParent } from "@/models/graphql/";
import {
  ChildSpeckleObjectData,
  HTTPStreamDataParentV1,
  HTTPStreamDataParentV2,
  instanceOfHttpStreamDataParentV1,
  instanceOfHttpStreamDataParentV2,
} from "@/models/graphql/StreamData.interface";
import { ProjectComponent } from "@/models/newAssessment/projectData.interface";
import { Color } from "@/models/renderer";
import { getActReportBranchInfo } from "@/store/speckle/speckleUtil";

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

export async function loadParent(
  url: string,
  streamId: string,
  parentId: string,
  token: string
): Promise<HTTPStreamDataParent> {
  return await fetch(`${url}/objects/${streamId}/${parentId}/single`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((d) => d.json());
}

export interface IProjectInfo {
  name: string;
  components: ProjectComponent[];
  reportDate: Date;
  author: string;
  jobNumber: string;
  cost: number;
  floorArea: number;
  notes: string;
  totalCO2e: number;
  totalkgCO2e: number;
  region: string;
  volume: number;
}
export interface IMaterialBreakdown {
  materials: ChartData[];
}
export interface IABreakdown {
  levels: Level[];
}
export interface ILoadStreamData {
  streamId: string;
  projectInfo: IProjectInfo;
  materialBreakdown: IMaterialBreakdown;
  aBreakdown: IABreakdown;
  children: ChildSpeckleObjectData[];
}

export interface LoadStreamOut {
  ready: boolean;
  colors: Color[];
  data: ILoadStreamData;
}

export async function loadStream(
  context: any,
  streamId: string,
  branchName: string,
  includeChildren?: boolean
): Promise<LoadStreamOut> {
  const actReportBranchInfo = await getActReportBranchInfo(
    context,
    streamId,
    branchName
  );
  const parentId =
    actReportBranchInfo.data.stream.branch.commits.items[0].referencedObject;

  const branchData = await loadParent(
    context.state.selectedServer.url,
    streamId,
    parentId,
    context.state.token.token
  );

  if (instanceOfHttpStreamDataParentV1(branchData)) {
    return calcV1(branchData, actReportBranchInfo, context, streamId);
  } else if (instanceOfHttpStreamDataParentV2(branchData)) {
    console.log(`${streamId} using v2`);
    return calcV2(
      branchData,
      actReportBranchInfo,
      streamId,
      context,
      includeChildren
    );
  } else {
    throw new Error("report object corrupted");
  }
}

async function calcV2(
  branchData: HTTPStreamDataParentV2,
  actReportBranchInfo: ActReportData,
  streamId: string,
  context: any,
  includeChildren?: boolean
): Promise<LoadStreamOut> {
  // if (!quick) {
  //   console.log("slow :(")
  //   return calcV1(branchData, actReportBranchInfo, context, streamId);
  // }
  // const old = await calcV1(branchData, actReportBranchInfo, context, streamId);
  // console.log("v1 branchData:", old);
  console.log("branchData:", branchData);
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

  // const colors: Color[] = branchData.materials.map((m) => ({
  //   id: branchData.id,
  //   color: m.color,
  // }));
  const floorArea = branchData.projectData.floorArea;
  let children: ChildSpeckleObjectData[] = [];

  console.log("includeChildren?", includeChildren);
  if (includeChildren)
    children = await getChildren(
      context.state.selectedServer.url,
      context.state.token.token,
      streamId,
      branchData
    );

  return {
    ready: true,
    colors: branchData.materialsColors,
    data: {
      streamId: streamId,
      projectInfo: projectInfoUpdated,
      materialBreakdown: {
        materials: branchData.materials,
      },
      aBreakdown: {
        levels: [
          {
            name: "A1-A3",
            tCO2e:
              Math.ceil((branchData.productStageCarbonA1A3 / 1000) * 100) / 100,
            kgCO2eperm2: Math.ceil(
              branchData.productStageCarbonA1A3 / floorArea
            ),
          },
          {
            name: "A4",
            tCO2e: Math.ceil((branchData.transportCarbonA4 / 1000) * 100) / 100,
            kgCO2eperm2: Math.ceil(branchData.transportCarbonA4 / floorArea),
          },
          {
            name: "A5",
            tCO2e:
              Math.ceil((branchData.constructionCarbonA5.value / 1000) * 100) /
              100,
            kgCO2eperm2: Math.ceil(
              branchData.constructionCarbonA5.value / floorArea
            ),
          },
        ],
      },
      children,
    },
  };
}

async function calcV1(
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

  const childrenData = await getChildren(
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

  return {
    ready: true,
    colors: co2Data.colors,
    data: {
      streamId: streamId,
      projectInfo: projectInfoUpdated,
      materialBreakdown: materialBreakdownUpdated,
      aBreakdown: levelsUpdated,
      children: childrenData,
    },
  };
}

export async function getChildren(
  url: string,
  token: string,
  streamId: string,
  parent: HTTPStreamDataParent
): Promise<ChildSpeckleObjectData[]> {
  // get the id's of the children objects
  const children: string[] = Object.keys(parent.__closure);

  // split down the children array into multiple arrays of max length 1000
  const childrenSplit: string[][] = [];
  for (let i = 0; i < children.length; i += 1000) {
    childrenSplit.push(children.slice(i, Math.min(i + 1000, children.length)));
  }

  // get the data from the children objects, running one request per 1000 objects
  return await Promise.all(
    childrenSplit.map(async (cs) => {
      return fetch(`${url}/api/getobjects/${streamId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ objects: JSON.stringify(cs) }),
      }).then((res) => res.json());
    })
  ).then((data) => {
    const arr: ChildSpeckleObjectData[] = [];
    data.forEach((d) => {
      arr.push(...d);
    });
    return arr;
  });
}
