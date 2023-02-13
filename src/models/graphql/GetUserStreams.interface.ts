export interface GetUserStreams {
  data: {
    user: {
      name: string;
      streams: {
        items: {
          name: string;
          id: string;
        }[];
      };
    };
  };
}
