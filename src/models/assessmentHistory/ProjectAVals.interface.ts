import { ChartData } from "../chart";
import { Project } from "../project";

export interface ProjectAVals extends Project {
  aValues: ChartData[];
}
