import { getActReportBranchInfo } from "@/store/speckle/speckleUtil";

export function extractCo2Data(branchData: any, children: any[]) {
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
  children.forEach((object: any) => {
    levels.levels[0].kgCO2eperm2 +=
      parseFloat(object.act.reportData.productStageCarbonA1A3) / floorArea;
    levels.levels[0].tCO2e +=
      parseFloat(object.act.reportData.productStageCarbonA1A3) / 1000;
    levels.levels[1].kgCO2eperm2 +=
      parseFloat(object.act.reportData.transportCarbonA4) / floorArea;
    levels.levels[1].tCO2e +=
      parseFloat(object.act.reportData.transportCarbonA4) / 1000;
    levels.levels[2].kgCO2eperm2 +=
      parseFloat(object.act.reportData.constructionCarbonA5.value) / floorArea;
    levels.levels[2].tCO2e +=
      parseFloat(object.act.reportData.constructionCarbonA5.value) / 1000;

    const totalObjectCarbon =
      parseFloat(object.act.reportData.productStageCarbonA1A3) +
      parseFloat(object.act.reportData.transportCarbonA4) +
      parseFloat(object.act.reportData.constructionCarbonA5.value);

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
  const parentId =
    actReportBranchInfo.data.stream.branch.commits.items[0].referencedObject;

  const branchData = await fetch(
    `${context.state.selectedServer.url}/objects/${streamId}/${parentId}/single`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.state.token.token}`,
      },
    }
  ).then((d) => d.json());

  const projectInfoUpdated = {
    name: branchData.projectData.name,
    type: branchData.projectData.components,
    reportDate: new Date(
      actReportBranchInfo.data.stream.branch.commits.items[0].createdAt
    ),
    author: actReportBranchInfo.data.stream.branch.commits.items[0].authorName,
    JN: "000001",
    systemCost: branchData.projectData.cost,
    floorArea: branchData.projectData.floorArea,
    notes: "",
    totalCO2e: Math.round((branchData.totalCO2 / 1000) * 100) / 100,
    totalkgCO2e: Math.floor(branchData.totalCO2),
  };

  const childrenData = await getChildren(context, streamId, branchData);

  const co2Data = extractCo2Data(branchData, childrenData);

  const levelsUpdated = co2Data.levels;

  const materialBreakdownUpdated = {
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
    },
  };
}

async function getChildren(
  context: any,
  streamId: string,
  parent: any
): Promise<any[]> {
  // get the id's of the children objects
  const children: string[] = Object.keys(parent.__closure);

  // split down the children array into multiple arrays of max length 1000
  const childrenSplit: string[][] = [];
  for (let i = 0; i < children.length; i += 1000) {
    childrenSplit.push(children.slice(i, Math.min(i + 1000, children.length)));
  }

  // get the data from the children objects, running one request per 1000 objects
  return await Promise.all(
    childrenSplit.map((cs) => {
      return fetch(
        `${context.state.selectedServer.url}/api/getobjects/${streamId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.state.token.token}`,
          },
          body: JSON.stringify({ objects: JSON.stringify(cs) }),
        }
      ).then((res) => res.json());
    })
  ).then((data) => {
    const arr: any[] = [];
    data.forEach((d) => {
      arr.push(...d);
    });
    return arr;
  });
}
