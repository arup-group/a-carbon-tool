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
  MaterialFull,
  UKMaterialCarbonFactors,
} from "./utilities/material-carbon-factors";
import { TransportType } from "@/models/newAssessment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    servers: {
      arup: {
        region: "UKIMEA",
        url: "https://v2.speckle.arup.com",
        speckleId: process.env.VUE_APP_SPECKLE_ID_ARUP,
        speckleSecret: process.env.VUE_APP_SPECKLE_SECRET_ARUP,
      },
      xyz: {
        region: "PUBLIC",
        url: "https://speckle.xyz/",
        speckleId: process.env.VUE_APP_SPECKLE_ID_XYZ,
        speckleSecret: process.env.VUE_APP_SPECKLE_SECRET_XYZ,
      },
    },
    selectedServer: {} as Server, // should be a server object
    token: {} as Token, // should be a Token object
    authed: false,
    user: null,
    serverInfo: null,
    transportTypes: [{
      name: "local",
      color: "#53ac8b",
      values: {
        road: 50,
        rail: 0,
        sea: 0,
      }
    }, {
      name: "regional",
      color: "#2d8486",
      values: {
        road: 300,
        rail: 0,
        sea: 0,
      }
    }, {
      name: "global",
      color: "#683a78",
      values: {
        road: 200,
        rail: 0,
        sea: 10000
      }
    }, {
      name: "custom",
      color: "#1f9321",
      values: {
        road: 0,
        rail: 0,
        sea: 0
      }
    }] as TransportType[]
  },
  getters: {
    isAuthenticated: (state) => state.user != null,
    materialsArrUK: (state): MaterialFull[] => {
      const tmparr = (
        Object.keys(materialCarbonFactors.UK) as Array<
          keyof UKMaterialCarbonFactors
        >
      ).map((type) => {
        const arr: MaterialFull[] = [];
        Object.keys(materialCarbonFactors.UK[type]).forEach((t) => {
          const toPush: MaterialFull = {
            name: `${type} - ${t}`,
            ...materialCarbonFactors.UK[type][t],
            color: "#" + Math.floor(Math.random() * 16777215).toString(16), // generates random hex code for color, should be replaced at some point
          }
          arr.push(toPush);
        });
        return arr;
      });
      const arr: MaterialFull[] = [];

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

      const childrenIds = Object.keys(rootObj.__closure).sort(
        (a, b) => rootObj.__closure[a] - rootObj.__closure[b]
      );

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
          return data;
        });

      return childrenObjects;
    },
  },
  modules: {},
});

interface ObjectDetailsInput {
  streamid: string;
  objecturl: string;
}
