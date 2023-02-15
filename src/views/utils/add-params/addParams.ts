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

interface IChildObject {
  id: string;
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

interface ParamAdd {
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

export async function testRun(url: string, token: string) {
  const streamid = "465e7157fe";
  const parentObjId = "6607c6f15e6057fee92585125a9d015a";
  const parent: IParamsParent = await fetch(
    `${url}/objects/${streamid}/${parentObjId}/single`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((d) => d.json());
  console.log("parent:", parent);
  const childrenToUpdate = [
    "1ec63ad9d49783c1aa8a59b369084d33",
    "6965daf3991deabb9b6476c964038aae",
    "15b3901d47cf1acc0caa7a857f581b04",
    "2514262e4b43a762e94d8349becc5bcd",
  ];

  // const params: ParamAdd[] = [{
  //   parentid: childToUpdate,
  //   name: "totalCarbon",
  //   param: {
  //     id: "1234567890",
  //     name: "totalCarbon",
  //     units: null,
  //     value: "string",
  //     isShared: false,
  //     isReadOnly: false,
  //     speckle_type: "Objects.BuiltElements.Revit.Parameter",
  //     applicationId: null,
  //     applicationUnit: null,
  //     isTypeParameter: false,
  //     totalChildrenCount: 0,
  //     applicationUnitType: "string",
  //     applicationInternalName: "string",
  //   }
  // }];
  const params: ParamAdd[] = childrenToUpdate.map((c) => ({
    parentid: c,
    name: "totalCarbon",
    param: {
      id: Math.floor(Math.random() * 100000).toString(),
      name: "totalCarbon",
      units: "kgCO2e/kg",
      value: Math.floor(Math.random() * 100),
      isShared: false,
      isReadOnly: false,
      speckle_type: "Objects.BuiltElements.Revit.Parameter",
      applicationId: null,
      applicationUnit: null,
      isTypeParameter: false,
      totalChildrenCount: 0,
      applicationUnitType: "string",
      applicationInternalName: "string",
    },
  }));

  const res = await addParams(parent, params, url, token, streamid);

  // const updatedChild = res.children.filter(
  //   (c) => c.id.split("-")[0] == childToUpdate
  // );
  // console.log("updatedChild", updatedChild);
  console.log("res", res);

  const formData = new FormData();
  formData.append(
    "batch1",
    new Blob([JSON.stringify([res.parent, ...res.children])])
  );
  console.log("formData:", formData);
  await fetch(`${url}/objects/${streamid}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
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
  console.log("childIds:", childIds);
  console.log("idMapper:", idMapper);
  const newParentId = `${parent.id}-${new Date().getTime().toString()}-act`;

  // 2. get all the child objects (full objects, not just reference id's)
  const childObjects = await getChildren<IChildObject>(
    url,
    token,
    streamId,
    parent
  );
  console.log("childObjects:", childObjects);

  // 3. go through each child object, updating id's and adding new params where they should be added
  const newChildObjects: IChildObject[] = childObjects.map((child) => {
    // console.log("1", child)
    // update id to new id
    const returnObj: IChildObject = {
      ...child,
      id: idMapper[child.id],
    };
    // console.log("2")

    if (child.displayValue) {
      console.log("pre child.displayValue:", child.displayValue);
      if (Array.isArray(child.displayValue)) {
        returnObj.displayValue = child.displayValue.map((dv) => ({
          ...dv,
          referencedId: idMapper[dv.referencedId],
        }));
      } else {
        returnObj.displayValue = {
          ...child.displayValue,
          referencedId: child.displayValue.referencedId,
        };
      }
      console.log("post child.displayValue:", returnObj.displayValue);
    }
    if (child.materialQuantities) {
      returnObj.materialQuantities = child.materialQuantities.map((mq) => ({
        ...mq,
        material: {
          ...mq.material,
          id: idMapper[mq.material.id],
        },
      }));
    }
    if (child.vertices) {
      returnObj.vertices = child.vertices.map((v) => ({
        ...v,
        referencedId: idMapper[v.referencedId],
      }));
    }
    if (child.faces) {
      returnObj.faces = child.faces.map((f) => ({
        ...f,
        referencedId: idMapper[f.referencedId],
      }));
    }
    if (child.elements) {
      returnObj.elements = child.elements.map((e) => ({
        ...e,
        referencedId: idMapper[e.referencedId],
      }));
    }
    if (child.topology) {
      console.log("topology:", child.topology);
      const returnTop: Topology[] = child.topology.map((t) => ({
        ...t,
        restraint: {
          speckle_type: "reference",
          referencedId: idMapper[t.restraint.referencedId],
        },
        constraintAxis: {
          speckle_type: "reference",
          referencedId: idMapper[t.constraintAxis.referencedId],
        },
      }));
      returnObj.topology = returnTop;
    }

    const testChild: any = child;
    Object.keys(testChild).forEach((key) => {
      let firstVal = {};
      let isArr = false;
      firstVal = testChild[key];
      if (Array.isArray(testChild[key])) {
        isArr = true;
        firstVal = testChild[key][0];
      }
      if (firstVal instanceof Object && instanceOfReferenceObject(firstVal)) {
        console.log("found sommint", key);
        if (isArr) {
          (returnObj as any)[key] = testChild[key].map(
            (v: ReferenceObject) => ({
              ...v,
              referencedId: idMapper[v.referencedId],
            })
          );
        } else {
          (returnObj as any)[key] = {
            referencedId: idMapper[testChild[key].referencedId],
            speckle_type: "reference",
          };
        }
      }
    });

    // add new parameters if needed
    params.forEach((p) => {
      if (p.parentid === child.id) {
        returnObj.parameters = {
          ...returnObj.parameters,
          [p.name]: p.param,
        };
      }
    });
    // console.log("3")

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
    // console.log("4")
    returnObj.__closure = newClosure;
    // console.log("5")

    return returnObj;
  });
  console.log("newChildObjects:", newChildObjects);

  // 4. create and update new parent object
  // add new id
  const newParentObj: IParamsParent = {
    ...parent,
    id: newParentId,
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
  Object.keys(newParentObj).forEach((key) => {
    if (key.startsWith("@")) {
      const records = newParentObj[key] as ReferenceObject[];
      const newRecords = records.map((r) => ({
        ...r,
        referencedId: idMapper[r.referencedId],
      }));
      newParentObj[key] = newRecords;
    }
  });

  console.log("new parent:", newParentObj);
  console.log("new children:", newChildObjects);
  return {
    parent: newParentObj,
    children: newChildObjects,
  };
}
