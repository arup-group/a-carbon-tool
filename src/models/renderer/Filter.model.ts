export interface SpeckleProperty<T> {
  allValues: T[];
  maxValue: T;
  minValue: T;
  type: string;
  uniqueValues: { [key: string]: number };
}

export interface Filter<T> {
  name: string;
  data: SpeckleProperty<T>;
}

export type Filters = Filter<string | number | boolean>[];
