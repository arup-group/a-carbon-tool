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
  let workbook = XLSX.read(data, { type: "array" });
  let sheetName = workbook.SheetNames[0];
  return workbook.Sheets[sheetName];
}

/**
 * Checks whether object is an instance of ExcelData
 * @param object object to check
 * @returns whether the object is an instance of ExcelData
 */
export function instanceOfExcelData(object: any): object is ExcelData {
  return (
    "Density" in object &&
    "Material" in object &&
    "Product Stage Carbon A1-A3" in object &&
    "Units" in object &&
    "Wastage" in object
  );
}

/**
 * Verifies that the imported data is valid (ie, it is all instances of ExcelData)
 * @param data The data to verify
 * @returns The data as ExcelData instances, or undefined
 */
export function verify(data: any[]) {
  const filtered = data.filter(instanceOfExcelData);
  return filtered.length === data.length ? filtered : undefined;
}

/**
 * Converts an array of ExcelData object to an array of Material objects
 * @param data The ExcelData objects
 * @returns An array of Material objects
 */
export function exportToMaterials(data: ExcelData[]): Material[] {
  return data.map((d) => exportToMaterial(d));
}

/**
 * Converts an ExcelData object to a Material object
 * @param data The ExcelData object
 * @returns A Material object
 */
export function exportToMaterial(data: ExcelData): Material {
  return {
    productStageCarbonA1A3: data["Product Stage Carbon A1-A3"],
    density: data.Density,
    wastage: data.Wastage,
    units: data.Units,
    source: "custom",
  }
}

/**
 * Converts an array of ExcelData objects to RegionMaterialCarbonFactors so the the excel data can be added to the regions
 * @param data The ExcelData objects
 * @returns A RegionmaterialCarbonFactors object
 */
export function convertToStateMaterial(
  data: ExcelData[],
  name: string,
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
  const returnObj: { [k0: string]: { [k1: string]: Material } } = {}
  returnObj[name] = materialObj;
  return returnObj;
}
