export interface AllStreams {
  data: {
    streams: {
      items: {
        actBranch?: Branch;
        mainBranch: Branch;
        name: string;
        id: string;
      }[];
    };
  };
}

interface Branch {
  id: string;
  name: string;
  commits: {
    items: {
      referencedObject: string;
      createdAt: string;
    }[];
  };
}
