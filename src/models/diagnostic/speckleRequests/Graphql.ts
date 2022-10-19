export abstract class Graphql {
  public static getReportBranchCommits(streamid: string) {
    return `query {
              stream(id: "${streamid}") {
                branch(name: "actcarbonreport/main") {
                  commits {
                    items {
                      id,
                      referencedObject
                    }
                  }
                }
              }
            }`;
  }
  public static getGlobals(streamid: string) {
    return `query {
              stream(id: "${streamid}") {
                globals {
                  items
                }
              }
            }`;
  }
  public static getOldReportCommits(streamid: string) {
    return `query {
              stream(id: "${streamid}") {
                branch(name: "actcarbonreport") {
                  commits {
                    items {
                      id,
                      referencedObject
                    }
                  }
                }
              }
            }`;
  }
}
