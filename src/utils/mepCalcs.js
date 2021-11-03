const getPipeworkVolume = (length, innerDiameter, outerDiameter) => {
  const crossSectionalArea = Math.PI * ((outerDiameter / 2) ** 2);
  const innerArea = Math.PI * ((innerDiameter / 2) ** 2);
  const materialArea = crossSectionalArea - innerArea;

  return materialArea * length;
};

export const getPipeworkMaterialVolume = pipework => {
  const {
    Length,
    Diameter,
    "Inside Diameter": InsideDiameter,
  } = pipework.properties.parameters;

  return getPipeworkVolume(
    Length / 1000,
    InsideDiameter / 1000,
    Diameter / 1000
  );
};

export const getPipeworkInsulationVolume = pipework => {
  const {
    Length,
    Diameter,
    "Insulation Thickness": InsulationThickness,
  } = pipework.properties.parameters;

  return getPipeworkVolume(
    Length / 1000,
    Diameter / 1000,
    (Diameter + (InsulationThickness * 2)) / 1000,
  );
};

export const getRectangularDuctworkMaterialVolume = ductwork => {
  const { Length, Height, Width } = ductwork.properties.parameters;
  const length = Length / 1000;
  const height = Height / 1000;
  const width = Width / 1000;

  // Assume thickness 1mm
  const thickness = 0.001;

  const crossSectionalArea = (width + (2 * thickness)) * (height + (2 * thickness));
  const clearArea = width * height;
  const materialArea = crossSectionalArea - clearArea;

  return materialArea * length;
};

export const getRectangularDuctworkInsulationVolume = ductwork => {
  const {
    Length,
    Height,
    Width,
    "Insulation Thickness": InsulationThickness
  } = ductwork.properties.parameters;
  const length = Length / 1000;
  const height = Height / 1000;
  const width = Width / 1000;
  const insulationThickness = InsulationThickness / 1000;

  // Assume thickness 1mm
  const materialThickness = 0.001;

  const crossSectionalArea =
    (width + (2 * (materialThickness + insulationThickness))) *
    (height + (2 * (materialThickness + insulationThickness)));
  const ductArea = (width + 2 * materialThickness) * (height + 2 * materialThickness);
  const materialArea = crossSectionalArea - ductArea;

  return materialArea * length;
};

export const getCircularDuctworkMaterialVolume = ductwork => {
  const { Length, Diameter } = ductwork.properties.parameters;
  const length = Length / 1000;
  const diameter = Diameter / 1000;

  // Assume thickness 1mm
  const thickness = 0.001;

  const crossSectionalArea = Math.PI * (((diameter / 2) + thickness) ** 2);
  const clearArea = Math.PI * ((diameter / 2) ** 2);
  const materialArea = crossSectionalArea - clearArea;

  return materialArea * length;
};

export const getCircularDuctworkInsulationVolume = ductwork => {
  const {
    Length,
    Diameter,
    "Insulation Thickness": InsulationThickness
  } = ductwork.properties.parameters;
  const length = Length / 1000;
  const diameter = Diameter / 1000;
  const insulationThickness = InsulationThickness / 1000;

  const crossSectionalArea = Math.PI * ((diameter / 2) + insulationThickness) ** 2;
  const ductArea = Math.PI * (diameter / 2) ** 2;
  const materialArea = crossSectionalArea - ductArea;

  return materialArea * length;
}
