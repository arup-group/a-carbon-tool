export type BECName =
  | "Superstructure"
  | "Substructure"
  | "Mechanical Services"
  | "Electrical Services"
  | "Public Health & Hydraulics"
  | "Space plan"
  | "Building Envelope";
export interface BEC {
  name: BECName;
  color: string;
  backgroundColor: string;
}
