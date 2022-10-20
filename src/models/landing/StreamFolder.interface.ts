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

export interface StreamFolderLoading {
  streamName: string;
  streamId: string;
}

export function instanceOfStreamFolder(object: any): object is StreamFolder {
  return "mainProject" in object;
}

export function instanceOfStreamFolderLoading(object: any): object is StreamFolderLoading {
  return "streamName" in object && "streamId" in object && !("mainProject" in object);
}
