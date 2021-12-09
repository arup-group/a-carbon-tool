export const userInfoQuery = () => `query {
    user {
      name
    },
    serverInfo {
      name
      company
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
