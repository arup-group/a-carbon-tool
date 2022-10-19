export interface GetReportBranchCommits {
  data: {
    stream: {
      branch: {
        commits: {
          items: {
            id: string;
            referencedObject: string;
          }[];
        };
      };
    };
  };
}
export interface GetGlobals {
  data: {
    stream: {
      globals: {
        items: {
          JobNumber: string;
        };
      };
    };
  };
}
export interface GetOldReportCommits {
  data: {
    stream: {
      branch: {
        commits: {
          items: {
            id: string;
            referencedObject: string;
          }[];
        };
      };
    };
  };
}
