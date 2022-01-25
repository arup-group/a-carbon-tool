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

export const streamsDataQuery = (id: string) => `query {
  stream(id: "${id}") {
    branch (name: "actCarbonReport") {
      commits {
        items {
          referencedObject
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

export const streamReferencedBranches = (id: string) => `query {
  stream(id: "${id}") {
    branches {
      items {
        name
      }
    }
  }
}`;
