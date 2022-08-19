import { Cause, CauseType, Context, CheckRes, FixRes } from "../..";
import { SpeckleRequests } from "../../speckleRequests";

export class NoJN implements Cause {
  name: CauseType = CauseType.NO_JN;
  description = "The stream does not have a job number attached to it.";
  present = false;
  constructor(public context: Context, public streamid: string) {
  }
  async check(): Promise<CheckRes> {
    const globalsRes = await SpeckleRequests.getGlobals(this.streamid, this.context);
    const jn = globalsRes.data.stream.globals.items.JobNumber;
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
  async fix(): Promise<FixRes> {
    console.warn("no auto fix for", this.name);
    return {
      name: this.name,
      fixed: false,
      message: "Please add a job number to the stream manually and rerun the diagnostic tool."
    };
  }
}
