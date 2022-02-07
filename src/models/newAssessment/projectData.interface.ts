export interface ProjectDataTemp {
  name: string | null;
  component: string | null;
  cost: number | null;
  floorArea: number | null;
  region: string | null;
}

export interface ProjectDataComplete {
  name: string;
  component: string;
  cost: number;
  floorArea: number;
  region: string;
}
