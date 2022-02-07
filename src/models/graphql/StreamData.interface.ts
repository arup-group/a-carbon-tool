export interface StreamData {
  data: {
    stream: {
      object: {
        data: any;
        children: {
          objects: { data: any }[];
        };
      };
    };
  };
}
