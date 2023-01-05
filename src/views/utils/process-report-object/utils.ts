import { HTTPStreamDataParent } from "@/models/graphql/";
import { ChildSpeckleObjectData } from "@/models/graphql/StreamData.interface";

export async function getChildren(
  url: string,
  token: string,
  streamId: string,
  parent: HTTPStreamDataParent
): Promise<ChildSpeckleObjectData[]> {
  // get the id's of the children objects
  const children: string[] = Object.keys(parent.__closure);

  // split down the children array into multiple arrays of max length 1000
  const childrenSplit: string[][] = [];
  for (let i = 0; i < children.length; i += 1000) {
    childrenSplit.push(children.slice(i, Math.min(i + 1000, children.length)));
  }

  // get the data from the children objects, running one request per 1000 objects
  return await Promise.all(
    childrenSplit.map(async (cs) => {
      return fetch(`${url}/api/getobjects/${streamId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ objects: JSON.stringify(cs) }),
      }).then((res) => res.json());
    })
  ).then((data) => {
    const arr: ChildSpeckleObjectData[] = [];
    data.forEach((d) => {
      arr.push(...d);
    });
    return arr;
  });
}
