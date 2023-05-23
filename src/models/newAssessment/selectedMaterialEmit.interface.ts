import { MaterialFull } from "@/store/utilities/material-carbon-factors";

export interface SelectedMaterialEmit {
  ids: string[];
  type: string;
}

export interface PartMaterial {
  id: number;
  material?: MaterialFull;
  percentage?: string; // will always be a number, but the input gives it as a string, so it's a string here to remind to do the conversion
}

export interface SelectedBuildupEmit {
  ids: string[];
  materials: PartMaterial[];
}
