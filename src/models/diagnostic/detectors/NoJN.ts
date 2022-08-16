import { Detector, IssueType, SubDetectors, Context } from "../";
import { toContextType } from ".";
import { SpeckleRequests } from "../speckleRequests";

export class NoJN implements Detector {
  name: IssueType = IssueType.NO_JN;
  description = "The stream does not have a job number attached to it";
  context: Context;
  present = false;
  constructor(token: string, url: string) {
    this.context = toContextType(token, url);
  }
  async check(streamid: string) {
    let globalsRes = await SpeckleRequests.getGlobals(streamid, this.context);
    let jn = globalsRes.data.stream.globals.items.JobNumber;
    if (!jn || jn === "000000-00" || jn === "00000000") {
      this.present = true;
      return true;
    }
    this.present = false;
    return false;
  }
  async fix(streamid: string) {
    console.warn("no auto fix for", this.name);
    return false;
  }
}
