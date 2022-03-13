export type GradientColor = Gradient | null;
export interface Gradient {
  property: string;
  minValue: number;
  maxValue: number;
  colors: string[];
}
