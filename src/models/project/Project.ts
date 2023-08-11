import { ChartData } from "../chart";
import { ProjectComponent } from "../newAssessment/projectData.interface";

export interface Project {
  title: string;
  name: string;
  id: string;
  branchId: string;
  co2Values: ChartData[];
  link: string;
  category: ProjectComponent[]; // maybe this will eventually be limited to a set number of categories?
  totalCO2e: number;
  projectDate: string;
  newMainAvailable: boolean;
}

export function instanceOfProject(object: any): object is Project {
  return "title" in object && "id" in object && "co2Values" in object;
}
