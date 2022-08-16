import { Detector, IssueType, SubDetectors, Context } from "../";
import { NoJN, toContextType } from ".";
import { convOldReport } from "@/store/speckle/speckleUtil";
import { SpeckleRequests } from "../speckleRequests";

export class BranchConversion implements Detector {
  name: IssueType = IssueType.BRANCH_CONVERSION;
  description = "Error in converting the report from the old version to new";
  subDetectors: SubDetectors = {};
  context: Context;
  present = false;
  constructor(token: string, url: string) {
    this.subDetectors = {
      [IssueType.NO_JN]: new NoJN(token, url),
    };
    this.context = toContextType(token, url);
  }
  async check(streamid: string) {
    let branchCommitsRes = await SpeckleRequests.getReportBranchCommits(
      streamid,
      this.context
    );
    let commits = branchCommitsRes.data.stream.branch.commits.items;
    if (commits.length === 0) {
      this.subDetectors[IssueType.NO_JN]?.check(streamid);
      this.present = true;
      return true;
    }
    this.present = false;
    return false;
  }
  async fix(streamid: string) {
    if (this.subDetectors[IssueType.NO_JN]?.present) {
      let oldCommitsRes = await SpeckleRequests.getOldReportCommits(
        streamid,
        this.context
      );

      await convOldReport(this.context, streamid, {
        id: "",
        name: "",
        createdAt: "",
        commits: {
          items: [
            {
              referencedObject:
                oldCommitsRes.data.stream.branch.commits.items[0]
                  .referencedObject,
            },
          ],
        },
      });
    }

    return await this.check(streamid);
  }
}
