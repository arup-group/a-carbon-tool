import {
  Material,
  RegionMaterialCarbonFactors,
} from "@/store/utilities/material-carbon-factors";
import * as XLSX from "xlsx";

// productStageCarbonA1A3: number;
// density: number;
// wastage: number;
// units: string;
// source: string;

export interface ExcelData {
  Density: number;
  Material: string;
  "Product Stage Carbon A1-A3": number;
  Units: string;
  Wastage: number;
}

export function excelToJson(e: ProgressEvent<FileReader>) {
    let data = new Uint8Array(e.target?.result as ArrayBuffer);
    let workbook = XLSX.read(data, { type: 'array' });
    let sheetName = workbook.SheetNames[0]
    return workbook.Sheets[sheetName];
}

export function instanceOfExcelData(object: any): object is ExcelData {
  return (
    "Density" in object &&
    "Material" in object &&
    "Product Stage Carbon A1-A3" in object &&
    "Units" in object &&
    "Wastage" in object
  );
}

export function verify(data: any[]) {
  const filtered = data.filter(instanceOfExcelData);
  return filtered.length === data.length ? filtered : undefined;
}

export function convertToStateMaterial(
  data: ExcelData[]
): RegionMaterialCarbonFactors {
  const materialObj: { [key: string]: Material } = {};
  data.forEach((d) => {
    materialObj[d.Material] = {
      productStageCarbonA1A3: d["Product Stage Carbon A1-A3"],
      density: d.Density,
      wastage: d.Wastage,
      units: d.Units,
      source: "custom",
    };
  });
  return { "": materialObj };
}
