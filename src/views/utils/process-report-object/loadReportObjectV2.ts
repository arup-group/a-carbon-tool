import { ActReportData } from "@/models/graphql/";
import {
  ChildSpeckleObjectData,
  HTTPStreamDataParentV2,
} from "@/models/graphql/StreamData.interface";
import { IProjectInfo, LoadStreamOut } from "./models";
import { getChildren } from "./utils";

export async function calcV2(
  branchData: HTTPStreamDataParentV2,
  actReportBranchInfo: ActReportData,
  streamId: string,
  context: any,
  includeChildren?: boolean
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

  const floorArea = branchData.projectData.floorArea;
  let children: ChildSpeckleObjectData[] = [];
  const modelId = branchData["@model"][0].referencedId;

  if (includeChildren) {
    children = await getChildren(
      context.state.selectedServer.url,
      context.state.token.token,
      streamId,
      branchData
    );
      children = children.filter(c => c.id != modelId);
      console.log("children:", children);
  }

  return {
    ready: true,
    colors: branchData.materialsColors,
    data: {
      streamId: streamId,
      modelId,
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
