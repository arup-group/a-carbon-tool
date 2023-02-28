export interface StringPropertyGroups {
  name: string;
  targetKey: string;
  data: {
    key: string;
    objectCount: number;
    valueGroups: {
      value: string;
      ids: string[];
    }[];
  };
}
