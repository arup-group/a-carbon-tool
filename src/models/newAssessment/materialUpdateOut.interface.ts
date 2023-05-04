import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import { MaterialGrouping } from ".";
import { ReportFullGroup } from "../report";

export interface MaterialUpdateOut {
  material: MaterialFull;
  oldMaterial?: MaterialFull;
  type: ReportFullGroup;
}
