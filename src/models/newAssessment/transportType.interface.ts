export interface TransportType {
  name: "local" | "regional" | "global" | "custom";
  color: string;
  values: TransportValues;
}

export interface TransportValues {
  road: number;
  rail: number;
  sea: number;
}
