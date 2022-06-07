export interface StreamReferenceBranches {
  data: {
    stream: {
      branches: {
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
