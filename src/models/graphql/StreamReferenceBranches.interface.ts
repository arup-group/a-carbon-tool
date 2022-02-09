export interface StreamReferenceBranches {
  data: {
    stream: {
      branches: {
        items: {
          id: string;
          name: string;
        }[];
      };
    };
  };
}
