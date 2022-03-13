export interface ObjectDetails {
  id: string;
  speckle_type: string;
  parameters?: {
    HOST_VOLUME_COMPUTED?: {
      value: number;
    };
  };
}

export interface ObjectDetailsComplete {
  id: string;
  speckle_type: string;
  volume: number;
}
