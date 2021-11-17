import { Server } from "@/models/server";

const APP_NAME = process.env.VUE_APP_SPECKLE_NAME;
const CHALLENGE = `${APP_NAME}.Challenge`;
const TOKEN = `${APP_NAME}.AuthToken`;
const REFRESH_TOKEN = `${APP_NAME}.RefreshToken`;

export function goToSpeckleAuthpage(server: Server) {
    let challenge =
        Math.random()
            .toString(36)
            .substring(2, 15) +
        Math.random()
            .toString(36)
            .substring(2, 15)
    // Save challenge in localStorage
    localStorage.setItem(CHALLENGE, challenge)
    // Send user to auth page
    window.open(
        `${server.url}/authn/verify/${server.speckleId}/${challenge}`,
        "login screen",
        "height=700,width=800",
    );
}

export function speckleLogOut() {
    // Remove both token and refreshToken from localStorage
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}


