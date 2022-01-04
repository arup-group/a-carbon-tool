import Vue from "vue";
import Vuex from "vuex";
import {
  exchangeAccessCode,
  getServer,
  getStreamObjects,
  getToken,
  getUserData,
  getUserStreams,
  goToSpeckleAuthpage,
  speckleLogOut,
} from "./speckle/speckleUtil";
import { Login, Server, AuthError, Token } from "@/models/auth/";
import router from "@/router";
import {
  materialCarbonFactors,
  UKMaterialCarbonFactors,
} from "./utilities/material-carbon-factors";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    servers: [
      {
        region: "UKIMEA",
        url: "https://v2.speckle.arup.com",
        speckleId: process.env.VUE_APP_SPECKLE_ID_ARUP,
        speckleSecret: process.env.VUE_APP_SPECKLE_SECRET_ARUP,
      },
    ],
    selectedServer: {} as Server, // should be a server object
    token: {} as Token, // should be a Token object
    authed: false,
    user: null,
    serverInfo: null,
  },
  getters: {
    isAuthenticated: (state) => state.user != null,
    materialsArrUK: (state): string[] => {
      const tmparr = (
        Object.keys(materialCarbonFactors.UK) as Array<
          keyof UKMaterialCarbonFactors
        >
      ).map((type) => {
        const arr: string[] = [];
        Object.keys(materialCarbonFactors.UK[type]).forEach((t) => {
          arr.push(`${type} - ${t}`);
        });
        return arr;
      });
      const arr: string[] = [];

      tmparr.forEach((ta) => {
        arr.push(...ta);
      });

      return arr;
    },
  },
  mutations: {
    logout(state) {
      state.token = {} as Token;
      state.selectedServer = {} as Server;
      state.authed = false;
      state.user = null;
      state.serverInfo = null;
    },
    login(state, data: Login) {
      state.token = data.token;
      state.selectedServer = data.server;
      state.authed = true;
    },
    setUser(state, user) {
      state.user = user;
    },
    setServerInfo(state, info) {
      state.serverInfo = info;
    },
  },
  actions: {
    // Auth
    logout(context) {
      // wipe the state
      context.commit("logout");

      // wipe the tokens
      speckleLogOut();

      router.push("login");
    },
    async exchangeAccessCode(context, accessCode: string) {
      const server = getServer(context);

      const token = await exchangeAccessCode(accessCode, server);
      context.commit("login", {
        token,
        server,
      });
    },
    redirectToAuth(context, server: Server) {
      goToSpeckleAuthpage(server);
    },
    async getUser(context) {
      try {
        if (
          Object.keys(context.state.selectedServer).length === 0 ||
          Object.keys(context.state.token).length === 0
        ) {
          const server = getServer(context);
          const token = getToken();
          context.commit("login", {
            token,
            server,
          });
        }

        const json = await getUserData(context);
        const data = json.data;
        context.commit("setUser", data.user);
        context.commit("setServerInfo", data.serverInfo);
      } catch (err) {
        console.error(err);
        if (err === AuthError.NOT_SIGNED_IN)
          throw new Error(AuthError.NOT_SIGNED_IN);
      }
    },
    async getUserStreams(context) {
      const streams = await getUserStreams(context);
      return streams;
    },
    async getObjectUrls(context, streamid: string) {
      const objectIds = await getStreamObjects(context, streamid);

      return objectIds.data.stream.branch.commits.items.map((item) => {
        return `${context.state.selectedServer.url}/streams/${streamid}/objects/${item.referencedObject}`;
      });
    },
    async getObjectDetails(context, input: ObjectDetailsInput) {
      const { streamid, objecturl } = input;
      const objectid = objecturl.split("/")[objecturl.split("/").length - 1];

      console.log("inputs:", input);
      console.log(
        "url:",
        `${context.state.selectedServer.url}/objects/${streamid}/${objectid}/single`
      );
      const response = await fetch(
        `${context.state.selectedServer.url}/objects/${streamid}/${objectid}/single`,
        {
          headers: {
            Accept: "text/plain",
            Authorization: `Bearer ${context.state.token.token}`,
          },
        }
      );
      const rawObj = await response.text();
      const rootObj = JSON.parse(rawObj);

      console.log("[getObjectDetails] rootObj:", rootObj);

      const childrenIds = Object.keys(rootObj.__closure).sort(
        (a, b) => rootObj.__closure[a] - rootObj.__closure[b]
      );
      console.log("[getObjectDetails] childrenIds:", childrenIds);

      const childrenObjects = await fetch(
        `${context.state.selectedServer.url}/api/getobjects/${streamid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.state.token.token}`,
          },
          body: JSON.stringify({ objects: JSON.stringify(childrenIds) }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("[getObjectDetails] data:", data);
          return data;
        });

      console.log("[getObjectDetails] childrenObjects:", childrenObjects);
      return childrenObjects;
    },
  },
  modules: {},
});

interface ObjectDetailsInput {
  streamid: string;
  objecturl: string;
}
