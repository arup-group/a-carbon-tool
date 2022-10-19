import { Project } from "../project";

export interface StreamFolder {
  streamName: string;
  streamId: string;
  mainProject: Project;
}

export interface StreamFolderError {
  streamId: string;
  streamName: string;
  createdAt: string;
  loading: boolean;
}

export function instanceOfStreamFolder(object: any): object is StreamFolder {
  return "mainProject" in object;
}
