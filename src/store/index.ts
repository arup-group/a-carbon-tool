import Vue from "vue";
import Vuex from "vuex";
import {
  exchangeAccessCode,
  getServer,
  getToken,
  getUserData,
  getUserStreams,
  goToSpeckleAuthpage,
  speckleLogOut,
} from "./speckle/speckleUtil";
import { Login, Server, AuthError } from "@/models/auth/";
import router from "@/router";

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
    selectedServer: {}, // should be a server object
    token: {}, // should be a Token object
    authed: false,
    user: null,
    serverInfo: null,
  },
  getters: {
    isAuthenticated: (state) => state.user != null,
  },
  mutations: {
    logout(state) {
      state.token = {};
      state.selectedServer = {};
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
          throw new Error(AuthError.NOT_SIGNED_IN)
      }
    },
  async getUserStreams(context) {
    const streams = await getUserStreams(context);
      return streams;
  }
  },
  modules: {},
});
