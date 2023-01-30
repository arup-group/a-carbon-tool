import { ProjectDataComplete } from "../newAssessment";
import { CarbonA5 } from "../newAssessment/speckleObject.interface";
import { SpeckleObjectComplete } from "../newAssessment";
import { ChartData } from "../chart";
import { Color } from "../renderer";

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

export type HTTPStreamDataParent = HTTPStreamDataParentV1 | HTTPStreamDataParentV2;

export interface HTTPStreamDataParentV1 extends ParentSpeckleObjectDataV1 {
  __closure: { [childId: string]: 1 };
}

export function instanceOfHttpStreamDataParentV1(object: any): object is HTTPStreamDataParentV1 {
  return "__closure" in object && !("version" in object);
}
export function instanceOfHttpStreamDataParentV2(object: any): object is HTTPStreamDataParentV2 {
  return "__closure" in object && "version" in object && object.version === "2.0.0";
}

export interface HTTPStreamDataParentV2 extends ParentSpeckleObjectDataV2 {
  __closure: { [childId: string]: 1 };
}

export interface ChildSpeckleObjectData {
  id: string;
  speckleType: string;
  act: SpeckleObjectComplete;
}

export type ParentSpeckleObjectData = ParentSpeckleObjectDataV1 | ParentSpeckleObjectDataV2;

export interface ParentSpeckleObjectDataV1 {
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

export interface ParentSpeckleObjectDataV2 extends ParentSpeckleObjectDataV1 {
  version: "2.0.0";
  materials: ChartData[];
  materialsColors: Color[];
  transportColors: Color[];
  "@children": {
    referencedId: string;
    speckle_type: "reference";
  }[];
  "@model": {
    referencedId: string;
    speckle_type: "reference";
  }[];
}
