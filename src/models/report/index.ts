import { MaterialFull } from "@/store/utilities/material-carbon-factors";
import {
  EmptyProps,
  EmptyPropsPassdown,
  ObjectsObj,
  ProjectDataComplete,
  ReportProp,
  ReportTotals,
  SpeckleObjectComplete,
  StringPropertyGroups,
  TransportType,
} from "../newAssessment";
import { IChildObject, Param } from "@/views/utils/add-params/addParams";
import * as AddParams from "@/views/utils/add-params/addParams";
import { Color } from "../renderer";
import { ChartData } from "../chart";
import { ChildSpeckleObjectData } from "../graphql";

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

interface ReportToUpload {
  reportObjs: SpeckleObjectComplete[];
  totals: ReportTotals;
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

  addParams: AddParams.ParamAdd[] = [];

  materials: ChartData[] = [];
  reportObjs: SpeckleObjectComplete[] = [];

  convToUpload(volume: number, materialsColors: Color[], transportColors: Color[]): ReportToUpload {
    const totals: ReportTotals = {
      totalCO2: this.totalCarbon,
      volume,
      materials: this.materials,
      materialsColors,
      transportColors,
      transportCarbonA4: this.totalA4,
      productStageCarbonA1A3: this.totalA1A3,
      constructionCarbonA5: {
        value: this.totalA5,
        waste: this.totalA5w,
        site: this.totalA5a
      }
    }

    return {
      totals,
      reportObjs: this.reportObjs
    };
  }

