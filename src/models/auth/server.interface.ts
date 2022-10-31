export enum ServerRegion {
  UKIMEA,
  XYZ,
  CUSTOM
}

export interface Server {
  region: ServerRegion;
  url: string;
  speckleId: string;
  speckleSecret: string;
}

export interface Servers {
  arup: Server;
  xyz_server: Server;
  custom: Server;
}
