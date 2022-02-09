export interface ActReportData {
  data: {
    stream: {
      branch: {
        commits: {
          items: {
            authorName: string;
            createdAt: string;
            referencedObject: string;
          }[];
        };
      };
      name: string;
    };
  };
}
