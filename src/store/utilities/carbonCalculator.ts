import { SpeckleObjectFormComplete } from "@/models/newAssessment";

// TODO: MOVE THESE INTO A MIXIN?

const transportFactors = {
  // values taken from RICS guidance
  road: 0.1136, // gCO2/kg/km
  sea: 0.016143, // gCO2/kg/km
};

// CALCULATIONS
// calculate the a1a3 carbon for any speckle object against a specified material
export function productStageCarbonA1A3(obj: SpeckleObjectFormComplete) {
  // calculate mass of object
  const mass = obj.formData.volume * obj.formData.material.density;
  // calculate a1a3 carbon of object
  const a1a3 = mass * obj.formData.material.productStageCarbonA1A3;
  return a1a3;
}

// calculate the carbon associated with transport
export function transportCarbonA4(obj: SpeckleObjectFormComplete) {
  const factors = transportFactors;

  const trans = obj.formData.transport.values;

  const transCarb =
    (obj.formData.material.density *
      obj.formData.volume *
      (trans.road * factors.road + trans.sea * factors.sea)) /
    1000;
  return transCarb;
}

// calculate the carbon associated with site activities
export function constructionCarbonA5Site(sysCost: number) {
  const a5Site = (sysCost * 1400) / 100000;
  return a5Site;
}

// calculate the carbon associated with material wastage
export function constructionCarbonA5Waste(obj: SpeckleObjectFormComplete) {
  const wasteVolume =
    obj.formData.volume * (1 / (1 - obj.formData.material.wastage) - 1);

  // create new object with waste volume
  const wasteObj = obj;
  wasteObj.formData.volume = wasteVolume;

  // compute a1-a4 for waste materials
  const a1a3 = productStageCarbonA1A3(wasteObj);
  const a4 = transportCarbonA4(wasteObj);

  const a5waste = a1a3 + a4;

  return a5waste;
}

type FullA5Calc = {
  sysCost: number;
  obj: SpeckleObjectFormComplete;
};
type PartialA5Calc = {
  site: number;
  waste: number;
};

function instanceOfFullA5Calc(object: any): object is FullA5Calc {
  return object && "sysCost" in object;
}

export function constructionCarbonA5(ops: FullA5Calc | PartialA5Calc) {
  let a5: number;
  if (instanceOfFullA5Calc(ops)) {
    a5 =
      constructionCarbonA5Site(ops.sysCost) +
      constructionCarbonA5Waste(ops.obj);
  } else {
    a5 = ops.site + ops.waste;
  }

  return a5;
}
