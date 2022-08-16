export enum IssueType {
  BRANCH_CONVERSION = "Branch conversion", // issue with converting from old report format to new
  NO_JN = "No JN", // no job number present on the stream, most commonly the cause of a branch conversion error
}

export interface Context {
  state: {
    token: {
      token: string;
    };
    selectedServer: {
      url: string;
    };
  };
}

export type SubDetectors = {
  [key in IssueType]?: Detector;
};

export interface Detector {
  name: IssueType;
  description: string;
  context: Context;
  present: boolean;
  subDetectors?: SubDetectors; // may have a sub detector
  check: (streamid: string) => Promise<boolean>; // function to check if issue is present, returns whether the issue is present
  fix: (streamid: string) => Promise<boolean>; // function to (attempt to) fix issue, returns whether the issue was fixed
}
