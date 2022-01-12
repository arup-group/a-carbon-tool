import { Server } from './server.interface';
import { Token } from './token.interface';

export interface Login {
  token: Token;
  server: Server;
}
