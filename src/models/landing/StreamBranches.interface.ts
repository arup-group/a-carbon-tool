import { StreamReferenceBranches } from "../graphql";
import { StreamId } from "./StreamId.interface";

export interface StreamBranches {
  branches: StreamReferenceBranches;
  stream: StreamId;
}
