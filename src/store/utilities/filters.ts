import { StreamReferenceBranches } from "@/models/graphql";

export function filterOnlyReportBranches(branches: StreamReferenceBranches) {
  return branches.data.stream.branches.items.filter((b) =>
    b.name.includes("actcarbonreport/")
  );
}
