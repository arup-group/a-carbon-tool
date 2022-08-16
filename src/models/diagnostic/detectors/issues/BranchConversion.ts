import { Issue, IssueType, CauseType, Context, Causes, FixRes, CheckRes } from "../..";
import { NoJN } from "../causes";
import { toContextType } from "..";
import { convOldReport } from "@/store/speckle/speckleUtil";
import { SpeckleRequests } from "../../speckleRequests";

export class BranchConversion implements Issue {
  name: IssueType = IssueType.BRANCH_CONVERSION;
  description = "Error in converting the report from the old version to new";
  subDetectors: Causes = {};
  context: Context;
  present = false;
  constructor(token: string, url: string) {
    this.subDetectors = {
      [CauseType.NO_JN]: new NoJN(token, url),
    };
    this.context = toContextType(token, url);
  }
  async check(streamid: string): Promise<CheckRes> {
    let branchCommitsRes = await SpeckleRequests.getReportBranchCommits(
      streamid,
      this.context
    );
    let commits = branchCommitsRes.data.stream.branch.commits.items;
    if (commits.length === 0) {
      this.subDetectors[CauseType.NO_JN]?.check(streamid);
      this.present = true;
      return {
        present: true,
        message: "Issue with branch conversion"
      };
    }
    this.present = false;
    return {
      present: false,
      message: "No issue with branch conversion"
    }
  }
  async fix(streamid: string): Promise<FixRes> {
    if (this.subDetectors[CauseType.NO_JN]?.present) {
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

    const check = await this.check(streamid);

    return check.present ? {
      fixed: false,
      message: "Unable to fix issue"
    } : {
      fixed: true,
      message: "Issue fixed"
    };
  }
}
