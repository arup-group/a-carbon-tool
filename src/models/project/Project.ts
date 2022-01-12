import { ChartData } from '../chart';

export interface Project {
  title: string;
  co2Values: ChartData[];
  link: string;
  category: string; // maybe this will eventually be limited to a set number of categories?
}
