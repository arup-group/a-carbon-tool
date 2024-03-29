import { PropertyInfo } from "@speckle/viewer";
import { flattenObject } from "./";
import { StringPropertyGroups } from "@/models/newAssessment";

// source: https://github.com/specklesystems/speckle-server
export function findStringProps(
  speckleObjsPropsSearch: any[],
  objectsObj: { [key: string]: any } // we can probably figure out a way to no longer need this...
): StringPropertyGroups[] {
  const propValues: any = {};
  speckleObjsPropsSearch.forEach((obj) => {
    const flattened = flattenObject(obj);
    for (const key in flattened) {
      if (Array.isArray(flattened[key])) continue;
      if (!propValues[key]) propValues[key] = [];
      propValues[key].push({ value: flattened[key], id: flattened.id });
    }
  });
  const allPropInfos: PropertyInfo[] = [];

  for (const propKey in propValues) {
    const propValuesArr = propValues[propKey];
    const propInfo = {} as PropertyInfo;
    propInfo.key = propKey;
    propInfo.type =
      typeof propValuesArr[0].value === "string" ? "string" : "number";
    propInfo.objectCount = propValuesArr.length;

    // For string based props, keep track of which ids belong to which group
    if (propInfo.type === "string") {
      const stringPropInfo = propInfo as any;
      const valueGroups: any = {};
      for (const { value, id } of propValuesArr) {
        if (!valueGroups[value]) valueGroups[value] = [];
        valueGroups[value].push(id);
      }
      stringPropInfo.valueGroups = [];
      for (const key in valueGroups)
        stringPropInfo.valueGroups.push({ value: key, ids: valueGroups[key] });

      stringPropInfo.valueGroups = stringPropInfo.valueGroups.sort(
        (a: any, b: any) => a.value.localeCompare(b.value)
      );
    }
    // For numeric props, we keep track of min and max and all the {id, val}s
    if (propInfo.type === "number") {
      const numProp = propInfo as any;
      numProp.min = Number.MAX_VALUE;
      numProp.max = Number.MIN_VALUE;
      for (const { value } of propValuesArr) {
        if (value < numProp.min) numProp.min = value;
        if (value > numProp.max) numProp.max = value;
      }
      numProp.valueGroups = propValuesArr.sort(
        (a: any, b: any) => a.value - b.value
      );
    }
    allPropInfos.push(propInfo as PropertyInfo);
  }

  const filters = [];
  for (const rawFilter of allPropInfos) {
    const filter: any = {};
    filter.data = rawFilter;
    const key = rawFilter.key;
    // Handle revit params
    if (key.startsWith("parameters.")) {
      if (key.endsWith(".value")) {
        const nameProp: any = allPropInfos.find(
          (f) => f.key === key.replace(".value", ".name")
        );
        filter.name = nameProp?.valueGroups[0].value;
        filter.targetKey = key;
        filters.push(filter);
        continue;
      } else {
        continue;
      }
    }
    // Beautify level name
    if (key === "level.name") {
      filter.name = "Level";
      filter.targetKey = key;
      filters.push(filter);
      continue;
    }
    // Beautify speckle type
    if (key === "speckle_type") {
      filter.name = "Object Type";
      filter.targetKey = key;
      filters.push(filter);
      continue;
    }
    // Skip some
    if (
      key.endsWith(".units") ||
      key.endsWith(".speckle_type") ||
      key.includes(".parameters.") ||
      key.includes("level.") ||
      key.includes("renderMaterial") ||
      key.includes(".domain") ||
      key.includes("plane.") ||
      key.includes("baseLine") ||
      key.includes("referenceLine") ||
      key.includes("end.") ||
      key.includes("start.") ||
      key.includes("endPoint.") ||
      key.includes("midPoint.") ||
      key.includes("startPoint.") ||
      key.includes("startPoint.") ||
      key.includes("displayStyle") ||
      key.includes("displayValue") ||
      key.includes("displayMesh")
    ) {
      continue;
    }

    filter.name = key;
    filter.targetKey = key;
    filters.push(filter);
  }

  // filter out number filters and add in an "undefined" option for those that need it
  const stringFilters = filters.filter((f) => f.data.type === "string");
  stringFilters.forEach((f) => {
    if (f.data.objectCount !== Object.keys(objectsObj).length) {
      const ids2d = (
        f.data.valueGroups as { value: string; ids: string[] }[]
      ).map((v: { value: string; ids: string[] }) => v.ids);
      const ids: string[] = [];
      ids2d.forEach((i) => ids.push(...i));

      let allIds = Object.keys(objectsObj);

      ids.forEach((i) => {
        const index = allIds.indexOf(i);
        if (index > -1) {
          allIds.splice(index, 1);
        }
      });

      f.data.valueGroups.push({
        value: "undefined",
        ids: [...allIds],
      });
    }
  });

  return stringFilters;
}
