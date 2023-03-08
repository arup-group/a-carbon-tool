import { Level } from "@/models/assessment";
import { ChartData } from "@/models/chart";
import {
  ChildSpeckleObjectData,
} from "@/models/graphql/StreamData.interface";
import { ProjectComponent } from "@/models/newAssessment/projectData.interface";
import { Color } from "@/models/renderer";
import { IdMapper } from "../add-params/addParams";

export interface IProjectInfo {
  name: string;
  components: ProjectComponent[];
  reportDate: Date;
  author: string;
  jobNumber: string;
  cost: number;
  floorArea: number;
  notes: string;
  totalCO2e: number;
  totalkgCO2e: number;
  region: string;
  volume: number;
}
export interface IMaterialBreakdown {
  materials: ChartData[];
}
export interface IABreakdown {
  levels: Level[];
}
export interface ILoadStreamData {
  streamId: string;
  projectInfo: IProjectInfo;
  materialBreakdown: IMaterialBreakdown;
  aBreakdown: IABreakdown;
  children: ChildSpeckleObjectData[];
  modelId: string;
  idMapper: IdMapper;
}

export interface LoadStreamOut {
  version: "v1" | "v2";
  ready: boolean;
  colors: Color[];
  data: ILoadStreamData;
}
