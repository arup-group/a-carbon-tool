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
  name, id
  }
  }
  }
  }`;
