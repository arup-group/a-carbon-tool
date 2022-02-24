export interface StreamReferenceBranches {
  data: {
    stream: {
      branches: {
        items: {
          id: string;
          name: string;
          createdAt: string;
          branchCommitDate: any;
          commits: any;
        }[];
      };
    };
  };
}
