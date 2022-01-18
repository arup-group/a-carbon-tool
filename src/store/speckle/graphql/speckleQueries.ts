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
          id
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
