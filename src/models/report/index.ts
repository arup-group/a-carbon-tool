import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import {
  EmptyProps,
  EmptyPropsPassdown,
  ProjectDataComplete,
  ReportProp,
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

  totalCarbon = 0;
  totalA1A3 = 0;
  totalA4 = 0;
  totalA5w = 0;
  totalA5a = 0; // A5a only has one component (sys cost), but keeping "total" naming scheme for consistency
  totalA5 = 0;

  calcCarbon(): ReportProp {
    this.totalA5a = this.calcA5a();

    this.totalCarbon = 0;
    this.totalA1A3 = 0;
    this.totalA4 = 0;
    this.totalA5w = 0;

    Object.entries(this.objects).forEach(([k, v]) => {
      const { A1A3, A4, A5w } = v.calcCarbon();

      this.totalA1A3 += A1A3;
      this.totalA4 += A4;
      this.totalA5w += A5w;
    });
    console.log("this.objects:", this.objects);

    this.totalA5 = this.totalA5w + this.totalA5a
    this.totalCarbon = this.totalA1A3 + this.totalA4 + this.totalA5;

    return {
      totalCO2: this.totalCarbon,
      totalA1A3: this.totalA1A3,
      totalA4: this.totalA4,
      totalA5: this.totalA5
    }
  }

  calcA5a() {
    return (this.projectInfo.cost * 1400) / 100000
  }

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

interface CarbonResults {
  A1A3: number;
  A4: number;
  A5w: number;
}

export class ReportObject {
  constructor(
    public id: string,
    public speckle_type: string,
    public volume: number,
    public properties: { [key: string]: Param }
  ) {}

  materials: ObjectMaterials = {};

  totalCarbon = 0;
  totalA1A3 = 0;
  totalA4 = 0;
  totalA5w = 0;

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
    let percentage = 1;
    if (oldName) {
      percentage = this.materials[oldName].volume / this.volume;
      this.removeMaterial(oldName);
    }
    this.addMaterial(newMaterial, percentage);
  }
  removeMaterial(materialName: string) {
    const oldMaterials = this.materials;
    this.materials = {};
    Object.keys(oldMaterials).forEach((m) => {
      if (m !== materialName) this.materials[m] = oldMaterials[m];
    });
  }

  calcCarbon(): CarbonResults {
    this.totalCarbon = 0;
    this.totalA1A3 = 0;
    this.totalA4 = 0;
    this.totalA5w = 0;

    Object.entries(this.materials).forEach(([k, v]) => {
      const { A1A3, A4, A5w } = v.calcCarbon();

      this.totalA1A3 += A1A3;
      this.totalA4 += A4;
      this.totalA5w += A5w;
    });

    this.totalCarbon = this.totalA1A3 + this.totalA4 + this.totalA5w;

    return {
      A1A3: this.totalA1A3,
      A4: this.totalA4,
      A5w: this.totalA5w
    };
  }
}

export class ReportMaterial {
  constructor(public volume: number, public material: MaterialFull) {}
  transport: Transport = {} as Transport;

  totalCarbon = 0;
  A1A3 = 0;
  A4 = 0;
  A5w = 0;

  get hasTransport() {
    return this.transport && this.transport.name;
  }

  setTransport({ name, color, values: { road, rail, sea } }: TransportType) {
    this.transport = new Transport(name, color, { road, rail, sea });
  }
  setMaterial(material: MaterialFull) {
    this.material = material;
  }

  calcCarbon(): CarbonResults {
    this.A1A3 = this.calcA1A3(this.volume, this.material);
    this.A4 = this.calcA4(this.volume, this.material, this.transport, transportFactors);
    this.A5w = this.calcA5w(this.volume, this.material, this.transport, transportFactors);


    this.totalCarbon = this.A1A3 + this.A4 + this.A5w;

    return {
      A1A3: this.A1A3,
      A4: this.A4,
      A5w: this.A5w
    }
  }

  calcA1A3(volume: number, material: MaterialFull) {
    const mass = volume * material.density;
    const A1A3 = mass * material.productStageCarbonA1A3;

    return A1A3;
  }
  calcA4(volume: number, material: MaterialFull, transport: Transport, factors: TransportFactors) {
    const A4 =
      (material.density *
        volume *
        (transport.values.road * factors.road + transport.values.sea * factors.sea)) /
      1000;

    return A4;
  }
  // TODO: check whether we should be including C2-C4 (estimates/assumptions) in this calc?
  // How to Calculate Embodied Carbon does say to use it (and gives assumptions to use given a lack of data), however DesignCheck does not use them
  calcA5w(volume: number, material: MaterialFull, transport: Transport, factors: TransportFactors) {
    const wasteVolume = volume * (1 / (1 - material.wastage) - 1);

    const A1A3 = this.calcA1A3(wasteVolume, material);
    const A4 = this.calcA4(wasteVolume, material, transport, factors);

    const A5w = A1A3 + A4;

    return A5w;
  }
}

interface TransportFactors {
  road: number;
  sea: number;
}
const transportFactors: TransportFactors = {
  // values taken from RICS guidance
  road: 0.1136, // gCO2/kg/km
  sea: 0.016143, // gCO2/kg/km
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
