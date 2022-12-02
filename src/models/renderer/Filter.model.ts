export interface SpeckleProperty<T> {
  allValues: T[];
  maxValue: T;
  minValue: T;
  type: string;
  // uniqueValues: { [key: string]: number };
}

export interface Filter<T> {
  name: string;
  rawName: string; // sometimes the name of the parameter and the name property on the parameter are different (eg, for Revit volume's "name" is "Volume", but the field is called "HOST_VOLUME_COMPUTED")
  data: SpeckleProperty<T>;
}

export type Filters = Filter<string | number | boolean>[];
