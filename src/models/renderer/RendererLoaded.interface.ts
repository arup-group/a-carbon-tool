import * as THREE from "three";
import { Filters } from "./Filter.model";

export interface RendererLoaded {
  properties: Filters;
  allMesh: THREE.Mesh[];
}
