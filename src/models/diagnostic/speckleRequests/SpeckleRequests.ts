import { GetGlobals, GetOldReportCommits, GetReportBranchCommits, Graphql } from ".";
import { Context } from "../";
import { speckleFetch } from "@/store/speckle/speckleUtil";

export abstract class SpeckleRequests {
  public static getReportBranchCommits(
    streamid: string,
    context: Context
  ): Promise<GetReportBranchCommits> {
    return speckleFetch(Graphql.getReportBranchCommits(streamid), context);
  }
  public static getGlobals(
    streamid: string,
    context: Context
  ): Promise<GetGlobals> {
    return speckleFetch(Graphql.getGlobals(streamid), context);
  }
  public static getOldReportCommits(
    streamid: string,
    context: Context
  ): Promise<GetOldReportCommits> {
    return speckleFetch(Graphql.getOldReportCommits(streamid), context);
  }
}
