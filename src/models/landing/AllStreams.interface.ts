export interface LandingUserStreams {
  data: {
    streams: {
      items: (LandingUserStream | LandingUserStreamFull)[];
    };
  };
}

export interface LandingUserStream {
  actBranch?: LandingUserStreamsBranch;
  mainBranch: LandingUserStreamsBranch;
  name: string;
  id: string;
}

export interface LandingUserStreamFull {
  actBranch: LandingUserStreamsBranch;
  mainBranch: LandingUserStreamsBranch;
  name: string;
  id: string;
}

export function instanceOfLandingUserStreamFull(object: any): object is LandingUserStreamFull {
  return "actBranch" in object && "mainBranch" in object;
}

export interface LandingUserStreamsBranch {
  id: string;
  name: string;
  commits: {
    items: {
      referencedObject: string;
      createdAt: string;
    }[];
  };
}
