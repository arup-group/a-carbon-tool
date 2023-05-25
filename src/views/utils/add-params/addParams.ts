import { getChildren } from "../process-report-object/utils";

interface IReferences {
  [reference: string]: {
    referencedId: string;
    speckle_type: "reference";
  }[];
}

export interface IParamsParent {
  id: string;
  __closure: {
    [keys: string]: number;
  };
  [key: string]:
    | ReferenceObject[]
    | string
    | {
        [keys: string]: number;
      };
}

interface ReferenceObject {
  referencedId: string;
  speckle_type: "reference";
}

interface Topology {
  restraint: ReferenceObject;
  constraintAxis: ReferenceObject;
}

export interface IChildObject {
  id: string;
  speckle_type: string;
  __closure: {
    [key: string]: number;
  };
  parameters: {
    [key: string]: Param;
  };
  displayValue?: ReferenceObject[] | ReferenceObject;
  materialQuantities?: {
    material: {
      id: string;
    };
  }[];
  faces?: ReferenceObject[];
  vertices?: ReferenceObject[];
  elements?: ReferenceObject[];
  topology?: Topology[];
}

function instanceOfReferenceObject(object: any): object is ReferenceObject {
  return (
    "referencedId" in object &&
    "speckle_type" in object &&
    object.speckle_type === "reference"
  );
}

export interface IdMapper {
  [oldId: string]: string;
}

export interface ParamAdd {
  parentid: string;
  name: string;
  param: Param;
}

interface Param {
  id: string;
  name: string;
  units: string | null;
  value: any;
  isShared: boolean;
  isReadOnly: boolean;
  speckle_type: "Objects.BuiltElements.Revit.Parameter";
  applicationId: string | null;
  applicationUnit: string | null;
  isTypeParameter: boolean;
  totalChildrenCount: number;
  applicationUnitType: string;
  applicationInternalName: string;
}

export interface AddParamsModel {
  parent: IParamsParent;
  children: IChildObject[];
  idMapper: IdMapper;
}

export async function testRun(url: string, token: string, params: ParamAdd[]) {
  const streamid1 = "4a48b650af";
  const parentObjId = "e0965cb466f45fce6d949fb33f8992d7";
  const parent: IParamsParent = await fetch(
    `${url}/objects/${streamid1}/${parentObjId}/single`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((d) => d.json());

  const res = await addParams(parent, params, url, token, streamid1);

  const combined = [res.parent, ...res.children];

  const combinedSplit: (IParamsParent | IChildObject)[][] = [];
  const batchSize = 100;
  for (let i = 0; i < combined.length; i += batchSize) {
    combinedSplit.push(
      combined.slice(i, Math.min(i + batchSize, combined.length))
    );
  }

  await Promise.all(
    combinedSplit.map((c) => {
      const formData = new FormData();
      formData.append("batch1", new Blob([JSON.stringify(c)]));
      const streamid2 = "465e7157fe";
      return fetch(`${url}/objects/${streamid2}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    })
  );
}

export async function addParams(
  parent: IParamsParent,
  params: ParamAdd[],
  url: string,
  token: string,
  streamId: string,
  childObjects?: IChildObject[]
): Promise<AddParamsModel> {
  // inputs:
  // parent. parent object
  // params. array of id's and the params to add to those id's

  // 1. loop through all child id's and generate new id and dictionary to convert
  const idMapper: IdMapper = {}; // key = oldId, value = new id
  const childIds = Object.keys(parent.__closure);
  childIds.forEach((id) => {
    idMapper[id] = `${id}-${new Date().getTime().toString()}-act`;
  });
  const newParentId = `${parent.id}-${new Date().getTime().toString()}-act`;

  // 2. get all the child objects (full objects, not just reference id's)
  if (!childObjects) {
    childObjects = await getChildren<IChildObject>(
      url,
      token,
      streamId,
      parent
    );
  }

  // 3. go through each child object, updating id's and adding new params where they should be added
  const newChildObjects: IChildObject[] = childObjects.map((child) => {
    const initialChildId = child.id;
    let returnObj: IChildObject;
    // if an object has no values in __closure (or the property doesn't exist) then don't need to convert object as there will be no chlidren
    if (
      child.__closure !== undefined &&
      Object.keys(child.__closure).length > 0
    ) {
      returnObj = convertObj(child, idMapper);
    } else {
      returnObj = child;
    }
    returnObj.id = idMapper[initialChildId];

    // add new parameters if needed
    params.forEach((p) => {
      if (p.parentid === initialChildId) {
        returnObj.parameters = {
          ...returnObj.parameters,
          [p.name]: p.param,
        };
      }
    });

    // update closure to new id's
    const newClosure: { [key: string]: number } = {};
    if (returnObj.__closure) {
      Object.entries(returnObj.__closure).forEach(([key, value]) => {
        if (idMapper[key]) {
          newClosure[idMapper[key]] = value;
        } else {
          newClosure[key] = value;
        }
      });
    }
    returnObj.__closure = newClosure;

    return returnObj;
  });

  // 4. create and update new parent object
  const newClosure: { [key: string]: number } = {};
  Object.entries(parent.__closure).forEach(([key, value]) => {
    if (idMapper[key]) {
      newClosure[idMapper[key]] = value;
    } else {
      newClosure[key] = value;
    }
  });
  const newParentObj: IParamsParent = convertObj(parent, idMapper);
  newParentObj.id = newParentId;
  newParentObj.__closure = newClosure;

  return {
    parent: newParentObj,
    children: newChildObjects,
    idMapper: idMapper,
  };
}

function convertObj(obj: any, idMapper: IdMapper) {
  if (instanceOfReferenceObject(obj))
    return {
      ...obj,
      referencedId: idMapper[obj.referencedId],
    };
  else if (Array.isArray(obj)) {
    // do some stuff
    return handleArray(obj, idMapper);
  } else if (typeof obj === "object") {
    // do some different stuff
    Object.keys(obj).forEach((k) => {
      if (Array.isArray(obj[k])) {
        // do same stuff as above
        obj[k] = handleArray(obj[k], idMapper);
      } else if (typeof obj[k] === "object" && obj[k] !== null) {
        obj[k] = convertObj(obj[k], idMapper);
      }
    });
    return obj;
  } else {
    return obj;
  }
}

function handleArray(arr: any[], idMapper: IdMapper) {
  return arr.map((a) => {
    if (Array.isArray(a)) a = handleArray(a, idMapper);
    else if (typeof a === "object") {
      a = convertObj(a, idMapper);
    }
    return a;
  });
}
