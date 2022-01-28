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

export const streamReferencedBranches = (id: string) => `query {
  stream(id: "${id}") {
    branches {
      items {
        name
      }
    }
  }
}`;
