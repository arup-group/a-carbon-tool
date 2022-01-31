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
  India: any;
  UK: any;
}

const MaterialCategories = [
  "Aluminium",
  "Brick",
  "Blockwork",
  "Cement",
  "Concrete",
  "Fire",
  "Glass",
  "Gypsum",
  "Insulation",
  "Plasterboard",
  "Plastic",
  "Steel",
  "Stone",
  "Timber"
]

export interface AllMaterialCarbonFactors {
  [key: string]: {
    [key: string]: {
      [key: string]: Material;
    }
  };
}

export const materialCarbonFactors: MaterialCarbonFactors = {
  India: {
    Aluminum: {
      "Aluminum ingot": {
        productStageCarbonA1A3: 31,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Aluminum extruded profile (window frame)": {
        productStageCarbonA1A3: 26,
        density: 2,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Aluminum profiled cladding": {
        productStageCarbonA1A3: 35,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Aluminum sheet": {
        productStageCarbonA1A3: 32,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Aluminum thin composite cladding": {
        productStageCarbonA1A3: 18,
        density: 6,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Brick: {
      "Brick (common facing)": {
        productStageCarbonA1A3: 0.39,
        density: 1760,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Cement: {
      "Ordinary Portland cement (OPC)": {
        productStageCarbonA1A3: 0.91,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Portland slag cement (25% GGBS)": {
        productStageCarbonA1A3: 0.69,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Fly ash cement (30% pozzolana)": {
        productStageCarbonA1A3: 0.64,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Concrete: {
      "Ready mix concrete with OPC": {
        productStageCarbonA1A3: 0.11,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Ready mix concrete with Portland slag cement (25% GGBS)": {
        productStageCarbonA1A3: 0.089,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Ready mix concrete with fly ash (30% pozzolana)": {
        productStageCarbonA1A3: 0.084,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Lightweight block": {
        productStageCarbonA1A3: 0.37,
        density: 1097,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Medium density block": {
        productStageCarbonA1A3: 0.29,
        density: 1400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Precast concrete panels": {
        productStageCarbonA1A3: 0.27,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Glass: {
      "Float glass": {
        productStageCarbonA1A3: 1.2,
        density: 2500,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Gypsum: {
      "Gypsum (natural gypsum stone)": {
        productStageCarbonA1A3: 0.0037,
        density: 2960,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Calcined gypsum": {
          productStageCarbonA1A3: 0.13,
          density: 3.65,
          wastage: 0.05,
          units: "kgCO2e/kg",
          source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Phosphogypsum": {
          productStageCarbonA1A3: 0.056,
          density: 2960,
          wastage: 0.05,
          units: "kgCO2e/kg",
          source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Plasterboard": {
          productStageCarbonA1A3: 0.49,
          density: 700,
          wastage: 0.05,
          units: "kgCO2e/kg",
          source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Fly ash/lime/gypsum block": {
          productStageCarbonA1A3: 0.2,
          density: 1760,
          wastage: 0.05,
          units: "kgCO2e/kg",
          source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Insulation: {
      "Expanded polystyrene insulation": {
        productStageCarbonA1A3: 2.9,
        density: 20,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Stone wool": {
        productStageCarbonA1A3: 1.4,
        density: 25,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Glass wool": {
        productStageCarbonA1A3: 2.5,
        density: 16,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Polyurethane rigid insulation board (Pentane blown)": {
        productStageCarbonA1A3: 8.1,
        density: 32,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Polyurethane rigid insulation board (HCFC blown)": {
        productStageCarbonA1A3: 12,
        density: 32,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Plastic: {
      "Carpet (nylon) tile": {
        productStageCarbonA1A3: 2.3,
        density: 4,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Vinyl (PVC) flooring": {
        productStageCarbonA1A3: 2.1,
        density: 3,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "u-PVC window frame": {
        productStageCarbonA1A3: 3.9,
        density: 2.8,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Steel: {
      "BOF steel": {
        productStageCarbonA1A3: 2.8,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "DRI steel": {
        productStageCarbonA1A3: 2.1,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "EAF steel": {
        productStageCarbonA1A3: 0.83,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Steel reinforcement bar": {
        productStageCarbonA1A3: 2.6,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Steel section": {
        productStageCarbonA1A3: 2.5,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    },
    Timber: {
      "Air dried sawn timber": {
        productStageCarbonA1A3: 0.29,
        density: 655,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      },
      "Kiln dried timber": {
        productStageCarbonA1A3: 1.16,
        density: 655,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IFC India Construction Materials Database Methodology Report 2017"
      }
    }
  },
  UK: {
    Concrete: {
      "In situ, unreinforced c30/37": {
        productStageCarbonA1A3: 0.103,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "In situ, unreinforced c32/40, 25% GGBS": {
        productStageCarbonA1A3: 0.12,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "In situ, unreinforced c32/40, 50% GGBS": {
        productStageCarbonA1A3: 0.089,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "In situ, unreinforced c32/40 75% GGBS": {
        productStageCarbonA1A3: 0.063,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "In situ, unreinforced c40/50, 25% GGBS": {
        productStageCarbonA1A3: 0.138,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "In situ, unreinforced c40/50, 50% GGBS": {
        productStageCarbonA1A3: 0.102,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "In situ, unreinforced c40/50, 75% GGBS": {
        productStageCarbonA1A3: 0.072,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Generic non-structural, c16/20": {
        productStageCarbonA1A3: 0.113,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Mortar, 1:4 cement:sand with CEM1": {
        productStageCarbonA1A3: 0.163,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Mortar, 1:4 cement:sand with UK average": {
        productStageCarbonA1A3: 0.149,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Precast unreinforced, c40/50": {
        productStageCarbonA1A3: 0.178,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Steel: {
      "Reinforcement bar, UK": {
        productStageCarbonA1A3: 0.76,
        density: 7850,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Reinforcement bar, worldwide": {
        productStageCarbonA1A3: 1.99,
        density: 7850,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Structural section or plate, UK open section": {
        productStageCarbonA1A3: 2.45,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Structural section, UK hollow section": {
        productStageCarbonA1A3: 2.5,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Structural section or plate, european average": {
        productStageCarbonA1A3: 1.13,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Structural section or plate, worldwide average": {
        productStageCarbonA1A3: 2.46,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Glavanised profiled sheet, UK average": {
        productStageCarbonA1A3: 2.74,
        density: 7850,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Glavanised profiled sheet, european average": {
        productStageCarbonA1A3: 2.36,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Glavanised profiled sheet, worldwide average": {
        productStageCarbonA1A3: 2.76,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Blockwork: {
      "Precast concrete block, lightweight": {
        productStageCarbonA1A3: 0.28,
        density: 0,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Precast concrete block, dense": {
        productStageCarbonA1A3: 0.093,
        density: 0,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Brick: {
      "Single engineering clay brick, uk": {
        productStageCarbonA1A3: 0.213,
        density: 1845,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Stone: {
      "Granite": {
        productStageCarbonA1A3: 0.7,
        density: 2700,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Limestone": {
        productStageCarbonA1A3: 0.09,
        density: 2750,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Sandstone": {
        productStageCarbonA1A3: 0.06,
        density: 2250,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Timber: {
      "Manufactured structural timber, CLT, excl sequestration": {
        productStageCarbonA1A3: 0.25,
        density: 500,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE Mass timber embodied carbon factors (2022)",
      },
      "Manufactured structural timber, glulam, excl sequestration": {
        productStageCarbonA1A3: 0.28,
        density: 550,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE Mass timber embodied carbon factors (2022)",
      },
      "Studwork, softwood, excl sequestration": {
        productStageCarbonA1A3: 0.263,
        density: 520,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Formwork, plywood, excl sequestration": {
        productStageCarbonA1A3: 0.681,
        density: 700,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Aluminium: {
      "Sheet, european 31% recycled content": {
        productStageCarbonA1A3: 6.58,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Sheet, worldwide 31% recycled content": {
        productStageCarbonA1A3: 13.0,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate embodied carbon (2021)",
      },
      "Extruded profile, european 31% recycled content": {
        productStageCarbonA1A3: 6.83,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Extruded, worldwide 31% recycled content": {
        productStageCarbonA1A3: 13.0,
        density: 2700,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Glass: {
      "General": {
        productStageCarbonA1A3: 1.44,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      "Toughened": {
        productStageCarbonA1A3: 1.67,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Plasterboard: {
      "Partitions or ceilings, 60% recycled content": {
        productStageCarbonA1A3: 0.39,
        density: 665,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
    Fire: {
      "Intumescent paint, for steelwork": {
        productStageCarbonA1A3: 2.31,
        density: 50,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
    },
  }, 
};
