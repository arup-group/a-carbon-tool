import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { TransportType } from ".";

export interface SpeckleObject {
  id: string;
  speckle_type: string;
  formData?: {
    transport?: TransportType;
    material?: MaterialFull;
    volume?: number;
  }
}
