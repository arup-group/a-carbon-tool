import { Server } from "@/models/server";

const APP_NAME = process.env.VUE_APP_SPECKLE_NAME;
const CHALLENGE = `${APP_NAME}.Challenge`;
const TOKEN = `${APP_NAME}.AuthToken`;
const REFRESH_TOKEN = `${APP_NAME}.RefreshToken`;
const SERVER = `${APP_NAME}.Server`;

export function goToSpeckleAuthpage(server: Server) {
    console.log("[speckleUtil] server:", server);
    console.log("[speckleUtil] process.env:", process.env);
    const challenge =
        Math.random()
            .toString(36)
            .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15)
    // Save challenge and server url in localStorage
    localStorage.setItem(CHALLENGE, challenge);
    localStorage.setItem(SERVER, server.url);

    // Send user to auth page
    window.location.href = `${server.url}/authn/verify/${server.speckleId}/${challenge}`;
}

export function speckleLogOut() {
    // Remove both token and refreshToken from localStorage
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

// Exchanges the provided access code with a token/refreshToken pair, and saves them to local storage.
export async function exchangeAccessCode(accessCode: string, context: any) {
    const url = localStorage.getItem(SERVER) as string;
    console.log("[speckleUtil] context:", context);
    const tmpServer = context.state.servers.find((s: Server) => s.url === url);
    let server: Server;
    if (tmpServer) server = tmpServer;
    else server = {
        region: "",
        url: url,
        speckleId: "",
        speckleSecret: "",
    }
    const res = await fetch(`${url}/auth/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        accessCode: accessCode,
        appId: server.speckleId,
        appSecret: server.speckleSecret,
        challenge: localStorage.getItem(CHALLENGE)
      })
    })
    const data = await res.json()
    if (data.token) {
      // If retrieving the token was successful, remove challenge and set the new token and refresh token
      localStorage.removeItem(CHALLENGE)
      localStorage.setItem(TOKEN, data.token)
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken)
    }
    return data
  }
