import { ChartData } from "../chart";
import { ProjectComponent } from "../newAssessment/projectData.interface";

export interface Project {
  title: string;
  id: string;
  co2Values: ChartData[];
  link: string;
  category: ProjectComponent[]; // maybe this will eventually be limited to a set number of categories?
  totalCO2e: number;
  projectDate: string;
  newMainAvailable: boolean;
}
