import * as THREE from "three";

// logic from Arup Carbon
export class VolCalculator {
  // https://stackoverflow.com/a/1568551/3446736
  static getSignedVolumeOfTriangle(
    p1x: number,
    p1y: number,
    p1z: number,
    p2x: number,
    p2y: number,
    p2z: number,
    p3x: number,
    p3y: number,
    p3z: number
  ) {
    const v321 = p3x * p2y * p1z;
    const v231 = p2x * p3y * p1z;
    const v312 = p3x * p1y * p2z;
    const v132 = p1x * p3y * p2z;
    const v213 = p2x * p1y * p3z;
    const v123 = p1x * p2y * p3z;
    return (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);
  }

  static getMeshVolume(obj: THREE.Mesh) {
    // TODO: Check for V+F-E = 2 (ie is closed mesh) https://gamedev.stackexchange.com/a/119368
    const buffGeom = obj.geometry;
    const volumes = [];
    if (buffGeom && buffGeom.index) {
      for (let i = 0; i < buffGeom.index.count; i += 3) {
        const A = buffGeom.index.array[i],
          B = buffGeom.index.array[i + 1],
          C = buffGeom.index.array[i + 2];

        volumes.push(
          this.getSignedVolumeOfTriangle(
            buffGeom.attributes.position.array[A * 3 + 0],
            buffGeom.attributes.position.array[A * 3 + 1],
            buffGeom.attributes.position.array[A * 3 + 2],
            buffGeom.attributes.position.array[B * 3 + 0],
            buffGeom.attributes.position.array[B * 3 + 1],
            buffGeom.attributes.position.array[B * 3 + 2],
            buffGeom.attributes.position.array[C * 3 + 0],
            buffGeom.attributes.position.array[C * 3 + 1],
            buffGeom.attributes.position.array[C * 3 + 2]
          )
        );
      }
      const sum = volumes.reduce((a, b) => a + b, 0);
      return sum > 0 ? sum : null;
    }
  }
}
