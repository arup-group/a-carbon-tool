export interface StreamReferenceObjects {
  data: {
    stream: {
      branch: {
        commits: {
          items: {
            referencedObject: string;
          }[];
        };
      };
    };
  };
}
