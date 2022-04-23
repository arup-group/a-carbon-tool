interface Prop {
  name: string;
}

export function filterOnlyReportBranches<T extends Prop>(branches: T[]): T[] {
  return branches.filter((b) =>
    b.name.includes("actcarbonreport/")
  );
}
