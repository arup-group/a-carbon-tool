import { LoadStreamOut } from "@/views/utils/viewAssessmentUtils";

export interface BranchData {
  id: string;
  name: string;
  projectDate: string;
  newMainAvailable: boolean;
  data: LoadStreamOut;
}

export interface BranchDataError {
  id: string;
  name: string;
}

export function instanceOfBranchData(object: any): object is BranchData {
  return "id" in object && "projectDate" in object;
}
