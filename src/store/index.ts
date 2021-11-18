import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import { exchangeAccessCode, goToSpeckleAuthpage, speckleLogOut } from "./speckleUtil";
import { Server } from "@/models/server";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    servers: [
      {
        region: "UKIMEA",
        url: "https://v2.speckle.arup.com",
        speckleId: process.env.VUE_APP_SPECKLE_ID_ARUP,
        speckleSecret: process.env.VUE_APP_SPECKLE_SECRET_ARUP
      },
    ],
    // The canonical and correct server url, i.e. `https://speckle.server.com/api`
    server: null,
    // The server description
    serverManifest: null,
    selectedDbSource: null,
    distinctDbSources: [],
    token: null,
    user: {},
    isAuth: false,
    // where all the streams and their properties are stored.
    streams: [{}],
    // loaded streamIds:
    loadedStreamIds: [],
    // the current renderer legend
    legend: null,
    // speckle objects store
    objects: [],
    // selected objects ids
    selectedObjects: [],
    // global store for stream clients.
    clients: [],
    // global store for projects
    projects: [],
    comments: [],
    // global store for users. it's dynamically assembled as the end-user moves through
    // the admin ui, and new user profiles need to be requested.
    users: [],
    appStep: "data-input",
    hadNoReports: false,
    matsPerSource: null,
    // materialsDb: [],
    report: {
      name: "No Name",
      description: "No description",
      constructionCost: 1,
      totalCarbon: 0,
      totalCarbonA1A3: 0,
      totalCarbonA4Transport: 0,
      totalCarbonA5Wastage: 0,
      totalCarbonA5Site: 0,
      numberOfObjects: 0,
      materialTable: {},
    },
    volumeConversionFactor: 1,
    volumeKey: null,
  },
  mutations: {
    // Generics
    SET_SERVER(state, server) {
      state.server = server;
    },
    SET_SERVER_DETAILS(state, serverManifest) {
      state.serverManifest = serverManifest;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      state.isAuth = true;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_HADNOREPORTS(state, val) {
      state.hadNoReports = val;
    },
    // Streams
    ADD_STREAMS(state, streams) {
      streams.forEach((stream: any) => {
        if (
          state.streams.findIndex((x: any) => x.streamId === stream.streamId) === -1
        ) {
          // defensive code (vue 3.0 we're off to typescript baby, can't wait)
          if (!stream.description) stream.description = "...";
          if (!stream.tags) stream.tags = [];
          state.streams.unshift(stream);
        }
      });
    },
  },
  actions: {
    // Auth
    logout(context) {
      // wipe the state

      // wipe the tokens
      speckleLogOut();
    },
    exchangeAccessCode(context, accessCode) {
      return exchangeAccessCode(accessCode, context);
    },
    redirectToAuth(context, server: Server) {
      goToSpeckleAuthpage(server);
    },

    authenticate: (context, payload) =>
      // eslint-disable-next-line
      new Promise(async (resolve, reject) => {
        try {
          const userProfile = await Axios.get(
            payload.server + "/accounts",
            {
              headers: {
                Authorization: payload.token,
              },
            },
          );
          context.commit("SET_TOKEN", payload.token);
          context.commit("SET_USER", userProfile.data.resource);
          context.commit("SET_SERVER", new URL("/api", payload.server));

          const serverDetails = await Axios.get(`${payload.server}`);
          context.commit("SET_SERVER_DETAILS", serverDetails.data);

          Axios.defaults.headers.common["Authorization"] = payload.token;
          Axios.defaults.baseURL = `${payload.server}`;

          localStorage.setItem("token", payload.token);

          return resolve('');
        } catch (err: any) {
          console.log(err);
          return reject(err.message);
        }
      }),
      getStreams(context, query) {
        return new Promise((resolve, reject) => {
          Axios.get(`streams?${query ? query : ""}`)
            .then(res => {
              context.commit("ADD_STREAMS", res.data.resources);
              if (
                res.data.resources.filter((stream: any) =>
                  Object.prototype.hasOwnProperty.call(stream, "isCarbonReport"),
                ).length === 0
              ) {
                context.commit("SET_HADNOREPORTS", true);
                // context.dispatch("getStream", {
                //   streamId: "tLrYpnnVuY",
                // });
                // context.dispatch("getStream", {
                //   streamId: "D3tGwsSdjc",
                // });
              }
              return resolve(res.data.resources);
            })
            .catch(err => {
              return reject(err);
            });
        });
      }
  },
  modules: {},
});
