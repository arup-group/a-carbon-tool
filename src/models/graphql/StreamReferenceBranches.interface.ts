export interface StreamReferenceBranches {
  data: {
    stream: {
      branches: {
        cursor: string;
        totalCount: number;
        items: BranchItem[];
      };
    };
  };
}

export interface BranchItem {
  id: string;
  name: string;
  createdAt: string;
  commits: {
    items: { referencedObject: string }[];
  };
}
