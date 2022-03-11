export interface ProjectDataTemp {
  name: string | null;
  components: string[] | null;
  cost: number | null;
  floorArea: number | null;
  region: string | null;
  jobNumber: string | null;
  notes: string | null;
}

export interface ProjectDataComplete {
  name: string;
  components: string[];
  cost: number;
  floorArea: number;
  region: string;
  jobNumber: string;
  notes: string;
}
