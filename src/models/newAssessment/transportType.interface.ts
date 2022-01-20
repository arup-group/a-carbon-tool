export interface TransportType {
  name: "local" | "regional" | "global" | "custom";
  color: string;
  values: {
    road: number;
    rail: number;
    sea: number;
  };
}
