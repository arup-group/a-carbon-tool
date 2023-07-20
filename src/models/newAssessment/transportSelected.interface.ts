import { TransportType } from ".";
import { ReportFullTransportGroup } from "../report";

export interface TransportSelected {
  material: ReportFullTransportGroup;
  transportType: TransportType;
}
