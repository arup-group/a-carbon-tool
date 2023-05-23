import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { ReportFullGroup } from "../report";

export interface MaterialUpdateOut {
  material: MaterialFull;
  oldMaterial?: MaterialFull;
  type: ReportFullGroup;
}
