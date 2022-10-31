export interface Server {
  region: string;
  url: string;
  speckleId: string;
  speckleSecret: string;
}

export interface Servers {
  arup: Server;
  xyz_server: Server;
}
