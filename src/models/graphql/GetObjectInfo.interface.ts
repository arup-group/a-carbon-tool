export interface GetObjectInfo {
  data: {
    stream: {
      object: {
        totalChildrenCount: number;
        data: any;
      };
    };
  };
}
