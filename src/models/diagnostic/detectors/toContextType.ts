import { Context } from "../";

export function toContextType(token: string, url: string): Context {
  return {
    state: {
      token: {
        token,
      },
      selectedServer: {
        url,
      },
    },
  };
}
