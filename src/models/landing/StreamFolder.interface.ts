import { Project } from "../project";
import { LandingUserStreamFull } from "./AllStreams.interface";

export interface StreamFolder {
  streamId: string;
  streamName: string;
  mainProject: Project;
}

export interface StreamFolderError {
  streamId: string;
  streamName: string;
  createdAt: string;
  loading: boolean;
  streamData: LandingUserStreamFull;
}

export interface StreamFolderLoading {
  streamId: string;
  streamName: string;
}

export type ProjectFolder = StreamFolder | StreamFolderError | StreamFolderLoading;

export function instanceOfStreamFolder(object: any): object is StreamFolder {
  return "mainProject" in object;
}

export function instanceOfStreamFolderLoading(object: any): object is StreamFolderLoading {
  return "streamName" in object && "streamId" in object && !("mainProject" in object);
}

export function instanceOfStreamFolderError(object: any): object is StreamFolderError {
  return "createdAt" in object && "loading" in object && "streamData" in object;
}

export function instaceOfProjectFolder(object: any): object is ProjectFolder {
  return instanceOfStreamFolder(object) || instanceOfStreamFolderLoading(object) || instanceOfStreamFolderError(object);
}

export class ProjectFolderController {
  constructor(public projectFolders: ProjectFolder[]) { }

  getSingle(streamid: string) {
    return this.projectFolders.find(pf => pf.streamId == streamid);
  }

  updateSingle(folder: ProjectFolder) {
    const arr = [...this.projectFolders]

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].streamId === folder.streamId) {
        arr[i] = folder;
      }
    }

    this.projectFolders = [...arr]

    return arr;
  }
}
