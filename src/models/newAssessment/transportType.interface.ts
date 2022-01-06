export interface TransportType {
  name: "local" | "regional" | "global" | "custom";
  color: string;
  defaults: {
    road: number;
    rail: number;
    sea: number;
  };
}
