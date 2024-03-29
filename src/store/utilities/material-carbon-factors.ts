export function instanceOfMaterialFull(object: any): object is MaterialFull {
  return "name" in object && "color" in object && "productStageCarbonA1A3" in object;
}

export interface MaterialFull extends Material {
  name: string;
  color: string; // will be a color hex code
  volume?: number; // will only be used once uploaded to report
}

export interface Material {
  productStageCarbonA1A3: number;
  density: number;
  wastage: number;
  units: string;
  source: string;
}

export interface RegionMaterialCarbonFactors {
  [key: string]: {
    [key: string]: Material;
  };
}

export interface AllMaterialCarbonFactors {
  [key: string]: RegionMaterialCarbonFactors;
}

export const materialCarbonFactors: AllMaterialCarbonFactors = {
  India: {
    Aluminium: {
      "Aluminium ingot": {
        productStageCarbonA1A3: 31,
        density: 2800,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Aluminium extruded profile (window frame)": {
        productStageCarbonA1A3: 26,
        density: 2,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Aluminium profiled cladding": {
        productStageCarbonA1A3: 35,
        density: 2800,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Aluminium sheet": {
        productStageCarbonA1A3: 32,
        density: 2800,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Aluminium thin composite cladding": {
        productStageCarbonA1A3: 18,
        density: 6,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Brick: {
      "Brick (common facing)": {
        productStageCarbonA1A3: 0.39,
        density: 1760,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Honeycomb brick": {
        productStageCarbonA1A3: 0.31,
        density: 700,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Cement: {
      "Ordinary Portland cement (OPC)": {
        productStageCarbonA1A3: 0.91,
        density: 1440,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Portland slag cement (25% GGBS)": {
        productStageCarbonA1A3: 0.69,
        density: 1440,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Portland slag cement (40-50% GGBS)": {
        productStageCarbonA1A3: 0.532,
        density: 1440,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "EPD of Average PPC and PSC Cement, ACC Limited 2018",
      },
      "Fly ash cement (26-32% fly ash)": {
        productStageCarbonA1A3: 0.76,
        density: 1440,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "EPD of Average PPC and Compocem Cement, Ambuja Cements Limited 2018",
      },
      "Fiber cement board (Greencor roofing - 6mm thick)": {
        productStageCarbonA1A3: 1.152,
        density: 1350,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source:
          "EPD of Greencor sheet, Hicem & Hilux board, RAMCO INDUSTRIES LTD.(RIL) 2019",
      },
      "Fiber cement board (Hicem - 4-18mm thick)": {
        productStageCarbonA1A3: 0.731,
        density: 1200,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source:
          "EPD of Greencor sheet, Hicem & Hilux board, RAMCO INDUSTRIES LTD.(RIL) 2019",
      },
      "Fiber cement board (Hilux - 6-12mm thick)": {
        productStageCarbonA1A3: 0.943,
        density: 900,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source:
          "EPD of Greencor sheet, Hicem & Hilux board, RAMCO INDUSTRIES LTD.(RIL) 2019",
      },
    },
    Concrete: {
      "Ready mix concrete (M5)": {
        productStageCarbonA1A3: 0.058,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M7.5)": {
        productStageCarbonA1A3: 0.061,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M10)": {
        productStageCarbonA1A3: 0.078,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M15)": {
        productStageCarbonA1A3: 0.088,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M20)": {
        productStageCarbonA1A3: 0.104,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M25)": {
        productStageCarbonA1A3: 0.121,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M30)": {
        productStageCarbonA1A3: 0.138,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M35)": {
        productStageCarbonA1A3: 0.165,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M40)": {
        productStageCarbonA1A3: 0.167,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M45)": {
        productStageCarbonA1A3: 0.18,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M50)": {
        productStageCarbonA1A3: 0.182,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M55)": {
        productStageCarbonA1A3: 0.188,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M60)": {
        productStageCarbonA1A3: 0.186,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M70)": {
        productStageCarbonA1A3: 0.195,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete (M80)": {
        productStageCarbonA1A3: 0.198,
        density: 2400,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD of 1cu.m of Average Ready Mix Concrete, ACC Limited 2018",
      },
      "Ready mix concrete with Portland slag cement (25% GGBS)": {
        productStageCarbonA1A3: 0.089,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Ready mix concrete with fly ash (30% pozzolana)": {
        productStageCarbonA1A3: 0.084,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Lightweight block": {
        productStageCarbonA1A3: 0.37,
        density: 1097,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Medium density block": {
        productStageCarbonA1A3: 0.29,
        density: 1400,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Dense concrete block": {
        productStageCarbonA1A3: 0.16,
        density: 2200,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Precast concrete panels": {
        productStageCarbonA1A3: 0.27,
        density: 2200,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Autocalved aerated concrete": {
        productStageCarbonA1A3: 0.5,
        density: 500,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Cement based plaster": {
        productStageCarbonA1A3: 0.44,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Cement floor screed": {
        productStageCarbonA1A3: 0.18,
        density: 2200,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Cement mortar": {
        productStageCarbonA1A3: 0.14,
        density: 2200,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Cement/lime render for external wall finishes": {
        productStageCarbonA1A3: 0.27,
        density: 2200,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Glass reinforced concrete": {
        productStageCarbonA1A3: 0.16,
        density: 2550,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Lime mortar": {
        productStageCarbonA1A3: 0.43,
        density: 2200,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Copper: {
      "Coppper sheet": {
        productStageCarbonA1A3: 7.4,
        density: 8940,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Glass: {
      "Float glass": {
        productStageCarbonA1A3: 1.2,
        density: 2500,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Gypsum: {
      "Gypsum (natural gypsum stone)": {
        productStageCarbonA1A3: 0.0037,
        density: 2960,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Calcined gypsum": {
        productStageCarbonA1A3: 0.13,
        density: 3.65,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      Phosphogypsum: {
        productStageCarbonA1A3: 0.056,
        density: 2960,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Plasterboard (12.5mm thick)": {
        productStageCarbonA1A3: 0.516,
        density: 612.5,
        wastage: 0.23,
        units: "kgCO2e/kg",
        source:
          "EPD Gypboard Plain (Standard board), Gyproc, Saint Gobain 2020",
      },
      "Plasterboard (15mm thick)": {
        productStageCarbonA1A3: 0.362,
        density: 734,
        wastage: 0.23,
        units: "kgCO2e/kg",
        source: "EPD 12.5mm and 15mm Gypboard Plain, Gyproc, Saint Gobain 2018",
      },
      "Fly ash/lime/gypsum block": {
        productStageCarbonA1A3: 0.2,
        density: 1760,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Insulation: {
      "Expanded polystyrene insulation": {
        productStageCarbonA1A3: 2.9,
        density: 20,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Stone wool": {
        productStageCarbonA1A3: 1.4,
        density: 25,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Glass wool": {
        productStageCarbonA1A3: 2.5,
        density: 16,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Polyurethane rigid insulation board (Pentane blown)": {
        productStageCarbonA1A3: 8.1,
        density: 32,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Polyurethane rigid insulation board (HCFC blown)": {
        productStageCarbonA1A3: 12,
        density: 32,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Cellulose insulation": {
        productStageCarbonA1A3: 0.37,
        density: 50,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Cork insulation": {
        productStageCarbonA1A3: 0.71,
        density: 80,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "ETICS with EPS board (50-120mm thick)": {
        productStageCarbonA1A3: 6.77,
        density: 24,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "Berger External Thermal Insulation & Composite Systems (ETICS) EPD, Berger 2020",
      },
      "ETICS with XPS board (50-120mm thick)": {
        productStageCarbonA1A3: 5.76,
        density: 37.5,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "Berger External Thermal Insulation & Composite Systems (ETICS) EPD, Berger 2020",
      },
      "ETICS with mineral wool board (50-120mm thick)": {
        productStageCarbonA1A3: 2.129,
        density: 132,
        wastage: 0.15,
        units: "kgCO2e/kg",
        source:
          "Berger External Thermal Insulation & Composite Systems (ETICS) EPD, Berger 2020",
      },
    },
    Soil: {
      "Mud plaster": {
        productStageCarbonA1A3: 0.051,
        density: 1000,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "OPC stabilised soil block": {
        productStageCarbonA1A3: 0.096,
        density: 2000,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "PFA stabilised soil block": {
        productStageCarbonA1A3: 0.01,
        density: 2000,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Portland slag cement stabilised soil block": {
        productStageCarbonA1A3: 0.073,
        density: 2000,
        wastage: 0.2,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Rammed earth": {
        productStageCarbonA1A3: 0.1116,
        density: 1900,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Plastic: {
      "Carpet (nylon) tile": {
        productStageCarbonA1A3: 2.3,
        density: 4,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Vinyl (PVC) flooring": {
        productStageCarbonA1A3: 2.1,
        density: 3,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "u-PVC window frame": {
        productStageCarbonA1A3: 3.9,
        density: 2.8,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    Steel: {
      "BOF steel": {
        productStageCarbonA1A3: 2.8,
        density: 7850,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "DRI steel": {
        productStageCarbonA1A3: 2.1,
        density: 7850,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "EAF steel": {
        productStageCarbonA1A3: 0.83,
        density: 7850,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Steel reinforcement bar (TMT)": {
        productStageCarbonA1A3: 2.835,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Long Products (Steel), JSW 2021",
      },
      "Steel section": {
        productStageCarbonA1A3: 2.5,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Electrogalvanised steel sheet (corrugated zinc)": {
        productStageCarbonA1A3: 3.0,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Galvanised steel stud": {
        productStageCarbonA1A3: 3.1,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Cold-rolled coated GA and GI coil and sheet": {
        productStageCarbonA1A3: 2.76,
        density: 7850,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Flat Products (Steel), JSW 2022",
      },
      "Hot-rolled flat": {
        productStageCarbonA1A3: 3.0,
        density: 7850,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Flat Products (Steel), JSW 2022",
      },
      "Hot-rolled coil": {
        productStageCarbonA1A3: 2.96,
        density: 7850,
        wastage: 0.0,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Flat Products (Steel), JSW 2022",
      },
      "Hot-rolled bar": {
        productStageCarbonA1A3: 2.87,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Long Products (Steel), JSW 2021",
      },
      "Hot-rolled hexagon bar": {
        productStageCarbonA1A3: 2.87,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Long Products (Steel), JSW 2021",
      },
      "Hot-rolled round cornered square": {
        productStageCarbonA1A3: 3.0,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Long Products (Steel), JSW 2021",
      },
      "Heat treated bar": {
        productStageCarbonA1A3: 3.07,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "EPD Average of Finished Long Products (Steel), JSW 2021",
      },
    },
    Timber: {
      "Air dried sawn timber": {
        productStageCarbonA1A3: 0.29,
        density: 655,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Kiln dried timber": {
        productStageCarbonA1A3: 1.16,
        density: 655,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      "Particle board/chipboard": {
        productStageCarbonA1A3: 0.2,
        density: 710,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
      Plywood: {
        productStageCarbonA1A3: 1.02,
        density: 600,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
    NaturalMaterials: {
      "Straw bale": {
        productStageCarbonA1A3: 0.19,
        density: 140,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "IFC India Construction Materials Database Methodology Report 2017",
      },
    },
  },
  Netherlands: {
    Aluminium: {
      General: {
        productStageCarbonA1A3: 4.4897202,
        density: 2755,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
    },
    Brick: {
      General: {
        productStageCarbonA1A3: 0.24430374,
        density: 1822,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
    },
    Coating: {
      "Powdercoat Aluminium": {
        productStageCarbonA1A3: 16.2,
        density: 1826,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
      "Powdercoat steel": {
        productStageCarbonA1A3: 15.8,
        density: 1824,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
    },
    Concrete: {
      "In-situ with rebar - average NL value": {
        productStageCarbonA1A3: 0.115,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "CE Delft - Milieu-impact van betongebruik in de Nederlandse bouw",
      },
      "Pre-cast with rebar - average NL value": {
        productStageCarbonA1A3: 0.149,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source:
          "CE Delft - Milieu-impact van betongebruik in de Nederlandse bouw",
      },
      "150mm Kanaalplaatvloer - 268kg/m2": {
        productStageCarbonA1A3: 0.1401,
        density: 1787,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source: "VBI Consolis EPD",
      },
      "200mm Kanaalplaatvloer - 308kg/m2": {
        productStageCarbonA1A3: 0.1383,
        density: 1540,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source: "VBI Consolis EPD",
      },
      "260mm Kanaalplaatvloer - 383kg/m2": {
        productStageCarbonA1A3: 0.1471,
        density: 1473,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source: "VBI Consolis EPD",
      },
      "320mm Kanaalplaatvloer - 429kg/m2": {
        productStageCarbonA1A3: 0.1618,
        density: 1341,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source: "VBI Consolis EPD",
      },
      "400mm Kanaalplaatvloer - 490kg/m2": {
        productStageCarbonA1A3: 0.1603,
        density: 1225,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source: "VBI Consolis EPD",
      },
      "Breedplaatvloer incl wapening - precast only": {
        productStageCarbonA1A3: 0.1917,
        density: 2400,
        wastage: 0.03,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021) - SBK442",
      },
      "C30/37 100% CEM1": {
        productStageCarbonA1A3: 0.111,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data)",
      },
      "C30/37 25% CEM1 75% CEMIII/C": {
        productStageCarbonA1A3: 0.057,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C30/37 50% CEM1 50% CEMIII/C": {
        productStageCarbonA1A3: 0.078,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C30/37 75% CEM1 25% CEMIII/C": {
        productStageCarbonA1A3: 0.096,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C40/50 100% CEM1": {
        productStageCarbonA1A3: 0.141,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C40/50 25% CEM1 75% CEMIII/C": {
        productStageCarbonA1A3: 0.072,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C40/50 50% CEM1 50% CEMIII/C": {
        productStageCarbonA1A3: 0.099,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C40/50 75% CEM1 25% CEMIII/C": {
        productStageCarbonA1A3: 0.121,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C50/60 100% CEM1": {
        productStageCarbonA1A3: 0.177,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C50/60 25% CEM1 75% CEMIII/C": {
        productStageCarbonA1A3: 0.089,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C50/60 50% CEM1 50% CEMIII/C": {
        productStageCarbonA1A3: 0.125,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
      "C50/60 75% CEM1 25% CEMIII/C": {
        productStageCarbonA1A3: 0.155,
        density: 2400,
        wastage: 0.04,
        units: "kgCO2e/kg",
        source: "Sus. Domain Generated from MRPI Cement Data",
      },
    },
    FillMaterials: {
      EPS: {
        productStageCarbonA1A3: 0.246392161,
        density: 20,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
    },
    Glass: {
      "Double glazing": {
        productStageCarbonA1A3: 1.1306612,
        density: 1823,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
    },
    Steel: {
      "Reinforcement - NL average": {
        productStageCarbonA1A3: 1.36,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "Vereniging Wapeningsstaal Nederland MRPI EPD",
      },
      "Rolled section (90% EAF + 10% BF)": {
        productStageCarbonA1A3: 0.908,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
      "Stainless steel (RVS)": {
        productStageCarbonA1A3: 5.0733127,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "De Nationale Milieudatabase (2021)",
      },
      "Rolled European Sections (90%EAF+10%BF)": {
        productStageCarbonA1A3: 0.908,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "Bouwen met staal (MRPI) - Heavy construction Products",
      },
      "Structural hollow sections (TATA)": {
        productStageCarbonA1A3: 2.5,
        density: 7850,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "Tata Steel - Structural Hollow sections EPD",
      },
      "Comflor metal deck": {
        productStageCarbonA1A3: 2.66,
        density: 7850,
        wastage: 0.01,
        units: "kgCO2e/kg",
        source: "Tata Steel - Comflor EPD's averaged (51/60/80)",
      },
    },
    Timber: {
      "Average Engineered Timber (CLT/Glulam)": {
        productStageCarbonA1A3: 0.32,
        density: 550,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "Averaged from CLT/Glulam & LVL EPD's",
      },
      "CLT NL (C24 Spruce)": {
        productStageCarbonA1A3: 0.324,
        density: 500,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "Derix X-LAM CLT 2019 EPD Spruce",
      },
      "Glulam NL (GL24h, GL28c and CL32c)": {
        productStageCarbonA1A3: 0.32,
        density: 550,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source:
          "Studiengemeinschaft Holzleimbau EPD Glulam without 811kg/m3 biogenic carbon",
      },
      "LVL NL": {
        productStageCarbonA1A3: 0.64,
        density: 550,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "Kerto LVL EPD (2015)",
      },
    },
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
      Granite: {
        productStageCarbonA1A3: 0.7,
        density: 2700,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      Limestone: {
        productStageCarbonA1A3: 0.09,
        density: 2750,
        wastage: 0.1,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      Sandstone: {
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
      General: {
        productStageCarbonA1A3: 1.44,
        density: 2800,
        wastage: 0.05,
        units: "kgCO2e/kg",
        source: "IStructE How to calculate Embodied Carbon (2021)",
      },
      Toughened: {
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
