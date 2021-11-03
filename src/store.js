import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

import uniq from "lodash.uniq";
import get from "lodash.get";
import uuid from "uuid/v4";
import papa from "papaparse";

import DB from "@/material_db.js";

Vue.use(Vuex);

const transformMatsFromDbRows = dbRows =>
  dbRows.map(
    (r, index) =>
      `${index} ${r.material || r.Material}: ${r.subtype ||
        r.Subtype} (${r.kgcO2 || r["kgCO2e/kg"]} kgCO2e/kg)`,
  );

export default new Vuex.Store({
  state: {
    servers: [
      {
        region: "UKIMEA",
        url: "https://uk.speckle.arup.com/api",
      },
      {
        region: "Europe",
        url: "https://ireland.speckle.arup.com/api",
      },
      {
        region: "Canada",
        url: "https://canada.speckle.arup.com/api",
      },
      {
        region: "Australia",
        url: "https://australia.speckle.arup.com/api",
      },
      {
        region: "East Asia",
        url: "https://hongkong.speckle.arup.com/api",
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
    streams: [],
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
  getters: {
    streamClients: state => streamId => {
      return state.clients.filter(c => c.streamId === streamId);
    },
    filteredStreams: state => filters => {
      let base = state.streams.filter(
        stream => stream.parent == null && stream.deleted === false,
      );
      if (!filters || filters.length === 0) return base;
      filters.forEach(query => {
        query.key = query.key.toLowerCase();
        switch (query.key) {
          case "private":
            if (query.value)
              base = base.filter(
                stream => stream.private.toString() === query.value,
              );
            else base = base.filter(stream => stream.private === true);
            break;
          case "public":
            if (query.value)
              base = base.filter(
                stream => (!stream.private).toString() === query.value,
              );
            else base = base.filter(stream => stream.private === false);
            break;
          case "tag":
          case "tags":
            // eslint-disable-next-line
            const myTags = query.value.split(",").map(t => t.toLowerCase());
            base = base.filter(stream => {
              let streamTags = stream.tags.map(t => t.toLowerCase());
              return myTags.every(t => streamTags.includes(t));
            });
            break;
          case "mine":
            base = base.filter(stream => stream.owner === state.user._id);
            break;
          case "shared":
            base = base.filter(stream => stream.owner !== state.user._id);
            break;
          case "name":
            base = base.filter(stream =>
              stream.name.toLowerCase().includes(query.value.toLowerCase()),
            );
            break;
          case "streamid":
          case "id":
            base = base.filter(stream =>
              stream.streamId.toLowerCase().includes(query.value.toLowerCase()),
            );
            break;
        }
      });
      return base;
    },
    getObjects: state => ids => {
      if (!Array.isArray(ids) || ids.length == 0)
        throw "ids parameter need to be an array of ids";

      return state.objects.filter(obj => {
        if (ids.includes(obj._id)) return true;
        return false;
      });
    },

    //Gets objects with a given property
    getObjectsByProperty: state => property => {
      if (!property) return state.objects;
      return state.objects.filter(obj => {
        //This method allows property to be nested (ex property = "parameters.Volume")
        if (get(obj, "properties." + property)) return true;
        return false;
      });
    },
    //Gets objects without a given property
    getObjectsWithoutProperty: state => property => {
      return state.objects.filter(obj => {
        //This method allows property to be nested (ex property = "parameters.Volume")
        if (!get(obj, "properties." + property)) return true;
        return false;
      });
    },
    //Get an object's property value
    getObjectProperty: (state, getters) => (id, propName) => {
      let obj = getters.getObject(id);
      if (!obj) return;

      return get(obj, "properties." + propName);
    },
    materialsPerSource: state => source => {
      return transformMatsFromDbRows(state.matsPerSource[source]);
    },
    materialMap: state => source => {
      return transformMatsFromDbRows(state.matsPerSource[source]);
    },
  },
  mutations: {
    SET_MATERIALS_DB(state) {
      const matsPerSource = {};
      const rows = papa.parse(DB, {
        dynamicTyping: true,
      }).data;

      // skip first 2 indices - they dont include rows w/ actual data
      for (let i = 2; i < rows.length - 1; i++) {
        const db = rows[i][0];
        const material = rows[i][1];
        const subtype = rows[i][2];
        const kgcO2 = rows[i][3];
        const comments = rows[i][4];
        const density = rows[i][5];
        const wastage = rows[i][6];
        const densityAssumption = rows[i][7];
        const wasteReference = rows[i][8];
        const isLatest = rows[i][9];

        // register distinct db sources present in csv
        if (!matsPerSource[db]) {
          state.distinctDbSources.push(db);
          matsPerSource[db] = [];
        }

        matsPerSource[db].push({
          material,
          subtype,
          kgcO2,
          comments,
          density,
          wastage,
          densityAssumption,
          wasteReference,
          isLatest,
        });
      }

      state.matsPerSource = matsPerSource;
    },
    SET_SELECTED_DB_SOURCE(state, dbSource) {
      if (!state.distinctDbSources || !state.distinctDbSources.length) {
        state.selectedDbSource = "none";
      } else if (dbSource) {
        state.selectedDbSource = dbSource;
      } else {
        // default
        state.selectedDbSource = state.distinctDbSources[0];
      }
    },
    SET_APP_STEP(state, step) {
      state.appStep = step;
    },
    SET_HADNOREPORTS(state, val) {
      state.hadNoReports = val;
    },
    SET_LEGEND(state, legend) {
      state.legend = legend;
    },
    SET_CONSTRUCTION_COST(state, amount) {
      state.report.constructionCost = amount;
    },
    SET_REPORT(state, report) {
      state.report = report;
    },

    SET_VOL_KEY(state, volKey) {
      state.volumeKey = volKey;
    },

    SET_VOL_CONV(state, num) {
      state.volumeConversionFactor = num;
    },

    // Streams
    ADD_STREAMS(state, streams) {
      streams.forEach(stream => {
        if (
          state.streams.findIndex(x => x.streamId === stream.streamId) === -1
        ) {
          // defensive code (vue 3.0 we're off to typescript baby, can't wait)
          if (!stream.description) stream.description = "...";
          if (!stream.tags) stream.tags = [];
          state.streams.unshift(stream);
        }
      });
    },
    UPDATE_STREAM(state, props) {
      let found = state.streams.find(s => s.streamId === props.streamId);
      Object.keys(props).forEach(key => {
        found[key] = props[key];
      });
    },
    SET_STREAM(state, stream) {
      let found = state.streams.find(s => s.streamId === stream.streamId);
      if (!found) {
        state.streams.unshift(stream);
      } else {
        found = stream;
      }
    },
    UPDATE_STREAM_DATA(state, props) {
      let found = state.streams.find(s => s.streamId === props.streamId);
      if (props.layers) found.layers = props.layers;
    },
    DELETE_STREAM(state, stream) {
      let index = state.streams.findIndex(s => s.streamId === stream.streamId);
      if (index > -1) {
        state.streams.splice(index, 1);
      }
    },

    // state management for in viewer streams
    ADD_LOADED_STREAMID(state, streamId) {
      state.loadedStreamIds = [
        ...new Set([...state.loadedStreamIds, streamId]),
      ];
    },
    REMOVE_LOADED_STREAMID(state, streamId) {
      let index = state.loadedStreamIds.indexOf(streamId);
      if (index !== -1) state.loadedStreamIds.splice(index, 1);
      else
        console.warn(
          `Failed to remove loaded streamid: 
          ${streamId} 
          from 
          ${state.loadedStreamIds}`,
        );
    },

    // Clients
    ADD_CLIENTS(state, clients) {
      clients.forEach(client => {
        if (state.clients.findIndex(x => x._id === client._id) === -1) {
          state.clients.push(client);
        }
      });
    },

    ADD_DE_STREAM(state, stream) {
      let found = state.deStreams.find(s => s.streamId === stream);
      if (!found) state.deStreams.push(stream);
      else {
        found.layers = stream.layers;
        found.objects = stream.objects;
      }
    },
    ADD_DE_STREAM_LAYER(state, stream) {
      let found = state.deStreams.find(s => s.streamId === stream.streamId);
      let newLayer = {
        name: `Param group ${found.layers.length + 1}`,
        orderIndex: found.layers.length,
        startIndex: found.objects.length,
        objectCount: 0,
        topology: "0-0",
        guid: uuid(),
      };
      found.layers.push(newLayer);
    },
    UPDATE_DE_STREAM_LAYER(state, { streamId, layer, objects }) {
      let found = state.deStreams.find(s => s.streamId === streamId);
      let surpassed = false,
        objectCountDifference = 0;

      found.layers.forEach(iterLayer => {
        if (surpassed) {
          iterLayer.startIndex += objectCountDifference;
        } else if (iterLayer.guid === layer.guid) {
          iterLayer.name = layer.name;
          iterLayer.topology = `0-${objects.length}`;
          objectCountDifference = objects.length - iterLayer.objectCount;
          found.objects.splice(
            iterLayer.startIndex,
            iterLayer.objectCount,
            ...objects,
          );
          iterLayer.objectCount = objects.length;
          surpassed = true;
        }
      });
    },
    REMOVE_DE_STREAM_LAYER(state, { streamId, layer }) {
      let found = state.deStreams.find(s => s.streamId === streamId);
      // dump objects
      found.objects.splice(layer.startIndex, layer.objectCount);
      // adjust start indexes
      let surpassed = false;
      found.layers.forEach(iterLayer => {
        if (surpassed) {
          iterLayer.startIndex -= layer.objectCount;
          iterLayer.orderIndex -= 1;
        } else if (iterLayer.guid === layer.guid) surpassed = true;
      });
      // dump layer
      found.layers = found.layers.filter(l => l.guid !== layer.guid);
    },
    APPEND_DE_STREAM_LAYERS_FROM_CSV(state, { streamId, transposed }) {
      let found = state.deStreams.find(s => s.streamId === streamId);
      let index = 0;
      for (let arr of transposed) {
        let newLayer = {
          name: arr[0] !== "" ? arr[0] : "Unnamed",
          orderIndex: -1, // to be set properly afterwards
          startIndex: index === 0 ? found.objects.length : found.objects.length,
          objectCount: arr.length - 1,
          topology: `0-${arr.length - 1}`,
          guid: uuid(),
        };
        found.layers.push(newLayer);
        let noHeader = arr.slice(1, arr.length);
        found.objects.push(
          ...noHeader.map(val => {
            if (!val)
              return {
                type: "Null",
                value: "",
              };
            if (typeof val === "boolean")
              return {
                type: "Boolean",
                value: val,
              };
            if (typeof val === "number")
              return {
                type: "Number",
                value: val,
              }; // TODO: Hash it please
            if (typeof val === "string")
              return {
                type: "String",
                value: val,
              }; // TODO: Hash it please
          }),
        );
        index++;
      }
      found.layers.forEach((layer, k) => {
        layer.orderIndex = k;
      });
    },

    // OBJECTS
    ADD_OBJECTS(state, objects) {
      state.objects.push(...objects);
    },
    UPDATE_OBJECTS_STREAMS(state, { objIds, streamToAdd, streamToRemove }) {
      objIds.forEach(id => {
        let myObject = state.objects.find(o => o._id === id);
        if (myObject) {
          if (streamToAdd && myObject.streams.indexOf(streamToAdd) === -1)
            myObject.streams.push(streamToAdd);
          if (streamToRemove) {
            let index = myObject.streams.indexOf(streamToRemove);
            if (index !== -1) myObject.streams.splice(index, 1);
          }
        }
      });
    },
    REMOVE_OBJECTS(state, objectIds) {
      state.objects = state.objects.filter(
        obj => objectIds.indexOf(obj._id) === -1,
      );
    },
    UPDATE_OBJECTS_MATERIALS(state, { objectIds, material }) {
      objectIds.forEach(id => {
        let myObject = state.objects.find(o => o._id === id);
        myObject.properties.material_name = `${material.material ||
          material.Material} - ${material.subType || material.Subtype}`;
        window.renderer.updateObjectsProperties({
          objects: [myObject],
        });
      });
    },

    UPDATE_OBJECTS_VOLUME(state, { objectIds, volumes }) {
      objectIds.forEach((id, index) => {
        let myObject = state.objects.find(o => o._id === id);
        let newProps = {
          ...myObject.properties,
        };
        newProps.volume = volumes[index];
        Vue.set(myObject, "properties", newProps);
      });
    },

    SET_OBJECT(state, clone) {
      let myObjectIndex = state.objects.indexOf(o => o._id === clone._id);

      let copy = [...state.objects];
      copy[myObjectIndex] = clone;

      //Triggers an udpate to the Vue store state
      Vue.set(state, "objects", copy);
    },

    // Selected objects setters
    SET_SELECTED_OBJECTS(state, { objectIds }) {
      if (objectIds.length > 0)
        state.selectedObjects = [
          ...new Set([...state.selectedObjects, ...objectIds]),
        ];
      else state.selectedObjects = [];
    },
    ADD_SELECTED_OBJECTS(state, { objectIds }) {
      state.selectedObjects = [
        ...new Set([...state.selectedObjects, ...objectIds]),
      ];
    },
    REMOVE_SELECTED_OBJECTS(state, { objectIds }) {
      objectIds.forEach(id => {
        let index = state.selectedObjects.indexOf(id);
        if (index !== -1) state.selectedObjects.splice(index, 1);
      });
    },
    FLUSH_SELECTED_OBJECTS(state) {
      state.selectedObjects = [];
    },
    // Projects
    ADD_PROJECTS(state, projects) {
      projects.forEach(project => {
        if (state.projects.findIndex(p => p._id === project._id) === -1) {
          // potentially enforce here extra fields
          if (!project.tags) project.tags = [];
          if (!project.deleted) project.deleted = false;
          state.projects.unshift(project);
        }
      });
    },
    UPDATE_PROJECT(state, props) {
      let found = state.projects.find(p => p._id === props._id);
      Object.keys(props).forEach(key => {
        found[key] = props[key];
      });
    },
    DELETE_PROJECT(state, props) {
      let index = state.projects.findIndex(p => p._id === props._id);
      if (index > -1) {
        state.projects.splice(index, 1);
      }
    },

    // Users
    ADD_USER(state, user) {
      let found = state.users.find(u => u._id === user._id);
      if (!found) state.users.unshift(user);
      else found = user; // update the user
    },
    ADD_USERS(state, users) {
      users.forEach(user => {
        let found = state.users.find(u => u._id === user._id);
        if (!found) state.users.unshift(user);
        else found = user; // update the user
      });
    },
    UPDATE_LUSER(state, user) {
      let found = null;
      if (user._id === state.user._id) found = state.user;
      else found = state.users.find(u => u._id === user._id);
      if (!found) return console.error("User not found; aborting update.");
      Object.keys(user).forEach(key => {
        found[key] = user[key];
      });
    },

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
    SET_WEB_APP_CLIENT(state, client) {
      state.client = client;
    },
    FLUSH_STREAMS(state) {
      let allObjectIds = state.objects.map(({ _id }) => _id);
      window.renderer.unloadObjects({
        objIds: allObjectIds,
      });

      state.selectedObjects = [];
      state.loadedStreamIds = [];
      state.objects = [];
      state.deStreams = [];
      state.projects = [];
    },
    // End of life
    FLUSH_ALL(state) {
      state.token = null;
      state.user = {};
      state.streams = [];
      state.objects = [];
      state.deStreams = [];
      state.projects = [];
      state.clients = [];
      state.users = [];
      state.comments = [];
      state.isAuth = false;
    },
  },
  actions: {
    // Streams
    getStream(context, props) {
      if (props.server) {
        // Login flow circumvented, use prop to determine and set server
        Axios.defaults.baseURL = props.server;
      }

      return new Promise((resolve, reject) => {
        Axios.get(`/streams/${props.streamId}?omit=objects`)
          .then(res => {
            context.commit("ADD_STREAMS", [res.data.resource]);
            return resolve(res.data.resource);
          })
          .catch(err => {
            console.error("getStream: ", err);
            return reject(err);
          });
      });
    },
    getStreams(context, query) {
      return new Promise((resolve, reject) => {
        Axios.get(`streams?${query ? query : ""}`)
          .then(res => {
            context.commit("ADD_STREAMS", res.data.resources);
            if (
              res.data.resources.filter(stream =>
                stream.hasOwnProperty("isCarbonReport"),
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
    },
    createStream(context, stream) {
      return new Promise((resolve, reject) => {
        Axios.post(`streams`)
          .then(res => {
            stream.streamId = res.data.resource.streamId;
            res.data.resource.onlineEditable = true;
            context.commit("ADD_STREAMS", [res.data.resource]);
            return Axios.put(`streams/${res.data.resource.streamId}`, stream);
          })
          .then(() => {
            context.commit("UPDATE_STREAM", stream);
            return resolve(stream);
          })
          .catch(err => {
            console.error(err);
            return reject(err);
          });
      });
    },
    // client for ws ids, etc.
    createClient: context =>
      new Promise((resolve, reject) => {
        // NOTE: This is a stupid hack. To get a temp client, we need to be not auhtorised : /
        delete Axios.defaults.headers.common["Authorization"];

        Axios.post(`clients`, {
          role: "online-client",
          documentName: "Online interface",
          documentType: "browser",
          online: true,
        })
          .then(res => {
            context.commit("SET_WEB_APP_CLIENT", res.data.resource);
            return resolve(res.data.resource);
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
        // set the headers back. man what a stupid hack this is...
        Axios.defaults.headers.common["Authorization"] = context.state.token;
      }),
    createStreamSimple(_context, stream) {
      return new Promise((resolve, reject) => {
        Axios.post(`streams`, stream)
          .then(res => {
            return resolve(res.data.resource);
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      });
    },
    updateStream(context, props) {
      Axios.put(`streams/${props.streamId}`, props)
        .then(() => {
          context.commit("UPDATE_STREAM", props);
        })
        .catch(err => {
          console.warn(err);
        });
    },
    // For data-editable streams only
    updateStreamObjectsAndLayers: (context, { streamId, commitMessage }) =>
      new Promise((resolve, reject) => {
        let found = context.state.deStreams.find(s => s.streamId === streamId);
        if (!found) return reject(new Error("Stream not found in store."));

        found.commitMessage =
          commitMessage +
          ` (changed by ${context.state.user.name} 
            ${context.state.user.surname})`;
        found.lastChangedBy = context.state.user._id;

        context.commit("UPDATE_STREAM", {
          streamId: streamId,
          commitMessage: commitMessage,
        });

        Axios.post(`streams/${streamId}/clone`)
          .then(res => {
            let originalStream = context.state.streams.find(
              s => s.streamId === streamId,
            );
            context.commit("UPDATE_STREAM", {
              streamId: streamId,
              children: [...originalStream.children, res.data.clone.streamId],
            });
            return Axios.put(`streams/${streamId}`, found);
          })
          .then(res => resolve(res))
          .catch(err => reject(err));
      }),
    getStreamClients(context, props) {
      Axios.get(`streams/${props.streamId}/clients`)
        .then(res => {
          context.commit("ADD_CLIENTS", res.data.resources);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteStream(context, payload) {
      // TODO: https://github.com/speckleworks/SpeckleAdmin/issues/19
      Axios.delete(`streams/${payload.streamId}`)
        .then(() => {
          context.commit("DELETE_STREAM", {
            streamId: payload.streamId,
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // objects
    getStreamObjectsIds(context, streamId) {
      return new Promise((resolve, reject) => {
        Axios.get(`streams/${streamId}?fields=objects,layers`)
          .then(res => {
            let ids = res.data.resource.objects.map(o => o._id);
            context.commit("UPDATE_STREAM", {
              streamId: streamId,
              objects: ids,
              layers: res.data.resource.layers,
            });
            resolve(ids);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getObjects(context, objectIds) {
      return new Promise(resolve => {
        Axios.post(
          `objects/getbulk?omit=base64,rawData,canRead,canWrite,children,anonymousComments,name`,
          objectIds,
        )
          .then(res => {
            // context.state.objects.push( ...res.data.resources )
            // context.commit( 'ADD_OBJECTS', res.data.resources )
            resolve(res.data.resources);
          })
          .catch(() => {
            resolve();
            // return reject( err.message )
          });
      });
    },
    createObjects(context, objectIds) {
      return new Promise((resolve, reject) => {
        Axios.post("/objects", objectIds)
          .then(res => {
            return resolve(res.data.resources);
          })
          .catch(e => {
            console.error("createObjects: ", e);
            return reject(e);
          });
      });
    },
    // projects
    getProject(context, props) {
      return new Promise((resolve, reject) => {
        Axios.get(`projects/${props._id}`)
          .then(res => {
            context.commit("ADD_PROJECTS", [res.data.resource]);
            return resolve(res);
          })
          .catch(err => {
            console.error(err);
            return reject(err);
          });
      });
    },
    getProjects(context, query) {
      return new Promise((resolve, reject) => {
        Axios.get(`projects?${query ? query : ""}`)
          .then(res => {
            context.commit("ADD_PROJECTS", res.data.resources);
            return resolve(res.data.resources);
          })
          .catch(err => {
            console.log(err);
            return reject(err);
          });
      });
    },
    createProject(context, project) {
      return new Promise((resolve, reject) => {
        Axios.post(
          `projects`,
          project
            ? project
            : {
                name: "A new speckle project",
              },
        )
          .then(res => {
            context.commit("ADD_PROJECTS", [res.data.resource]);
            return resolve(res.data.resource);
          })
          .catch(err => {
            console.log(err);
            return reject(err);
          });
      });
    },
    updateProject(context, props) {
      Axios.put(`projects/${props._id}`, props)
        .then(() => {
          context.commit("UPDATE_PROJECT", props);
        })
        .catch(err => {
          console.warn(err);
        });
    },
    addUserToProject: (context, { projectId, userId }) =>
      new Promise((resolve, reject) => {
        let project = context.state.projects.find(p => p._id === projectId);
        if (!project)
          return reject(new Error("Failed to find project in state."));

        Axios.put(`projects/${projectId}/adduser/${userId}`)
          .then(() => {
            let permissions = {
              canWrite: [...new Set([...project.permissions.canWrite, userId])],
              canRead: project.permissions.canRead,
            };
            let canRead = [...new Set([...project.canRead, userId])];
            context.commit("UPDATE_PROJECT", {
              _id: projectId,
              permissions: permissions,
              canRead: canRead,
            });
            project.streams.forEach(streamId => {
              let myStream = context.state.streams.find(
                s => s.streamId === streamId,
              );
              context.commit("UPDATE_STREAM", {
                streamId: streamId,
                canWrite: uniq([...myStream.canWrite, userId]),
              });
            });
            return resolve();
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      }),
    upgradeUserInProject: (context, { projectId, userId }) =>
      new Promise((resolve, reject) => {
        let project = context.state.projects.find(p => p._id === projectId);
        if (!project)
          return reject(new Error("Failed to find project in state."));
        Axios.put(`projects/${projectId}/upgradeuser/${userId}`)
          .then(() => {
            context.commit("UPDATE_PROJECT", {
              _id: projectId,
              permissions: {
                canRead: uniq([...project.canRead, userId]),
                canWrite: uniq([...project.canWrite, userId]),
              },
            });
            project.streams.forEach(streamId => {
              let myStream = context.state.streams.find(
                s => s.streamId === streamId,
              );
              context.commit("UPDATE_STREAM", {
                streamId: streamId,
                canWrite: uniq([...myStream.canWrite, userId]),
                canRead: uniq([...myStream.canRead, userId]),
              });
            });
            return resolve();
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      }),
    downgradeUserInProject: (context, { projectId, userId }) =>
      new Promise((resolve, reject) => {
        let project = context.state.projects.find(p => p._id === projectId);
        if (!project)
          return reject(new Error("Failed to find project in state."));
        Axios.put(`projects/${projectId}/downgradeuser/${userId}`)
          .then(res => {
            context.commit("UPDATE_PROJECT", {
              _id: projectId,
              permissions: res.data.project.permissions,
            });
            res.data.streamsToAddReadAndPullWrite.forEach(streamId => {
              let myStream = context.state.streams.find(
                s => s.streamId === streamId,
              );
              context.commit("UPDATE_STREAM", {
                streamId: streamId,
                canWrite: myStream.canWrite.filter(id => id !== userId),
                canRead: uniq([...myStream.canRead, userId]),
              });
            });
            res.data.streamsToAddToRead.forEach(streamId => {
              let myStream = context.state.streams.find(
                s => s.streamId === streamId,
              );
              context.commit("UPDATE_STREAM", {
                streamId: streamId,
                canRead: uniq([...myStream.canRead, userId]),
              });
            });
            return resolve();
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      }),
    removeUserInProject: (context, { projectId, userId }) =>
      new Promise((resolve, reject) => {
        let project = context.state.projects.find(p => p._id === projectId);
        if (!project)
          return reject(new Error("Failed to find project in state."));
        Axios.delete(`projects/${projectId}/removeuser/${userId}`)
          .then(res => {
            context.commit("UPDATE_PROJECT", {
              _id: projectId,
              canRead: res.data.project.canRead,
              canWrite: res.data.project.canWrite,
              permissions: res.data.project.permissions,
            });
            res.data.streamsToPullBothFrom.forEach(streamId => {
              let myStream = context.state.streams.find(
                s => s.streamId === streamId,
              );
              context.commit("UPDATE_STREAM", {
                streamId: streamId,
                canRead: myStream.canRead.filter(id => id !== userId),
                canWrite: myStream.canWrite.filter(id => id !== userId),
              });
            });
            res.data.streamsToPullWriteFrom.forEach(streamId => {
              let myStream = context.state.streams.find(
                s => s.streamId === streamId,
              );
              context.commit("UPDATE_STREAM", {
                streamId: streamId,
                canWrite: myStream.canWrite.filter(id => id !== userId),
              });
            });
            res.data.streamsToPullReadFrom.forEach(streamId => {
              let myStream = context.state.streams.find(
                s => s.streamId === streamId,
              );
              context.commit("UPDATE_STREAM", {
                streamId: streamId,
                canRead: myStream.canRead.filter(id => id !== userId),
              });
            });
            return resolve();
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      }),
    addStreamToProject: (context, { projectId, streamId }) =>
      new Promise((resolve, reject) => {
        let project = context.state.projects.find(p => p._id === projectId);
        if (!project)
          return reject(new Error("Failed to find project in state."));

        Axios.put(`projects/${projectId}/addstream/${streamId}`)
          .then(res => {
            context.commit("UPDATE_PROJECT", {
              _id: projectId,
              streams: res.data.project.streams,
            });
            context.commit("UPDATE_STREAM", {
              streamId: streamId,
              canRead: res.data.stream.canRead,
              canWrite: res.data.stream.canWrite,
            });
            return resolve();
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      }),
    removeStreamFromProject: (context, { projectId, streamId }) =>
      new Promise((resolve, reject) => {
        let project = context.state.projects.find(p => p._id === projectId);
        if (!project)
          return reject(new Error("Failed to find project in state."));

        Axios.delete(`projects/${projectId}/removestream/${streamId}`)
          .then(res => {
            context.commit("UPDATE_PROJECT", {
              _id: projectId,
              streams: res.data.project.streams,
            });
            context.commit("UPDATE_STREAM", {
              streamId: streamId,
              canRead: res.data.stream.canRead,
              canWrite: res.data.stream.canWrite,
            });
            return resolve();
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      }),
    deleteProject: (context, props) =>
      new Promise((resolve, reject) => {
        Axios.delete(`projects/${props._id}`)
          .then(res => {
            context.commit("DELETE_PROJECT", {
              _id: props._id,
            });
            for (let stream of res.data.modifiedStreams) {
              context.commit("UPDATE_STREAM", {
                streamId: stream.streamId,
                canRead: stream.canRead,
                canWrite: stream.canWrite,
              });
            }
            return resolve();
          })
          .catch(err => {
            console.warn(err);
            return reject(err);
          });
      }),

    // users
    getUser(context, payload) {
      return new Promise((resolve, reject) => {
        let found = context.state.users.find(u => u._id === payload._id);
        if (found) return resolve(found);
        Axios.get(`accounts/${payload._id}`)
          .then(res => {
            if (context.state.user._id === payload._id)
              res.data.resource.surname += " (that is you!)";
            context.commit("ADD_USER", res.data.resource);
            return resolve(res.data.resource);
          })
          .catch(err => {
            return reject(err);
          });
      });
    },

    updateLoggedInUser: (context, payload) =>
      new Promise((resolve, reject) => {
        Axios.put(`accounts`, payload)
          .then(res => {
            context.commit("UPDATE_LUSER", payload);
            return resolve(res);
          })
          .catch(err => reject(err));
      }),

    // Auth
    authenticate: (context, payload) =>
      // eslint-disable-next-line
      new Promise(async (resolve, reject) => {
        try {
          let userProfile = await Axios.get(
            new URL("/api/accounts", payload.server),
            {
              headers: {
                Authorization: payload.token,
              },
            },
          );
          context.commit("SET_TOKEN", payload.token);
          context.commit("SET_USER", userProfile.data.resource);
          context.commit("SET_SERVER", new URL("/api", payload.server));

          let serverDetails = await Axios.get(`${payload.server}`);
          context.commit("SET_SERVER_DETAILS", serverDetails.data);

          Axios.defaults.headers.common["Authorization"] = payload.token;
          Axios.defaults.baseURL = `${payload.server}`;

          localStorage.setItem("token", payload.token);

          return resolve();
        } catch (err) {
          console.log(err);
          return reject(err.message);
        }
      }),

    // Auth
    login(context, payload) {
      return new Promise((resolve, reject) => {
        Axios.post("accounts/login", {
          email: payload.email,
          password: payload.password,
        })
          .then(res => {
            context.commit("SET_TOKEN", res.data.resource.token);
            context.commit("SET_USER", res.data.resource);
            // save them for later
            localStorage.setItem("token", res.data.resource.token);
            Axios.defaults.headers.common["Authorization"] =
              res.data.resource.token;
            return resolve(res.data.resource);
          })
          .catch(err => {
            return reject(err);
          });
      });
    },
    logout(context) {
      context.commit("FLUSH_ALL");
      localStorage.removeItem("token");
      Axios.defaults.headers.common["Authorization"] = "";
    },
  },
});
