import { Server } from "./server";
import { Token } from "./token";

export interface Login {
  token: Token;
  server: Server;
}
