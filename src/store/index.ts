import Vue from "vue";
import Vuex from "vuex";
import * as speckleUtil from "./speckle/speckleUtil";
import {
  LoadStreamOut,
  getChildren,
} from "@/views/utils/process-report-object";
import { loadParent, loadStream } from "@/views/utils/viewAssessmentUtils";
import {
  Login,
  Server,
  AuthError,
  Token,
  ServerRegion,
  CustomServerStorage,
} from "@/models/auth/";
import router from "@/router";
import {
  materialCarbonFactors,
  MaterialFull,
  RegionMaterialCarbonFactors,
  AllMaterialCarbonFactors,
  Material,
} from "./utilities/material-carbon-factors";
import {
  ProjectDataComplete,
  ReportTotals,
  SpeckleObjectComplete,
  TransportType,
} from "@/models/newAssessment";

import { BECName } from "@/models/shared";
import {
  ParentSpeckleObjectData,
  ParentSpeckleObjectDataV2,
} from "@/models/graphql/StreamData.interface";
import { filterOnlyReportBranches } from "./utilities/filters";
import {
  StreamNameBranches,
  StreamReferenceBranches,
  StreamReferenceObjects,
} from "@/models/graphql";
import { BranchItem } from "@/models/graphql/StreamReferenceBranches.interface";
import {
  AddParamsModel,
  IChildObject,
  IdMapper,
  IParamsParent,
} from "@/views/utils/add-params/addParams";
import { ExcelData, exportToMaterial } from "@/views/utils/ExcelImportUtils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "0.12.0 \u00DF",
    speckleFolderName: "actcarbonreport",
    speckleViewer: {
      viewer: undefined,
      container: undefined,
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
      },
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
    selectedRegion: { key: "UK", name: "UK" } as Region,
    availableRegions: [
      { key: "India", name: "India" },
      { key: "Netherlands", name: "Netherlands" },
      { key: "UK", name: "UK" },
    ] as Region[],
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
      const region: keyof AllMaterialCarbonFactors = state.selectedRegion
        .key as keyof AllMaterialCarbonFactors;
      const tmparr = (
        Object.keys(materialCarbonFactors[region]) as Array<
          keyof RegionMaterialCarbonFactors
        >
      ).map((type) => {
        const arr: MaterialFull[] = [];
        Object.keys(materialCarbonFactors[region][type]).forEach((t) => {
          const material = materialCarbonFactors[region][type][t];
          const toPush: MaterialFull = {
            ...material,
            name: `${type} - ${t} (${
              Math.round(100 * material.productStageCarbonA1A3) / 100
            } kgCO2e/kg)`,
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
        localStorage.setItem(
          CustomServerStorage.LAST_SERVER,
          JSON.stringify(data.server.url)
        );
        const customServers = localStorage.getItem(
          CustomServerStorage.CUSTOM_SERVERS
        );
        let customServersJson: string[]; // array of server urls
        if (customServers) customServersJson = JSON.parse(customServers);
        else customServersJson = [];
        customServersJson.push(data.server.url);
        localStorage.setItem(
          CustomServerStorage.CUSTOM_SERVERS,
          JSON.stringify(customServersJson)
        );
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
    addRegion(state, region: Region) {
      state.availableRegions.push(region);
    },
    setRegion(state, region) {
      state.selectedRegion = region;
    },
  },
  actions: {
    changeRegion(context, key) {
      const region = context.state.availableRegions.find((r) => r.key === key);
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
          if (server == null || token.token == null) {
            throw new Error(AuthError.NOT_SIGNED_IN);
          }
          context.commit("login", {
            token,
            server,
          });
        }
        const json = await speckleUtil.getUserData(context);
        const data = json.data;
        context.commit("setUser", data.user);
        context.commit("setServerInfo", data.serverInfo);
      } catch (err: any) {
        console.error(err);
        if (
          err === AuthError.NOT_SIGNED_IN ||
          err.message === AuthError.NOT_SIGNED_IN
        )
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
      { streamId, branchName, loadChildren }: LoadActReportDataInput
    ) {
      return await loadStream(
        context,
        streamId,
        `${context.state.speckleFolderName}/${branchName}`,
        loadChildren
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
    ): Promise<GetObjectDetailsOut> {
      const objectid = objecturl.split("/")[objecturl.split("/").length - 1];

      const parent: IParamsParent = await fetch(
        `${context.state.selectedServer.url}/objects/${streamid}/${objectid}/single`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.state.token.token}`,
          },
        }
      ).then((d) => d.json());

      const children = await getChildren<IChildObject>(
        context.state.selectedServer.url,
        context.state.token.token,
        streamid,
        parent
      );

      return {
        parent,
        children,
      };
    },
    async uploadReport(
      context,
      {
        streamid,
        objects,
        reportTotals,
        projectData,
        branchName,
        newModel,
        selectedObjectGroup,
      }: UploadReportInput
    ) {
      if (newModel) {
        const combined = [newModel.parent, ...newModel.children];

        const combinedSplit: (IParamsParent | IChildObject)[][] = [];

        // some models can have weirdly large objects, so we limit the batch sizes to make sure we don't break the speckle server...
        const BATCH_SIZES = {
          REGULAR: 100,
          SMALL: 50,
          TINY: 25,
        };
        let batchSize = BATCH_SIZES.REGULAR;
        const TEN_MB = 10000000;
        const THIRTY_MB = 30000000;
        const firstBatch = new Blob([
          JSON.stringify(
            combined.slice(0, Math.min(0 + batchSize, combined.length))
          ),
        ]);
        if (firstBatch.size > THIRTY_MB) batchSize = BATCH_SIZES.TINY;
        else if (firstBatch.size > TEN_MB) batchSize = BATCH_SIZES.SMALL;

        for (let i = 0; i < combined.length; i += batchSize) {
          combinedSplit.push(
            combined.slice(i, Math.min(i + batchSize, combined.length))
          );
        }

        // if the batch size has been made to be smaller then tread carefully...
        if (batchSize !== BATCH_SIZES.REGULAR) {
          for (let i = 0; i < combinedSplit.length; i++) {
            const formData = new FormData();
            formData.append(
              "batch1",
              new Blob([JSON.stringify(combinedSplit[i])])
            );
            await fetch(
              `${context.state.selectedServer.url}/objects/${streamid}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${context.state.token.token}`,
                },
                body: formData,
              }
            );
          }
        } else {
          await Promise.all(
            combinedSplit.map((c) => {
              const formData = new FormData();
              formData.append("batch1", new Blob([JSON.stringify(c)]));
              return fetch(
                `${context.state.selectedServer.url}/objects/${streamid}`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${context.state.token.token}`,
                  },
                  body: formData,
                }
              );
            })
          );
        }
      }

      branchName = `${context.state.speckleFolderName}/${branchName}`;

      const objectIds = await speckleUtil.getStreamObjects(context, streamid);
      const modelId = newModel
        ? newModel.parent.id
        : objectIds.data.stream.branch.commits.items[0].referencedObject;

      // TODO: ADD ERROR HANDLING
      const uploadObjectsRes: UploadObjectsRes =
        await speckleUtil.uploadObjects(context, streamid, objects);
      const children = uploadObjectsRes.data.objectCreate;
      const formData = new FormData();
      // below line means that some objects may be given duplicate strings and the report won't save properly
      const objectid = `${new Date().getTime().toString()}-act`;
      const objectData: ParentSpeckleObjectDataV2 = {
        id: objectid,
        version: "2.0.0",
        speckleType: "act-totals",
        speckle_type: "act-totals",
        transportCarbonA4: reportTotals.transportCarbonA4,
        productStageCarbonA1A3: reportTotals.productStageCarbonA1A3,
        constructionCarbonA5: reportTotals.constructionCarbonA5,
        totalCO2: reportTotals.totalCO2,
        volume: reportTotals.volume,
        materials: reportTotals.materials,
        materialsColors: reportTotals.materialsColors,
        transportColors: reportTotals.transportColors,
        projectData,
        totalChildrenCount: 0,
        idMapper: newModel ? newModel.idMapper : ({} as IdMapper),
        "@children": children.map((child) => ({
          speckle_type: "reference",
          referencedId: child,
        })),
        "@model": [
          {
            speckle_type: "reference",
            referencedId: modelId,
          },
        ],
        selectedObjectGroup,
      };
      children.push(modelId); // add model id to children array so it gets added to __closure properly
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
      const createBranch: SpeckleBranchRes = await speckleUtil.createBranch(
        context,
        streamid,
        branchName,
        "A Carbon Tool carbon report"
      );

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
      const queryRes: any = await speckleUtil.checkContainsBranch(
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

          const data = await loadStream(
            context,
            streamid,
            fullBranchName,
            false
          );
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
    async saveNewRegion(context, { name, streamid, data }: SaveNewRegionInput) {
      const branchName = `actcarbonreportdata/${name}`;
      const parentId = `${new Date().getTime().toString()}-act`;

      const createBranchRes = await speckleUtil.createBranch(
        context,
        streamid,
        branchName,
        "Custom data"
      );

      const childObjects: ExcelDataSpeckleChild[] = data.map((d) => ({
        ...exportToMaterial(d),
        name: d.Material,
        group: d.Group,
        speckle_type: "Base",
      }));

      const uploadObjectsRes: UploadObjectsRes =
        await speckleUtil.uploadObjectsGeneric(context, streamid, childObjects);
      const childObjectIds = uploadObjectsRes.data.objectCreate;
      const closure: { [childId: string]: 1 } = Object.fromEntries(
        childObjectIds.map((c) => [c, 1])
      );

      const parentObject: ExcelDataSpeckleParent = {
        id: parentId,
        name,
        speckleType: "Base",
        __closure: closure,
        "@material": childObjectIds.map((id) => ({
          speckle_type: "reference",
          referencedId: id,
        })),
      };

      const formData = new FormData();
      formData.append(
        "batch1",
        new Blob([JSON.stringify([{ ...parentObject }])])
      );

      await fetch(`${context.state.selectedServer.url}/objects/${streamid}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${context.state.token.token}`,
        },
        body: formData,
      });

      const createCommitRes: CreateCommitRes = await speckleUtil.createCommit(
        context,
        streamid,
        parentId,
        childObjectIds.length,
        branchName
      );

      return;
    },
    async getCustomRegions(context) {
      const streamIdsRes = await speckleUtil.getUserStreams(context);
      const streams = streamIdsRes.data.user.streams.items;
      await Promise.all(
        streams.map(async (stream) => {
          // pull in all branches from all streams
          const branchesRes: StreamReferenceBranches =
            await speckleUtil.getStreamBranches(context, stream.id);
          const branches = branchesRes.data.stream.branches.items;

          // check those branches for "actcarbonreportdata" branches
          const regionBranches = branches.filter((b) =>
            b.name.startsWith("actcarbonreportdata")
          );
          if (regionBranches.length === 0) return;

          // for those branches, pull down the data (including the child objects) from the latest commit and add it to the materials list
          await Promise.all(
            regionBranches.map(async (branch) => {
              const parentId = branch.commits.items[0].referencedObject;
              const branchData = await loadParent<ExcelDataSpeckleParent>(
                context.state.selectedServer.url,
                stream.id,
                parentId,
                context.state.token.token
              );

              const children = await getChildren<ExcelDataSpeckleChild>(
                context.state.selectedServer.url,
                context.state.token.token,
                stream.id,
                branchData
              );

              const groups: RegionMaterialCarbonFactors = {};
              children.forEach((c) => {
                if (!groups[c.group]) groups[c.group] = {};
                groups[c.group][c.name] = c;
              });

              // const materialObj: { [key: string]: Material } = {};
              // children.forEach((c) => {
              //   materialObj[c.name] = c;
              // });
              // let carbonFactor: { [k0: string]: { [k1: string]: Material } } =
              //   {};
              const branchName = branch.name.slice(20);
              // carbonFactor[branchName] = groups;

              materialCarbonFactors[branchName] = groups;
              const region: Region = {
                key: branchName,
                name: branchName.split(" ").slice(0, -1).join(" "),
              };
              context.commit("addRegion", region);
            })
          );
        })
      );
    },
  },
  modules: {},
});

export interface GetParentObjectInput {
  streamid: string;
  objecturl: string;
}

export interface GetObjectDetailsOut {
  parent: IParamsParent;
  children: IChildObject[];
}

export interface Region {
  key: string;
  name: string;
}

export interface ExcelDataCombined {
  parentName: string;
  children: ExcelDataSpeckleChild[];
}

export interface ExcelDataSpeckleChild extends Material {
  speckle_type: "Base";
  name: string;
  group: string;
}

export interface ExcelDataSpeckleParent {
  id: string;
  name: string;
  speckleType: "Base";
  __closure: { [childId: string]: 1 };
  "@material": {
    referencedId: string;
    speckle_type: "reference";
  }[];
}

export interface SaveNewRegionInput {
  name: string;
  streamid: string;
  data: ExcelData[];
}

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
  loadChildren?: boolean;
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
  newModel: AddParamsModel | undefined;
  selectedObjectGroup: string;
}

export interface ObjectDetailsInput {
  streamid: string;
  objecturl: string;
}
