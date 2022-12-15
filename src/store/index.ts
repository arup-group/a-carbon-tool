import Vue from "vue";
import Vuex from "vuex";
import * as speckleUtil from "./speckle/speckleUtil";
import { loadStream, LoadStreamOut } from "@/views/utils/viewAssessmentUtils";
import { Login, Server, AuthError, Token, ServerRegion, CustomServerStorage } from "@/models/auth/";
import router from "@/router";
import {
  materialCarbonFactors,
  MaterialFull,
  RegionMaterialCarbonFactors,
  AllMaterialCarbonFactors,
} from "./utilities/material-carbon-factors";
import {
  ProjectDataComplete,
  ReportTotals,
  SpeckleObjectComplete,
  TransportType,
} from "@/models/newAssessment";

import { BECName } from "@/models/shared";
import { ParentSpeckleObjectData } from "@/models/graphql/StreamData.interface";
import { filterOnlyReportBranches } from "./utilities/filters";
import {
  StreamNameBranches,
  StreamReferenceBranches,
  StreamReferenceObjects,
} from "@/models/graphql";
import { BranchItem } from "@/models/graphql/StreamReferenceBranches.interface";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "0.8.3 \u00DF",
    speckleFolderName: "actcarbonreport",
    speckleViewer: {
      viewer: undefined,
      container: undefined
    },
    servers: {
      arup: {
        region: ServerRegion.UKIMEA,
        url: "https://v2.speckle.arup.com",
        speckleId: process.env.VUE_APP_SPECKLE_ID_ARUP,
        speckleSecret: process.env.VUE_APP_SPECKLE_SECRET_ARUP,
      },
      xyz_server: {
        region: ServerRegion.XYZ,
        url: "https://speckle.xyz",
        speckleId: process.env.VUE_APP_SPECKLE_ID_XYZ,
        speckleSecret: process.env.VUE_APP_SPECKLE_SECRET_XYZ,
      },
      custom: {
        region: ServerRegion.CUSTOM,
        url: "",
        speckleId: process.env.VUE_APP_SPECKLE_ID_CUSTOM,
        speckleSecret: process.env.VUE_APP_SPECKLE_SECRET_CUSTOM,
      }
    },
    selectedServer: {} as Server, // should be a server object
    token: {} as Token, // should be a Token object
    authed: false,
    user: null,
    serverInfo: null,

    darkMode: localStorage.getItem("darkMode")
      ? localStorage.getItem("darkMode") === "true"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,

    // Carbon data
    selectedRegion: "UK",
    availableRegions: ["India", "Netherlands", "UK"],
    becs: [
      {
        name: "Superstructure" as BECName,
        color: "white",
        backgroundColor: "#224a63",
      },
      {
        name: "Substructure" as BECName,
        color: "black",
        backgroundColor: "#aeebdb",
      },
      {
        name: "Mechanical Services" as BECName,
        color: "black",
        backgroundColor: "#f0b4b4",
      },
      {
        name: "Electrical Services" as BECName,
        color: "white",
        backgroundColor: "#754792",
      },
      {
        name: "Public Health & Hydraulics" as BECName,
        color: "black",
        backgroundColor: "#dbb5ea",
      },
      {
        name: "Space plan" as BECName,
        color: "white",
        backgroundColor: "#4b97d2",
      },
      {
        name: "Building Envelope" as BECName,
        color: "black",
        backgroundColor: "#82c7f1",
      },
    ],
    materialCategories: [
      "Aluminium",
      "Brick",
      "Blockwork",
      "Cement",
      "Coating",
      "Concrete",
      "Copper",
      "Fire",
      "Fill Materials",
      "Glass",
      "Gypsum",
      "Insulation",
      "Natural materials",
      "Plasterboard",
      "Plastic",
      "Soil",
      "Steel",
      "Stone",
      "Timber",
    ],
    transportTypes: [
      {
        name: "local",
        color: "#53ac8b",
        values: {
          road: 50,
          rail: 0,
          sea: 0,
        },
      },
      {
        name: "regional",
        color: "#2d8486",
        values: {
          road: 300,
          rail: 0,
          sea: 0,
        },
      },
      {
        name: "global",
        color: "#683a78",
        values: {
          road: 200,
          rail: 0,
          sea: 10000,
        },
      },
      {
        name: "custom",
        color: "#1f9321",
        values: {
          road: 0,
          rail: 0,
          sea: 0,
        },
      },
    ] as TransportType[],
  },
  getters: {
    isAuthenticated: (state) => state.user != null,

    // needs updating to cover region selection
    materialsArr: (state): MaterialFull[] => {
      const region: keyof AllMaterialCarbonFactors =
        state.selectedRegion as keyof AllMaterialCarbonFactors;
      const tmparr = (
        Object.keys(materialCarbonFactors[region]) as Array<
          keyof RegionMaterialCarbonFactors
        >
      ).map((type) => {
        const arr: MaterialFull[] = [];
        Object.keys(materialCarbonFactors[region][type]).forEach((t) => {
          const material = materialCarbonFactors[region][type][t];
          const toPush: MaterialFull = {
            name: `${type} - ${t} (${
              Math.round(100 * material.productStageCarbonA1A3) / 100
            } kgCO2e/kg)`,
            ...material,
            color:
              "#" +
              (
                "000000" + Math.random().toString(16).slice(2, 8).toUpperCase()
              ).slice(-6), // generates random hex code for color, should be replaced at some point
          };
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

      if (data.server.region === ServerRegion.CUSTOM) {
        localStorage.setItem(CustomServerStorage.LAST_SERVER, JSON.stringify(data.server.url));
        const customServers = localStorage.getItem(CustomServerStorage.CUSTOM_SERVERS);
        let customServersJson: string[]; // array of server urls
        if (customServers) customServersJson = JSON.parse(customServers);
        else customServersJson = [];
        customServersJson.push(data.server.url);
        localStorage.setItem(CustomServerStorage.CUSTOM_SERVERS, JSON.stringify(customServersJson));
      }
    },
    setSpeckleViewer(state, viewer) {
      state.speckleViewer = viewer;
    },
    setUser(state, user) {
      state.user = user;
    },
    setServerInfo(state, info) {
      state.serverInfo = info;
    },
    setDarkMode(state) {
      localStorage.setItem("darkMode", `${!state.darkMode}`);
      state.darkMode = !state.darkMode;
    },
    setRegion(state, region) {
      state.selectedRegion = region;
    },
  },
  actions: {
    changeRegion(context, region) {
      context.commit("setRegion", region);
    },

    // Auth
    logout(context) {
      // wipe the state
      context.commit("logout");

      // wipe the tokens
      speckleUtil.speckleLogOut();

      router.push("login");
    },
    async exchangeAccessCode(context, accessCode: string) {
      const server = speckleUtil.getServer(context);

      const token = await speckleUtil.exchangeAccessCode(accessCode, server);
      context.commit("login", {
        token,
        server,
      });
    },
    redirectToAuth(context, server: Server) {
      speckleUtil.goToSpeckleAuthpage(server);
    },
    async getUser(context) {
      try {
        if (
          Object.keys(context.state.selectedServer).length === 0 ||
          Object.keys(context.state.token).length === 0
        ) {
          const server = speckleUtil.getServer(context);
          const token = speckleUtil.getToken();
          context.commit("login", {
            token,
            server,
          });
        }
        const json = await speckleUtil.getUserData(context);
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
      const streams = await speckleUtil.getUserStreams(context);
      return streams;
    },
    async getStreamObjects(context, streamid: string) {
      const streams = await speckleUtil.getStreamObjects(context, streamid);
      return streams;
    },
    async deleteBranch(context, input: DeleteBranchInput) {
      const branch: any = await speckleUtil.deleteBranch(
        context,
        input.streamid,
        input.branchid
      );
      return branch;
    },
    async getStreamBranches(
      context,
      streamid: string
    ): Promise<GetStreamBranchesOutput> {
      const branches: StreamReferenceBranches =
        await speckleUtil.getStreamBranches(context, streamid);

      const oldBranch = branches.data.stream.branches.items.find(
        (i) => i.name === context.state.speckleFolderName
      );
      const reportBranches = filterOnlyReportBranches(
        context,
        branches.data.stream.branches.items
      );
      const mainReport = reportBranches.find(
        (b) => b.name === `${context.state.speckleFolderName}/main`
      );
      if (oldBranch && !mainReport)
        speckleUtil.convOldReport(context, streamid, oldBranch);
      const mainBranch = branches.data.stream.branches.items.find(
        (i) => i.name === "main"
      );
      return {
        reportBranches,
        mainBranch: mainBranch
          ? mainBranch
          : {
              id: "",
              name: "",
              createdAt: "",
              commits: { items: [] },
            },
      };
    },

    async getStreamCommit(
      context,
      { streamid, branchName }: GetStreamCommitInput
    ): Promise<StreamReferenceObjects> {
      const streams = await speckleUtil.getStreamCommit(
        context,
        streamid,
        branchName
      );
      return streams;
    },

    async getMainStreamCommit(context, streamid: string) {
      const streams = await speckleUtil.getMainStreamCommit(context, streamid);
      return streams;
    },
    async getStreamName(context, streamid: string) {
      return await speckleUtil.getStreamName(context, streamid);
    },

    async getBranchData(context, { streamid, objId }: GetBranchDataInputs) {
      const streams = await speckleUtil.getBranchData(context, streamid, objId);
      return streams;
    },

    async getActReportBranchInfo(
      context,
      { streamid, branchName }: GetActReportBranchInfoInput
    ) {
      const actReportBranchInfo = await speckleUtil.getActReportBranchInfo(
        context,
        streamid,
        branchName
      );
      return actReportBranchInfo;
    },
    async loadActReportData(
      context,
      { streamId, branchName }: LoadActReportDataInput
    ) {
      return await loadStream(
        context,
        streamId,
        `${context.state.speckleFolderName}/${branchName}`
      );
    },
    async carbonStreams(context) {
      return await speckleUtil.carbonStreams(context);
    },
    async getObjectUrls(context, streamid: string) {
      const objectIds = await speckleUtil.getStreamObjects(context, streamid);

      return objectIds.data.stream.branch.commits.items.map((item) => {
        return `${context.state.selectedServer.url}/streams/${streamid}/objects/${item.referencedObject}`;
      });
    },

    setDarkMode({ commit }) {
      commit("setDarkMode");
    },

    async getObjectDetails(
      context,
      { streamid, objecturl }: ObjectDetailsInput
    ) {
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
    async uploadReport(
      context,
      {
        streamid,
        objects,
        reportTotals,
        projectData,
        branchName,
      }: UploadReportInput
    ) {
      branchName = `${context.state.speckleFolderName}/${branchName}`;

      // TODO: ADD ERROR HANDLING
      const uploadObjectsRes: UploadObjectsRes =
        await speckleUtil.uploadObjects(context, streamid, objects);
      const children = uploadObjectsRes.data.objectCreate;
      const formData = new FormData();
      // below line means that some objects may be given duplicate strings and the report won't save properly
      const objectid = `${new Date().getTime().toString()}-act`;
      const objectData: ParentSpeckleObjectData = {
        id: objectid,
        speckleType: "act-totals",
        speckle_type: "act-totals",
        transportCarbonA4: reportTotals.transportCarbonA4,
        productStageCarbonA1A3: reportTotals.productStageCarbonA1A3,
        constructionCarbonA5: reportTotals.constructionCarbonA5,
        totalCO2: reportTotals.totalCO2,
        volume: reportTotals.volume,
        projectData,
        totalChildrenCount: 0,
      };
      formData.append(
        "batch1",
        new Blob([
          JSON.stringify([
            {
              ...objectData,
              __closure: Object.fromEntries(children.map((c) => [c, 1])),
            },
          ]),
        ])
      );
      await fetch(`${context.state.selectedServer.url}/objects/${streamid}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${context.state.token.token}`,
        },
        body: formData,
      });
      // TODO: DELETE BRANCH FIRST TO ENSURE THE BRANCH ONLY CONTAINS OBJECTS FROM MOST RECENT REPORT
      const createBranch: SpeckleBranchRes =
        await speckleUtil.createReportBranch(context, streamid, branchName);

      const totalChildrenCount = uploadObjectsRes.data.objectCreate.length;

      const createCommitRes: CreateCommitRes = await speckleUtil.createCommit(
        context,
        streamid,
        objectid,
        totalChildrenCount,
        branchName
      );
    },
    async checkContainsReport(context, streamid: string): Promise<boolean> {
      const queryRes = await speckleUtil.checkContainsBranch(
        context,
        streamid,
        `${context.state.speckleFolderName}/main`
      );

      return queryRes.data.stream.branch !== null;
    },
    async checkContainsChlidReport(
      context,
      { streamid, branchName }: CheckContainsChlidReportInput
    ) {
      const queryRes = await speckleUtil.checkContainsBranch(
        context,
        streamid,
        `${context.state.speckleFolderName}/${branchName}`
      );

      return queryRes.data.stream.branch !== null;
    },
    async getAllReportBranches(
      context,
      streamid: string
    ): Promise<GetAllReportBranchesOutput> {
      const branches = await speckleUtil.getStreamBranches(context, streamid);

      return filterOnlyReportBranches(
        context,
        branches.data.stream.branches.items
      ).map((b) => ({
        name: b.name.split("/")[1],
        id: b.id,
      }));
    },
    async getAllReportObjects(
      context,
      streamid: string
    ): Promise<GetAllReportObjectsOutputs> {
      const branches: GetAllReportBranchesOutput = await context.dispatch(
        "getAllReportBranches",
        streamid
      );

      const objects: GetAllReportObjectsOutputs = await Promise.all(
        branches.map(async (branch): Promise<GetAllReportObjectsOutput> => {
          const fullBranchName = `${context.state.speckleFolderName}/${branch.name}`;

          const data = await loadStream(context, streamid, fullBranchName);
          return {
            branch,
            data,
          };
        })
      );
      return objects;
    },

    async getStreamNameReportBranches(
      context,
      streamid: string
    ): Promise<GetStreamNameReportBranchesOutput> {
      const res: StreamNameBranches = await speckleUtil.streamNameBranches(
        context,
        streamid
      );
      const branches = filterOnlyReportBranches(
        context,
        res.data.stream.branches.items
      ).map((b) => b.name);
      return {
        streamName: res.data.stream.name,
        branches,
      };
    },
  },
  modules: {},
});

export interface GetStreamNameReportBranchesOutput {
  streamName: string;
  branches: string[];
}

export type GetAllReportBranchesOutput = GetAllReportBranchesOutputItem[];

export interface GetAllReportBranchesOutputItem {
  name: string;
  id: string;
}

export type GetAllReportObjectsOutputs = GetAllReportObjectsOutput[];

export interface GetAllReportObjectsOutput {
  branch: {
    id: string;
    name: string;
  };
  data: LoadStreamOut;
}

export interface GetStreamCommitInput {
  streamid: string;
  branchName: string;
}

export interface GetStreamBranchesOutput {
  reportBranches: BranchItem[];
  mainBranch: BranchItem;
}

export interface GetActReportBranchInfoInput {
  streamid: string;
  branchName: string;
}

export interface LoadActReportDataInput {
  streamId: string;
  branchName: string;
}

export interface CheckContainsChlidReportInput {
  streamid: string;
  branchName: string;
}

export interface GetBranchDataInputs {
  streamid: string;
  objId: string;
}

export interface DeleteBranchInput {
  streamid: string;
  branchid: string;
}

interface CreateCommitRes {
  data: {
    commitCreate: string;
  };
}

interface SpeckleBranchRes {
  error?: {
    message: string;
    locations: {
      line: number;
      column: number;
    }[];
    path: string[];
    extensions: {
      code: string;
      exception: {
        length: number;
        name: string;
        severity: string;
        code: string;
        detail: string;
        schema: string;
        table: string;
        constraint: string;
        file: string;
        line: string;
        routine: string;
      };
    };
  }[];
  data: {
    branchCreate: string;
  };
}

interface UploadObjectsRes {
  data: {
    objectCreate: string[];
  };
}

export interface UploadReportInput {
  streamid: string;
  objects: SpeckleObjectComplete[];
  reportTotals: ReportTotals;
  projectData: ProjectDataComplete;
  branchName: string;
}

interface ObjectDetailsInput {
  streamid: string;
  objecturl: string;
}