  calcCarbon(): ReportProp {
    this.totalA5a = this.calcA5a();

    this.totalCarbon = 0;
    this.totalA1A3 = 0;
    this.totalA4 = 0;
    this.totalA5w = 0;

    const materialsObj: {
      [key: string]: { value: number; color: string };
    } = {};
    this.reportObjs = [];

    Object.entries(this.objects).forEach(([k, v]) => {
      const { A1A3, A4, A5w } = v.calcCarbon();

      this.totalA1A3 += A1A3;
      this.totalA4 += A4;
      this.totalA5w += A5w;

      // update materialsObj
      Object.entries(v.materials).forEach(([k1, v1]) => {
        if (materialsObj[k1]) materialsObj[k1].value += v1.totalCarbon;
        else materialsObj[k1] = {
          color: v1.material.color,
          value: v1.totalCarbon
        }
      });

      // update reportObjs
      this.reportObjs.push(v.convToSpeckleObjectComplete());

      // make parameter update object
      this.addParams.push({
        parentid: v.id,
        name: "Total Carbon",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Total Carbon",
          units: "kgCO2e/kg",
          value: A4 + A1A3 + A5w,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      this.addParams.push({
        parentid: v.id,
        name: "Product Stage Carbon A1-A3",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Product Stage Carbon A1-A3",
          units: "kgCO2e/kg",
          value: A1A3,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      this.addParams.push({
        parentid: v.id,
        name: "Transport Carbon A4",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Transport Carbon A4",
          units: "kgCO2e/kg",
          value: A4,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      this.addParams.push({
        parentid: v.id,
        name: "Construction Carbon A5",
        param: {
          id: Math.floor(Math.random() * 10000000).toString(),
          name: "Construction Carbon A5",
          units: "kgCO2e/kg",
          value: A5w,
          isShared: false,
          isReadOnly: false,
          speckle_type: "Objects.BuiltElements.Revit.Parameter",
          applicationId: null,
          applicationUnit: null,
          isTypeParameter: false,
          totalChildrenCount: 0,
          applicationUnitType: "string",
          applicationInternalName: "string",
        },
      });
      // end parameter update
    });
    this.materials = Object.entries(materialsObj).map(([k, v]) => ({
      value: v.value,
      label: k,
      color: v.color,
    }));
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

  // method used on new assessment page when updating an existing report
  setObjectsUpdate(childObjects: ChildSpeckleObjectData[]) {
    childObjects.forEach((c) => {
      const newObj = new ReportObject(
        c.id,
        c.speckleType,
        c.act.formData.volume
      );
        newObj.updateUsingReport(c);

        this.objects[c.id] = newObj;
    })
  }

  setObjects(childObjects: ChildObjects[]) {
    childObjects.forEach((c) => {
      const speckleObject = c.speckleObject;
      this.objects[speckleObject.id] = new ReportObject(
        speckleObject.id,
        speckleObject.speckle_type,
        c.volume
      );
    });
  }

  groupObjects(propertyGroups: StringPropertyGroups[], selectedGroup: string) {
    console.log("grouping objects?");
    console.log("propertyGroups:", propertyGroups);
    console.log("selectedGroup:", selectedGroup);
    this.groups = {};
    const group = propertyGroups.find((pg) => pg.name === selectedGroup);
    console.log("group:", group);
    if (group) {
      group.data.valueGroups.forEach((vg) => {
        if (this.groups[vg.value]) this.groups[vg.value].push(...vg.ids);
        else this.groups[vg.value] = [...vg.ids];
      });
      console.log("this.groups:", this.groups);
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
    public volume: number
  ) {}

  materials: ObjectMaterials = {};

  totalCarbon = 0;
  totalA1A3 = 0;
  totalA4 = 0;
  totalA5w = 0;

  get hasMaterials() {
    return Object.keys(this.materials).length > 0;
  }

  updateUsingReport(c: ChildSpeckleObjectData) {
    // add materials
    //    add transport to materials
    const material = c.act.formData.material;
    if (Array.isArray(material)) {
      material;
      const transport = c.act.formData.transport as TransportType[]; // if material is an array then we know that transport will be too
      material.forEach((m, i) => {
        if (m.volume) // we can be _pretty_ certain that m.volume exists (hopefully)
          this.addMaterial(m, m.volume / this.volume);
        this.setTransport(m.name, transport[i]); // transport and materials should have been added to their arrays in the same order, so index should link the two
      })
    } else {
      this.addMaterial(material, 1);
      this.setTransport(material.name, c.act.formData.transport as TransportType); // if material is not an array then we know that transport won't be either
    }
    // pull in carbon values
    const reportData = c.act.reportData;
    this.totalCarbon = reportData.totalCarbon;
    this.totalA1A3 = reportData.productStageCarbonA1A3;
    this.totalA4 = reportData.transportCarbonA4;
    this.totalA5w = reportData.constructionCarbonA5.waste;
  }

  convToSpeckleObjectComplete(): SpeckleObjectComplete {
    return {
      id: this.id,
      speckle_type: this.speckle_type,
      formData: {
        transport: Object.entries(this.materials).map(([k, v]) => v.transport),
        material: Object.entries(this.materials).map(([k, v]) => v.material),
        volume: this.volume
      },
      reportData: {
        totalCarbon: this.totalCarbon,
        transportCarbonA4: this.totalA4,
        productStageCarbonA1A3: this.totalA1A3,
        constructionCarbonA5: {
          value: this.totalA5w,
          site: 0,
          waste: this.totalA5w
        }
      }
    };
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
  constructor(public volume: number, public material: MaterialFull) {
    this.material.volume = this.volume;
  }
  transport: TransportType = {} as TransportType;

  totalCarbon = 0;
  A1A3 = 0;
  A4 = 0;
  A5w = 0;

  get hasTransport() {
    return this.transport && this.transport.name;
  }

  setTransport(transport: TransportType) {
    this.transport = transport;
  }
  setMaterial(material: MaterialFull) {
    this.material = material;
    this.material.volume = this.volume;
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
  calcA4(volume: number, material: MaterialFull, transport: TransportType, factors: TransportFactors) {
    const A4 =
      (material.density *
        volume *
        (transport.values.road * factors.road + transport.values.sea * factors.sea)) /
      1000;

    return A4;
  }
  // TODO: check whether we should be including C2-C4 (estimates/assumptions) in this calc?
  // How to Calculate Embodied Carbon does say to use it (and gives assumptions to use given a lack of data), however DesignCheck does not use them
  calcA5w(volume: number, material: MaterialFull, transport: TransportType, factors: TransportFactors) {
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
