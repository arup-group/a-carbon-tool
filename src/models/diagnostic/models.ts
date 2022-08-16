export enum IssueType {
  BRANCH_CONVERSION = "Branch conversion", // issue with converting from old report format to new
}

export enum CauseType {
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

export type Causes = {
  [key in CauseType]?: Cause;
};

export interface IssueFactory {
  new(context: Context, streamid: string): Issue;
}

export interface Issue {
  name: IssueType;
  description: string;
  context: Context;
  present: boolean;
  subDetectors?: Causes; // may have a sub detector
  streamid: string;
  check: () => Promise<CheckRes>; // function to check if issue is present, returns whether the issue is present
  fix: () => Promise<FixRes>; // function to (attempt to) fix issue, returns whether the issue was fixed
}

export interface Cause {
  name: CauseType;
  description: string;
  context: Context;
  present: boolean;
  streamid: string;
  check: () => Promise<CheckRes>; // function to check if issue is present, returns whether the issue is present
  fix: () => Promise<FixRes>; // function to (attempt to) fix issue, returns whether the issue was fixed
}

export interface CheckRes {
  present: boolean;
  message: string;
}

export interface FixRes {
  name: string;
  fixed: boolean;
  message: string;
}

export type IssuesImport = { [key: string]: IssueFactory }
