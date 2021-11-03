import get from "lodash.get";

self.onmessage = ({ data: { objects, propToLookFor } }) => {
  let groups = [],
    orphans = [];
  objects.forEach((obj, index) => {
    let propValue = get(obj.properties, propToLookFor);
    if (propValue) {
      let myGroup = groups.find(gr => gr.name === propValue);
      if (myGroup) {
        myGroup.objects.push(obj._id);
        if (myGroup.materialName !== obj.properties.material_name) {
          myGroup.materialName = "varies";
        }
      } else
        groups.push({
          key: propToLookFor,
          name: propValue,
          objects: [obj._id],
          materialName: obj.properties.material_name,
        });
    } else {
      orphans.push(obj._id);
    }
    if (index === objects.length - 1) {
      self.postMessage({
        groups: groups,
        orphans: orphans,
      });
    }
  });
};
