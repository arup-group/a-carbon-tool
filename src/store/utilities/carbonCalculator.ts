// DEFINITIONS
// definitions to be superceded elsewhere once we hook up speckle
interface SpeckleObject {
  id: string;
  volume: number;
  transport: string;
  material: string; // blank by default - to be assigned as part of process
  // carbon values to default to 0 once initiated
  productStageCarbonA1A3: number;
  transportCarbonA4: number;
  constructionCarbonA5: number;
}

// as shown in materials.json
interface Material {
  density: number;
  wastage: number;
  productStageCarbonA1A3: number; //kgCO2e/kg
  source: string;
}

const transportType = {
  // values taken from RICS guidance
  local: {
    road: 50, // km
    sea: 0, //km
  },
  regional: {
    road: 300, // km
    sea: 0, // km
  },
  global: {
    road: 200, // km
    sea: 10000, // km
  },
};

const transportFactors = {
  // values taken from RICS guidance
  road: 0.1136, // gCO2/kg/km
  sea: 0.016143, // gCO2/kg/km
};

// CALCULATIONS
// calculate the a1a3 carbon for any speckle object against a specified material
function productStageCarbonA1A3(obj: SpeckleObject, mat: Material) {
  // calculate mass of object
  const mass = obj.volume * mat.density;
  // calculate a1a3 carbon of object
  const a1a3 = mass * mat.productStageCarbonA1A3;
  return a1a3;
}

// calculate the carbon associated with transport
function transportCarbonA4(obj: SpeckleObject, mat: Material) {
  const mode = transportType;
  const factors = transportFactors;

  let trans = { road: 0, sea: 0 };
  // set transport distance based on object definition
  if (obj.transport == "regional") {
    trans = mode.regional;
  } else if (obj.transport == "global") {
    trans = mode.global;
  } else {
    trans = mode.local;
  }

  const transCarb =
    mat.density *
    obj.volume *
    (trans.road * factors.road + (trans.sea * factors.sea) / 1000);
  return transCarb;
}

// calculate the carbon associated with site activities
function constructionCarbonA5Site(sysCost: number) {
  const a5Site = (sysCost * 1400) / 100000;
  return a5Site;
}

// calculate the carbon associated with material wastage
function constructionCarbonA5Waste(obj: SpeckleObject, mat: Material) {
  const wasteVolume = obj.volume * (1 / (1 - mat.wastage) - 1);

  // create new object with waste volume
  const wasteObj = obj;
  wasteObj.volume = wasteVolume;

  // compute a1-a4 for waste materials
  const a1a3 = productStageCarbonA1A3(wasteObj, mat);
  const a4 = transportCarbonA4(wasteObj, mat);

  const a5waste = a1a3 + a4;

  return a5waste;
}

function constructionCarbonA5(
  sysCost: number,
  obj: SpeckleObject,
  mat: Material
) {
  const a5 =
    constructionCarbonA5Site(sysCost) + constructionCarbonA5Waste(obj, mat);

  return a5;
}
