export interface ProjectDataTemp {
  name: string | null;
  component: string | null;
  cost: number | null;
  floorArea: number | null;
}

export interface ProjectDataComplete {
  name: string;
  component: string;
  cost: number;
  floorArea: number;
}
