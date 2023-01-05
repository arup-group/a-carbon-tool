import { HTTPStreamDataParent } from "@/models/graphql/";
import {
  instanceOfHttpStreamDataParentV1,
  instanceOfHttpStreamDataParentV2,
} from "@/models/graphql/StreamData.interface";
import { getActReportBranchInfo } from "@/store/speckle/speckleUtil";
import { calcV1, calcV2, LoadStreamOut } from "./process-report-object";

export async function loadParent(
  url: string,
  streamId: string,
  parentId: string,
  token: string
): Promise<HTTPStreamDataParent> {
  return await fetch(`${url}/objects/${streamId}/${parentId}/single`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((d) => d.json());
}

export async function loadStream(
  context: any,
  streamId: string,
  branchName: string,
  includeChildren?: boolean
): Promise<LoadStreamOut> {
  const actReportBranchInfo = await getActReportBranchInfo(
    context,
    streamId,
    branchName
  );
  const parentId =
    actReportBranchInfo.data.stream.branch.commits.items[0].referencedObject;

  const branchData = await loadParent(
    context.state.selectedServer.url,
    streamId,
    parentId,
    context.state.token.token
  );

  if (instanceOfHttpStreamDataParentV1(branchData)) {
    return calcV1(branchData, actReportBranchInfo, context, streamId);
  } else if (instanceOfHttpStreamDataParentV2(branchData)) {
    return calcV2(
      branchData,
      actReportBranchInfo,
      streamId,
      context,
      includeChildren
    );
  } else {
    throw new Error("report object corrupted");
  }
}


