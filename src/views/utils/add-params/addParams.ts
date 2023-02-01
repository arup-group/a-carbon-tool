import { getChildren } from "../process-report-object/utils";

interface IReferences {
  [reference: string]: {
    referencedId: string;
    speckle_type: "reference";
  }[];
}

interface IParamsParent {
  id: string;
  __closure: {
    [keys: string]: number;
  };
  [key: string]: ReferenceObject[] | string | {
    [keys: string]: number;
  }
}

interface ReferenceObject {
    referencedId: string;
    speckle_type: "reference";
  }

interface IChildObject {
  id: string;
  __closure: {
    [key: string]: number;
  };
  parameters: {
    [key: string]: Param;
  };
}

interface ParamAdd {
  parentid: string;
  name: string;
  param: Param;
}

interface Param {
  id: string;
  name: string;
  units: string | null;
  value: string;
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

function isReferenceObject(
    object: any
  ): object is ReferenceObject {
    return "referencedId" in object && "speckle_type" in object;
  }

export async function addParams(
  parent: IParamsParent,
  params: ParamAdd[],
  url: string,
  token: string,
  streamId: string
) {
  // inputs:
  // 1. parent object
  // 2. dictionary of id's and the params to add to those id's

  // 1. loop through all child id's and generate new id and dictionary to convert
  const idMapper: { [oldId: string]: string } = {}; // key = oldId, value = new id
  const childIds = Object.keys(parent.__closure);
  childIds.forEach((id) => {
    idMapper[id] = `${id}-${new Date().getTime().toString()}-act`;
  });
  const newParentId = `${parent.id}-${new Date().getTime().toString()}-act`;

  // 2. get all the child objects (full objects, not just reference id's)
  const childObjects = await getChildren<IChildObject>(
    url,
    token,
    streamId,
    parent
  );

  // 3. go through each child object, updating id's and adding new params where they should be added
  const newChildObjects: IChildObject[] = childObjects.map((child) => {
    // update id to new id
    const returnObj: IChildObject = {
      ...child,
      id: idMapper[child.id],
    };

    // add new parameters if needed
    params.forEach((p) => {
      if (p.parentid === child.id) {
        returnObj.parameters = {
          ...returnObj.parameters,
          [p.name]: p.param,
        };
      }
    });

    // update closure to new id's
    const newClosure: { [key: string]: number } = {};
    Object.entries(returnObj.__closure).forEach(([key, value]) => {
      if (idMapper[key]) {
        newClosure[idMapper[key]] = value;
      } else {
        newClosure[key] = value;
      }
    });
    returnObj.__closure = newClosure;

    return returnObj;
  });

  // 4. create and update new parent object
  // add new id
  const newParentObj: IParamsParent = {
    ...parent,
    id: newParentId
  };

  // update __closure to new child id's
  const newClosure: { [key: string]: number } = {};
  Object.entries(newParentObj.__closure).forEach(([key, value]) => {
    if (idMapper[key]) {
        newClosure[idMapper[key]] = value;
    } else {
        newClosure[key] = value;
    }
  });
  newParentObj.__closure = newClosure;

  // update all reference fields (fields that start with an @)
  Object.keys(newParentObj).forEach(key => {
    if (key.startsWith("@")) {
        const records = newParentObj[key] as ReferenceObject[];
        const newRecords = records.map(r => ({
            ...r,
            referencedId: idMapper[r.referencedId]
        }));
        newParentObj[key] = newRecords;
    }
  });

  console.log("new parent:", newParentObj);
  console.log("new children:", newChildObjects);
}
