import { ProjectInfo, MaterialBreakdown, ABreakdown } from '.';

export interface AssessmentComplete {
  streamId: string;
  projectInfo: ProjectInfo;
  materialBreakdown: MaterialBreakdown;
  aBreakdown: ABreakdown;
}
