import { LoadStreamOut } from "@/views/utils/viewAssessmentUtils";

export interface BranchData {
  id: string;
  name: string;
  projectDate: string;
  newMainAvailable: boolean;
  data: LoadStreamOut;
}
