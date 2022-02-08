export type BECCategory =
  | "Superstructure"
  | "Substructure"
  | "Mechanical Services"
  | "Electrical Services"
  | "Public Health & Hydraulics"
  | "Space plan"
  | "Building Envelope";
export interface BEC {
  name: BECCategory;
  color: string;
  backgroundColor: string;
}
