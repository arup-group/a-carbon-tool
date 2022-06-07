export interface ProjectDataTemp {
  name: string | null;
  components: ProjectComponent[] | null;
  cost: number | null;
  floorArea: number | null;
  region: string | null;
  jobNumber: string | null;
  notes: string | null;
}

export interface ProjectComponent {
  backgroundColor: string;
  color: string;
  name: string;
}

export interface ProjectDataComplete {
  name: string;
  components: ProjectComponent[];
  cost: number;
  floorArea: number;
  region: string;
  jobNumber: string;
  notes: string;
}
