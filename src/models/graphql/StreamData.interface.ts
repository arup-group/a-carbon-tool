import { ProjectDataComplete } from "../newAssessment";
import { CarbonA5 } from "../newAssessment/speckleObject.interface";
import { SpeckleObjectComplete } from "../newAssessment";
import { ChartData } from "../chart";

export interface StreamData {
  data: {
    stream: {
      object: ReportObj;
    };
  };
}

export interface ReportObj {
  data: ParentSpeckleObjectData;
  createdAt: string;
  children: {
    objects: { data: any }[];
  };
}

export interface HTTPStreamDataParent extends ParentSpeckleObjectData {
  __closure: { [childId: string]: 1 };
}

export interface ChildSpeckleObjectData {
  id: string;
  speckleType: string;
  act: SpeckleObjectComplete;
}

export interface ParentSpeckleObjectData {
  constructionCarbonA5: CarbonA5;
  id: string;
  productStageCarbonA1A3: number;
  projectData: ProjectDataComplete;
  speckleType: string;
  speckle_type: string;
  totalCO2: number;
  totalChildrenCount: number;
  transportCarbonA4: number;
  volume: number;
}

export interface ParentSpeckleObjectDataV2 extends ParentSpeckleObjectData {
  version: "2.0.0";
  materials: ChartData[];
}
