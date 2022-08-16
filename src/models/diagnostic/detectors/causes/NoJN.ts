import { Cause, CauseType, Context, CheckRes, FixRes } from "../..";
import { toContextType } from "..";
import { SpeckleRequests } from "../../speckleRequests";

export class NoJN implements Cause {
  name: CauseType = CauseType.NO_JN;
  description = "The stream does not have a job number attached to it";
  context: Context;
  present = false;
  constructor(token: string, url: string) {
    this.context = toContextType(token, url);
  }
  async check(streamid: string): Promise<CheckRes> {
    let globalsRes = await SpeckleRequests.getGlobals(streamid, this.context);
    let jn = globalsRes.data.stream.globals.items.JobNumber;
    if (!jn || jn === "000000-00" || jn === "00000000") {
      this.present = true;
      return {
        present: true,
        message: "Job number issue"
      };
    }
    this.present = false;
    return {
      present: false,
      message: "Unknown issue"
    };
  }
  async fix(streamid: string): Promise<FixRes> {
    console.warn("no auto fix for", this.name);
    return {
      fixed: false,
      message: "Please manually add a job number to the stream then rerun the diagnostic tool"
    };
  }
}
