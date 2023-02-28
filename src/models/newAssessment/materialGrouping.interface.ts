import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { TransportType } from "./transportType.interface";

export interface MaterialGrouping {
  type: string;
  ids: string[];
  material?: MaterialFull;
  transport?: TransportType;
}
