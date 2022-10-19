import { TransportType } from "./transportType.interface";

export interface GroupedMaterial {
  material: string;
  objects: string[];
  speckle_types: string[];
  transportType?: TransportType;
}
