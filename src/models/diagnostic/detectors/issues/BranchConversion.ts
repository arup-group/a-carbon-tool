import { Issue, IssueType, CauseType, Context, Causes, FixRes, CheckRes, IssueFactory } from "../..";
import { NoJN } from "../causes";
import { convOldReport } from "@/store/speckle/speckleUtil";
import { SpeckleRequests } from "../../speckleRequests";

export class BranchConversion implements Issue {
  name: IssueType = IssueType.BRANCH_CONVERSION;
  description = "Error in converting the report from the old version to new";
  subDetectors: Causes = {};
  present = false;
  constructor(public context: Context, public streamid: string) {
    this.subDetectors = {
      [CauseType.NO_JN]: new NoJN(context, streamid),
    };
  }
  async check(): Promise<CheckRes> {
    const branchCommitsRes = await SpeckleRequests.getReportBranchCommits(
      this.streamid,
      this.context
    );
    const commits = branchCommitsRes.data.stream.branch.commits.items;
    if (commits.length === 0) {
      this.subDetectors[CauseType.NO_JN]?.check();
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
  async fix(): Promise<FixRes> {
    if (this.subDetectors[CauseType.NO_JN]?.present) {
      const oldCommitsRes = await SpeckleRequests.getOldReportCommits(
        this.streamid,
        this.context
      );

      await convOldReport(this.context, this.streamid, {
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

    const check = await this.check();

    return check.present ? {
      name: this.name,
      fixed: false,
      message: "Unable to fix issue"
    } : {
      name: this.name,
      fixed: true,
      message: "Issue fixed"
    };
  }
}
