import { ReportTotals, SpeckleObjectComplete } from "@/models/newAssessment";

export const checkContainsBranch = (
  streamId: string,
  branchName: string
) => `query {
  stream(id: "${streamId}") {
    branch(name: "${branchName}") {
      id
    }
  }
}`;

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

export const streamIsPublicQuery = (streamId: string) => `query {
  stream(id: "${streamId}") {
    isPublic
  }
}`

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

export const uploadObjectsGenericMutation = (
  streamid: string,
  objects: any[]
) => `mutation {
  objectCreate(objectInput: {
    streamId: "${streamid}",
    objects: ${JSON.stringify(objects).replace(/"([^"]+)":/g, "$1:")}
  })
}
`;

export const createBranchMutation = (
  streamid: string,
  branchName: string,
  description: string
) => `mutation {
  branchCreate(branch: {
    streamId: "${streamid}",
    name: "${branchName}",
    description: "${description}"
  })
}`;

export const createCommitMutation = (
  streamid: string,
  objectid: string,
  totalChildrenCount: number,
  branchName: string
) => `mutation {
  commitCreate(commit: {
    streamId: "${streamid}",
    branchName: "${branchName}",
    objectId: "${objectid}",
    message: "upload carbon report",
    sourceApplication: "ACT",
    totalChildrenCount: ${totalChildrenCount},
  })
}`;

export const streamCommmitObjects = (id: string, branchName: string) => `query {
stream(id: "${id}") {
  branch (name:"${branchName}"){
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
export const streamReferencedBranches = (id: string, limit: number, cursor: string) => `query {
  stream(id: "${id}") {
    branches(limit: ${limit}, cursor: "${cursor}") {
      cursor
      totalCount
      items {
        id,
        name,
        commits {
          items{
            referencedObject
          }
        }
      }
    }
  }
}`;

export const actReportBranchInfo = (id: string, branchName: string) => {
  return `query {
  stream(id: "${id}") {
    name
    branch(name: "${branchName}") {
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

export const getObjectInfo = (streamid: string, objectid: string) => `query {
  stream(id: "${streamid}") {
    object(id: "${objectid}") {
      totalChildrenCount,
      data
    }
  }
}`;

export const streamNameQuery = (streamId: string) => `query {
  stream(id: "${streamId}") {
    name
  }
}`;

// gets the stream name and all the branch names, used in Comparison.vue
export const streamNameBranches = (streamId: string, limit: number, cursor: string) => `query {
  stream(id: "${streamId}") {
    name
    branches(limit: ${limit}, cursor: "${cursor}") {
      cursor
      totalCount
      items {
        name
      }
    }
  }
}`;

export const carbonStreams = () => `query {
  streams {
    items {
      name
      id
      mainBranch: branch(name: "main") {
        name
        id
        commits(limit: 1) {
          items {
            referencedObject
            createdAt
          }
        }
      }
      actBranch: branch(name: "actcarbonreport/main") {
        name
        id
        commits(limit: 1) {
          items {
            referencedObject
            createdAt
          }
        }
      }
    }
  }
}`;
