import { ProjectDataComplete } from "../newAssessment";
import { CarbonA5 } from "../newAssessment/speckleObject.interface";

export interface StreamData {
  data: {
    stream: {
      object: {
        data: ParentSpeckleObjectData;
        createdAt: string;
        children: {
          objects: { data: any }[];
        };
      };
    };
  };
}

export interface ParentSpeckleObjectData {
  constructionCarbonA5: CarbonA5;
  id: string;
  productStageCarbonA1A3: number;
  projectData: ProjectDataComplete;
  speckleType: string;
  speckle_type: string;
  totalCO2: number;
  totalChildrenCount: number;
  transportCarbonA4: number;
}
