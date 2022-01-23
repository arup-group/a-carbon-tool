import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { TransportType } from ".";

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

export interface ReportData {
  transportCarbonA4?: number;
  productStageCarbonA1A3?: number;
  constructionCarbonA5?: number;
}

export interface CarbonA5 {
  value: number;
  waste: number;
  site: number;
}
