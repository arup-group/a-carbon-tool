interface Prop {
  name: string;
}

export function filterOnlyReportBranches<T extends Prop>(context: any, branches: T[]): T[] {
  return branches.filter((b) =>
    b.name.includes(`${context.state.speckleFolderName}/`)
  );
}
