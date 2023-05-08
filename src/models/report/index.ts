import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import {
  EmptyProps,
  EmptyPropsPassdown,
  ProjectDataComplete,
  StringPropertyGroups,
  TransportType,
} from "../newAssessment";
import { IChildObject, Param } from "@/views/utils/add-params/addParams";

interface ObjectMaterials {
  [materialName: string]: ReportMaterial;
}
interface ReportObjects {
  [id: string]: ReportObject;
}
export interface ReportFullGroup {
  name: string;
  objects: ReportObject[];
}
export interface ReportFullTransportGroup {
  name: string;
  objects: ReportObject[];
}

export interface ChildObjects {
  speckleObject: IChildObject;
  volume: number;
}

export class ReportController {
  objects: ReportObjects = {};
  groups: { [groupValue: string]: string[] } = {};
  projectInfo: ProjectDataComplete = {} as ProjectDataComplete;

  isReportComplete(): EmptyProps {
    console.log("checking report complete")
    const projectEmpty: boolean = this.projectInfo && this.projectInfo.name !== undefined; // all project info gets filled in at the same time, so if one contains a value, then they all will
    const materialsEmpty = Object.entries(this.objects).filter(([k, v]) => !v.hasMaterials).map(([k, v]) => v.id);
    const transportsEmpty: string[] = [];

    Object.entries(this.objects).forEach(([k, v]) => {
      if (v.hasMaterials) {
        Object.entries(v.materials).forEach(([k1, v1]) => {
          if (!v1.hasTransport) transportsEmpty.push(v.id);
        });
      }
    });
    const volumesEmpty: string[] = [];

    return {
      projectEmpty,
      materialsEmpty,
      transportsEmpty,
      volumesEmpty
    }
  }

  get fullGroups(): ReportFullGroup[] {
    return Object.keys(this.groups).map((g) => ({
      name: g,
      objects: this.groups[g].map((id) => this.objects[id]),
    }));
  }

  get transportGroups(): ReportFullTransportGroup[] {
    const materialGrouping: { [materialName: string]: ReportObject[] } = {};
    Object.keys(this.objects).forEach(k => {
      const obj = this.objects[k];
      if (obj.hasMaterials) {
        Object.entries(obj.materials).forEach(([k, v]) => {
          if (materialGrouping[k]) materialGrouping[k].push(obj);
          else materialGrouping[k] = [obj];
        });
      }
    });
    return Object.entries(materialGrouping).map(([k, v]) => ({
      name: k,
      objects: v
    }));
  }

  get hasProjectInfo() {
    return this.projectInfo && this.projectInfo.cost;
  }

  setObjects(childObjects: ChildObjects[]) {
    childObjects.forEach((c) => {
      const speckleObject = c.speckleObject;
      this.objects[speckleObject.id] = new ReportObject(
        speckleObject.id,
        speckleObject.speckle_type,
        c.volume,
        speckleObject.parameters
      );
    });
  }

  groupObjects(propertyGroups: StringPropertyGroups[], selectedGroup: string) {
    this.groups = {};
    const group = propertyGroups.find((pg) => pg.name === selectedGroup);
    if (group) {
      group.data.valueGroups.forEach((vg) => {
        if (this.groups[vg.value]) this.groups[vg.value].push(...vg.ids);
        else this.groups[vg.value] = [...vg.ids];
      });
    }
  }
}

export class ReportObject {
  constructor(
    public id: string,
    public speckle_type: string,
    public volume: number,
    public properties: { [key: string]: Param }
  ) {}

  materials: ObjectMaterials = {};

  get hasMaterials() {
    return Object.keys(this.materials).length > 0;
  }

  setTransport(materialName: string, transportType: TransportType) {
    this.materials[materialName].setTransport(transportType);
  }

  addMaterial(material: MaterialFull, percentage: number) {
    this.materials[material.name] = new ReportMaterial(
      this.volume * percentage,
      material
    );
  }
  updateMaterialVolume(materialName: string, percentage: number) {
    this.materials[materialName].volume = this.volume * percentage;
  }
  changeMaterial(oldName: string | undefined, newMaterial: MaterialFull) {
    if (oldName) this.removeMaterial(oldName);
    this.addMaterial(newMaterial, this.volume);
  }
  removeMaterial(materialName: string) {
    const oldMaterials = this.materials;
    this.materials = {};
    Object.keys(oldMaterials).forEach((m) => {
      if (m !== materialName) this.materials[m] = oldMaterials[m];
    });
  }
}

export class ReportMaterial {
  constructor(public volume: number, public material: MaterialFull) {}
  transport: Transport = {} as Transport;

  get hasTransport() {
    return this.transport && this.transport.name;
  }

  setTransport({ name, color, values: { road, rail, sea } }: TransportType) {
    this.transport = new Transport(name, color, { road, rail, sea });
  }
  setMaterial(material: MaterialFull) {
    this.material = material;
  }
}

export class Transport {
  constructor(
    public name: "local" | "regional" | "global" | "custom",
    public color: string,
    public values: { road: number; rail: number; sea: number }
  ) {}

  calcA4() {
    return -1;
  }
}
