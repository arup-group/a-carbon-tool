export const userInfoQuery = () => `query {
    user {
      name
    },
    serverInfo {
      name
      company
    }
  }`;
