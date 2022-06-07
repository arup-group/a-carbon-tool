import { HistoryProjectCardDirection } from "./HistoryProjectCardDirection.enum";

export interface HistoryFilterOptions {
  materials: boolean;
  a15: boolean;
  categories: boolean;
  renderer: boolean;
  direction: HistoryProjectCardDirection;
}
