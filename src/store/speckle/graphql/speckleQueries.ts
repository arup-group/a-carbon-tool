import { ReportTotals, SpeckleObjectComplete } from "@/models/newAssessment";

export const userInfoQuery = () => `query {
    user {
      name
    },
    serverInfo {
      name
      company
    }
  }`;


export const streamsQuery = () => `query {
  user {
    name,
      streams {
        items {
          name,
          id,
        }
      }
    }
  }`;

export const streamsDataQuery = (streamId: string, objId: string) => `query {
  stream(id: "${streamId}") {
    object(id: "${objId}") {
      data,
      createdAt,
        children {
          objects {
            data
          }
        }
      }
    }
  }`;

export const streamReferencedObjects = (id: string) => `query {
  stream(id: "${id}") {
    branch {
      commits {
        items {
          referencedObject
        }
      }
    }
  }
}`;

export const uploadObjectWithChildrenMutation = (
  streamid: string,
  object: ReportTotals,
  children: string[]
) => `mutation {
  objectCreate(objectInput: {
    streamId: "${streamid}",
    objects: [{
      __closure: ${JSON.stringify(
        Object.fromEntries(children.map((c) => [c, 1]))
      ).replace(/"([^"]+)":/g, "$1:")},
      speckleType: "act-totals",
      transportCarbonA4: ${object.transportCarbonA4},
      productStageCarbonA1A3: ${object.productStageCarbonA1A3},
      constructionCarbonA5: ${JSON.stringify(
        object.constructionCarbonA5
      ).replace(/"([^"]+)":/g, "$1:")},
      totalCO2: ${object.totalCO2}
    }]
  })
}`;

export const uploadObjectsMutation = (
  streamid: string,
  objects: SpeckleObjectComplete[]
) => `mutation {
  objectCreate(objectInput: {
    streamId: "${streamid}",
    objects: ${JSON.stringify(
      objects.map((o) => ({
        speckleType: "act-object",
        act: o,
      }))
    ).replace(/"([^"]+)":/g, "$1:")}
  })
}
`;

export const createBranchMutation = (streamid: string) => `mutation {
  branchCreate(branch: {
    streamId: "${streamid}",
    name: "actcarbonreport",
    description: "A Carbon Tool carbon report"
  })
}`;

export const createCommitMutation = (
  streamid: string,
  objectid: string,
  totalChildrenCount: number
) => `mutation {
  commitCreate(commit: {
    streamId: "${streamid}",
    branchName: "actcarbonreport",
    objectId: "${objectid}",
    message: "upload carbon report",
    sourceApplication: "ACT",
    totalChildrenCount: ${totalChildrenCount},
  })
}`;

export const streamCommmitObjects = (id: string) => `query {
stream(id: "${id}") {
  branch (name:"actcarbonreport"){
    commits {
       items {
         referencedObject
        }
      }
    }
  }
}`;

export const mainStreamCommmitObjects = (id: string) => `query {
  stream(id: "${id}") {
    branch (name:"main"){
      commits {
         items {
           referencedObject
          }
        }
      }
    }
  }`;

// Gets all branches for a particular stream id including first commit date
export const streamReferencedBranches = (id: string) => `query {
  stream(id: "${id}") {
    branches {
      items {
        id,
        name,
        commits {
          cursor
        }
      }
    }
  }
}`;

export const actReportBranchInfo = (id: string) => {
  return `query {
  stream(id: "${id}") {
    name
    branch(name: "actcarbonreport") {
    commits {
      items {
        authorName
        createdAt
      	referencedObject
      }
    }
  }
  }
}`;
};

export const deleteBranchMutation = (
  streamId: string,
  id: string
) => `mutation {
  branchDelete( branch: {streamId: "${streamId}", id: "${id}"})
}`;
