import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { TransportType } from ".";
import { ChartData } from "../chart";
import { Color } from "../renderer";

export interface ObjectFormDataComplete {
  transport: TransportType | TransportType[]; // single object only used in legacy reports
  material: MaterialFull | MaterialFull[];// single object only used in legacy reports
  volume: number;
}

// repeat of SpeckleObjectFormComplete, but with ReportData confirmed present
export interface SpeckleObjectComplete {
  id: string;
  speckle_type: string;
  formData: ObjectFormDataComplete;
  reportData: ReportDataChild;
}

export interface ReportProp {
  totalCO2: number;
  totalA1A3: number;
  totalA4: number;
  totalA5: number;
}

export type ReportPassdown = ReportProp | false;

export interface ReportDataBase {
  transportCarbonA4: number;
  productStageCarbonA1A3: number;
  constructionCarbonA5: CarbonA5;
}

export interface ReportDataChild extends ReportDataBase {
  totalCarbon: number;
}

export interface CarbonA5 {
  value: number;
  waste: number;
  site: number;
}

export interface ReportTotals extends ReportDataBase {
  totalCO2: number;
  volume: number;
  materials: ChartData[];
  materialsColors: Color[];
  transportColors: Color[];
}
