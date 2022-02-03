export interface StreamReferenceBranches {
  data: {
    stream: {
      branches: {
        items: {
          referencedObject: string;
        }[];
      };
    };
  };
}
