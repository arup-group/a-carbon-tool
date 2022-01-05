export interface MaterialFull extends Material {
  name: string;
  color: string; // will be a color hex code
}

export interface Material {
  productStageCarbonA1A3: number;
  density: number;
  wastage: number;
  units: string;
  source: string;
}

export interface MaterialCarbonFactors {
  UK: UKMaterialCarbonFactors;
  Australia: any;
  EU: any;
  "East Asia": any;
}

export interface UKMaterialCarbonFactors {
  concrete: {
    [key: string]: Material;
  };
  steel: any;
  blockwork: any;
  brick: any;
  stone: any;
  timber: any;
  aluminium: any;
  glass: any;
  plasterboard: any;
  "fire protection": any;
}

export const materialCarbonFactors: MaterialCarbonFactors = {
  UK: {
    concrete: {
      "in situ, unreinforced c30/37": {
        productStageCarbonA1A3: 0.103,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "in situ, unreinforced c32/40, 25% GGBS": {
        productStageCarbonA1A3: 0.12,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "in situ, unreinforced c32/40, 50% GGBS": {
        productStageCarbonA1A3: 0.089,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "in situ, unreinforced c32/40 75% GGBS": {
        productStageCarbonA1A3: 0.063,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "in situ, unreinforced c40/50, 25% GGBS": {
        productStageCarbonA1A3: 0.138,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "in situ, unreinforced c40/50, 50% GGBS": {
        productStageCarbonA1A3: 0.102,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "in situ, unreinforced c40/50, 75% GGBS": {
        productStageCarbonA1A3: 0.072,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "generic non-structural, c16/20": {
        productStageCarbonA1A3: 0.113,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "mortar, 1:4 cement:sand with CEM1": {
        productStageCarbonA1A3: 0.163,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "mortar, 1:4 cement:sand with UK average": {
        productStageCarbonA1A3: 0.149,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "precast unreinforced, c40/50": {
        productStageCarbonA1A3: 0.178,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    steel: {
      "reinforcement bar, UK": {
        productStageCarbonA1A3: 0.76,
        density: 7850,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "reinforcement bar, worldwide": {
        productStageCarbonA1A3: 1.99,
        density: 7850,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "structural section or plate, UK open section": {
        productStageCarbonA1A3: 2.45,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "structural section, UK hollow section": {
        productStageCarbonA1A3: 2.5,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "structural section or plate, european average": {
        productStageCarbonA1A3: 1.13,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "structural section or plate, worldwide average": {
        productStageCarbonA1A3: 2.46,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "glavanised profiled sheet, UK average": {
        productStageCarbonA1A3: 2.74,
        density: 7850,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "glavanised profiled sheet, european average": {
        productStageCarbonA1A3: 2.36,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "glavanised profiled sheet, worldwide average": {
        productStageCarbonA1A3: 2.76,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    blockwork: {
      "precast concrete block, lightweight": {
        productStageCarbonA1A3: 0.28,
        density: 0,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "precast concrete block, dense": {
        productStageCarbonA1A3: 0.093,
        density: 0,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    brick: {
      "single engineering clay brick, uk": {
        productStageCarbonA1A3: 0.213,
        density: 1845,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    stone: {
      granite: {
        productStageCarbonA1A3: 0.7,
        density: 2700,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      limestone: {
        productStageCarbonA1A3: 0.09,
        density: 2750,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      sandstone: {
        productStageCarbonA1A3: 0.06,
        density: 2250,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    timber: {
      "manufactured structural timber, CLT, excl sequestration": {
        productStageCarbonA1A3: 0.437,
        density: 500,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "manufactured structural timber, glulam, excl sequestration": {
        productStageCarbonA1A3: 0.512,
        density: 550,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "studwork, softwood, excl sequestration": {
        productStageCarbonA1A3: 0.263,
        density: 520,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "formwork, plywood, excl sequestration": {
        productStageCarbonA1A3: 0.681,
        density: 700,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    aluminium: {
      "sheet, european 31% recycled content": {
        productStageCarbonA1A3: 6.58,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "sheet, worldwide 31% recycled content": {
        productStageCarbonA1A3: 13.0,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "extruded profile, european 31% recycled content": {
        productStageCarbonA1A3: 6.83,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      "extruded, worldwide 31% recycled content": {
        productStageCarbonA1A3: 13.0,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    glass: {
      general: {
        productStageCarbonA1A3: 1.44,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
      toughened: {
        productStageCarbonA1A3: 1.67,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    plasterboard: {
      "partitions or ceilings, 60% recycled content": {
        productStageCarbonA1A3: 0.39,
        density: 665,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
    "fire protection": {
      "intumescent paint, for steelwork": {
        productStageCarbonA1A3: 2.31,
        density: 50,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE 2021",
      },
    },
  },
  Australia: {},
  EU: {},
  "East Asia": {},
};
