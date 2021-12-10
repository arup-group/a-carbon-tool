import { DoughnutData } from ".";

export interface Project {
  title: string;
  co2Values: DoughnutData[];
  link: string;
  category: string; // maybe this will eventually be limited to a set number of categories?
}
