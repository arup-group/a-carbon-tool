export interface StreamNameBranches {
  data: {
    stream: {
      name: string;
      branches: {
        items: {
          name: string;
        }[];
      };
    };
  };
}
