import Vue from "vue";
import Vuex from "vuex";
import {
  exchangeAccessCode,
  getServer,
  goToSpeckleAuthpage,
  speckleLogOut,
} from "./speckleUtil";
import { Login, Server } from "@/models/auth/";

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
  },
  mutations: {
    clear_data(state) {
      state.token = {};
      state.selectedServer = {};
      state.authed = false;
    },
    login(state, data: Login) {
      state.token = data.token;
      state.selectedServer = data.server;
      state.authed = true;
    },
  },
  actions: {
    // Auth
    logout(context) {
      // wipe the state TODO
      context.commit("clear_data");

      // wipe the tokens
      speckleLogOut();
    },
    exchangeAccessCode(context, accessCode: string) {
      const server = getServer(context);

      const token = exchangeAccessCode(accessCode, server);
      context.commit("login", {
        token,
        server,
      });
    },
    redirectToAuth(context, server: Server) {
      goToSpeckleAuthpage(server);
    },
  },
  modules: {},
});
