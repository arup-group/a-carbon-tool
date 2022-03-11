import { AuthError, Server, Token } from "@/models/auth";
import { ReportTotals, SpeckleObjectComplete } from "@/models/newAssessment";
import {
  StreamReferenceObjects,
  StreamReferenceBranches,
  StreamData,
  ActReportData,
  DeleteStreamData,
} from "@/models/graphql";

import {
  streamReferencedObjects,
  streamsDataQuery,
  userInfoQuery,
  streamsQuery,
  uploadObjectsMutation,
  createBranchMutation,
  uploadObjectWithChildrenMutation,
  createCommitMutation,
  streamReferencedBranches,
  streamCommmitObjects,
  mainStreamCommmitObjects,
  actReportBranchInfo,
  deleteBranchMutation,
} from "./graphql/speckleQueries";

const APP_NAME = process.env.VUE_APP_SPECKLE_NAME;
const CHALLENGE = `${APP_NAME}.Challenge`;
const TOKEN = `${APP_NAME}.AuthToken`;
const REFRESH_TOKEN = `${APP_NAME}.RefreshToken`;
const SERVER = `${APP_NAME}.Server`;

export function goToSpeckleAuthpage(server: Server) {
  const challenge =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  // Save challenge and server JSON string in localStorage for later use
  localStorage.setItem(CHALLENGE, challenge);
  localStorage.setItem(SERVER, JSON.stringify(server));

  // Send user to auth page 
  window.location.href = `${server.url}/authn/verify/${server.speckleId}/${challenge}`;
}

export function speckleLogOut() {
  // Remove both token and refreshToken from localStorage
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

// Exchanges the provided access code with a token/refreshToken pair, and saves them to local storage.
export async function exchangeAccessCode(accessCode: string, server: Server) {
  const res = await fetch(`${server.url}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessCode: accessCode,
      appId: server.speckleId,
      appSecret: server.speckleSecret,
      challenge: localStorage.getItem(CHALLENGE),
    }),
  });
  const data: Token = await res.json();
  if (data.token) {
    // If retrieving the token was successful, remove challenge and set the new token and refresh token
    localStorage.removeItem(CHALLENGE);
    localStorage.setItem(TOKEN, data.token);
    localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
  }
  return data;
}

export function getServer(context: any): Server {
  //gets server info stored as a JSON string in local storage
  const server = localStorage.getItem(SERVER) as string;
  const serverJson = JSON.parse(server);
  return serverJson;
}

export async function speckleFetch(query: any, context: any) {
  const token: string = context.state.token.token;
  if (token) {
    try {
      const url: string = context.state.selectedServer.url;
      const res = await fetch(`${url}/graphql`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        // body: `{ query: ${query} }`
        body: JSON.stringify({
          query: query,
        }),
      });
      return await res.json();
    } catch (err) {
      console.error("API cal failed", err);
    }
  } else return Promise.reject(AuthError.NOT_SIGNED_IN);
}

export const getUserData = (context: any) =>
  speckleFetch(userInfoQuery(), context);

export const getStreamObjects = (
  context: any,
  streamid: string
): Promise<StreamReferenceObjects> =>
  speckleFetch(streamReferencedObjects(streamid), context);

export const getUserStreams = (context: any) =>
  speckleFetch(streamsQuery(), context);

export const uploadObjects = (
  context: any,
  streamid: string,
  objects: SpeckleObjectComplete[]
) => speckleFetch(uploadObjectsMutation(streamid, objects), context);

export const createReportBranch = (context: any, streamid: string) =>
  speckleFetch(createBranchMutation(streamid), context);

export const uploadObjectWithChildren = (
  context: any,
  streamid: string,
  object: ReportTotals,
  children: string[]
) =>
  speckleFetch(
    uploadObjectWithChildrenMutation(streamid, object, children),
    context
  );

export const createCommit = (
  context: any,
  streamid: string,
  objectid: string,
  totalChildrenCount: number
) =>
  speckleFetch(
    createCommitMutation(streamid, objectid, totalChildrenCount),
    context
  );

export const getStreamCommit = (
  context: any,
  streamid: string
): Promise<StreamReferenceObjects> =>
  speckleFetch(streamCommmitObjects(streamid), context);

  export const getMainStreamCommit = (
    context: any,
    streamid: string
  ): Promise<StreamReferenceObjects> =>
    speckleFetch(mainStreamCommmitObjects(streamid), context);

export const getStreamBranches = (
  context: any,
  streamid: string
): Promise<StreamReferenceBranches> =>
  speckleFetch(streamReferencedBranches(streamid), context);

export const getBranchData = (
  context: any,
  streamid: string,
  objId: string
): Promise<StreamData> =>
  speckleFetch(streamsDataQuery(streamid, objId), context);

export const getActReportBranchInfo = (
  context: any,
  streamId: string
): Promise<ActReportData> =>
  speckleFetch(actReportBranchInfo(streamId), context);

export const getToken = (): Token => ({
  token: localStorage.getItem(TOKEN) as string,
  refreshToken: localStorage.getItem(REFRESH_TOKEN) as string,
});

export const deleteBranch = (
  context: any,
  streamid: string,
  branchid: string
): Promise<DeleteStreamData> =>
  speckleFetch(deleteBranchMutation(streamid, branchid), context);
