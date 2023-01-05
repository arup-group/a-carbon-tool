import { Level } from "@/models/assessment";
import { ChartData } from "@/models/chart";
import {
  ChildSpeckleObjectData,
} from "@/models/graphql/StreamData.interface";
import { ProjectComponent } from "@/models/newAssessment/projectData.interface";
import { Color } from "@/models/renderer";

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
}

export interface LoadStreamOut {
  ready: boolean;
  colors: Color[];
  data: ILoadStreamData;
}
