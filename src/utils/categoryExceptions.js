import cloneDeep from 'lodash.clonedeep';

import {
  getPipeworkMaterialVolume,
  getPipeworkInsulationVolume,
  getRectangularDuctworkMaterialVolume,
  getRectangularDuctworkInsulationVolume,
  getCircularDuctworkMaterialVolume,
  getCircularDuctworkInsulationVolume,
} from "./mepCalcs";

const cloneObject = obj => {
  const clonedObj = cloneDeep(obj);
  clonedObj._id = `${clonedObj._id}_clone`;
  clonedObj.properties.id = clonedObj._id;

  return clonedObj;
};

const pipeExceptionHandler = pipe => {
  // Handle pipe
  pipe.properties.parameters.Volume = getPipeworkMaterialVolume(pipe);
  pipe.properties.speckle_type = "Pipe";

  // Handle pipe insulation
  if (pipe.properties.parameters["Insulation Thickness"] > 0) {
    const insulation = cloneObject(pipe);

    insulation.properties.parameters.Volume = getPipeworkInsulationVolume(
      insulation,
    );
    insulation.properties.speckle_type = "Pipe Insulation";

    return [pipe, insulation];
  }

  return pipe;
};

const ductExceptionHandler = duct => {
  const {
    Family,
    "Insulation Thickness": InsulationThickness,
  } = duct.properties.parameters;
  // Handle rectangular duct
  if (Family === "Rectangular Duct") {
    duct.properties.speckle_type = "Duct";
    duct.properties.parameters.Volume = getRectangularDuctworkMaterialVolume(
      duct,
    );

    // Handle rectangular duct insulation
    if (InsulationThickness > 0) {
      const insulation = cloneObject(duct);
      insulation.properties.parameters.Volume = getRectangularDuctworkInsulationVolume(
        insulation,
      );
      insulation.properties.speckle_type = "Duct Insulation";

      return [duct, insulation];
    }
  }

  // Handle circular duct
  if (Family === "Circular Duct") {
    duct.properties.speckle_type = "Duct";
    duct.properties.parameters.Volume = getCircularDuctworkMaterialVolume(duct);

    // Handle circular duct insulation
    if (InsulationThickness > 0) {
      const insulation = cloneObject(duct);
      insulation.properties.parameters.Volume = getCircularDuctworkInsulationVolume(
        insulation,
      );
      insulation.properties.speckle_type = "Duct Insulation";

      return [duct, insulation];
    }
  }

  return duct;
};

export const categoryExceptionRef = {
  Pipes: pipeExceptionHandler,
  Ducts: ductExceptionHandler,
};
