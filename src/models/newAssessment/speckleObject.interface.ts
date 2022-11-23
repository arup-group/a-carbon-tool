import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { TransportType } from ".";
import { ChartData } from "../chart";

export interface SpeckleObject {
  id: string;
  speckle_type: string;
  formData?: ObjectFormData;
  reportData?: ReportData;
}

export interface ObjectFormData {
  transport?: TransportType;
  material?: MaterialFull;
  volume?: number;
}

// repeat of SpeckleObject, but forces formData to be present
export interface SpeckleObjectFormComplete {
  id: string;
  speckle_type: string;
  formData: ObjectFormDataComplete;
  reportData?: ReportData;
}

export interface ObjectFormDataComplete {
  transport: TransportType;
  material: MaterialFull;
  volume: number;
}

// repeat of SpeckleObjectFormComplete, but with ReportData confirmed present
export interface SpeckleObjectComplete {
  id: string;
  speckle_type: string;
  formData: ObjectFormDataComplete;
  reportData: ReportData;
}

export interface ReportProp {
  reportObjs: SpeckleObjectComplete[];
  totals: ReportTotals;
}

export type ReportPassdown = ReportProp | false;

export interface ReportData {
  transportCarbonA4: number;
  productStageCarbonA1A3: number;
  constructionCarbonA5: CarbonA5;
}

export interface CarbonA5 {
  value: number;
  waste: number;
  site: number;
}

export interface ReportTotals extends ReportData {
  totalCO2: number;
  volume: number;
  materials: ChartData[];
}
