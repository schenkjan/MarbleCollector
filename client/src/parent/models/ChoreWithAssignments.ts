import { Assignment } from "./Assignment";

export interface ChoreWithAssignments {
  id: number;
  name: string;
  description: string;
  value: number;
  dueDate: Date;
  assignments: Assignment[];
}

function compareAssignments(a: Assignment[], b: Assignment[]): number {
  if (a.length === 0 || b.length === 0) {
    return a.length - b.length;
  }

  const aInMs = Math.max(
    ...a.map((item) => (item.modified ? new Date(item.modified).getTime() : 0))
  );
  const bInMs = Math.max(
    ...b.map((item) => (item.modified ? new Date(item.modified).getTime() : 0))
  );

  return aInMs - bInMs;
}

export function compareChores(
  a: ChoreWithAssignments,
  b: ChoreWithAssignments
): number {
  const assignmentComparison = compareAssignments(a.assignments, b.assignments);
  if (assignmentComparison !== 0) return assignmentComparison;

  return a.name.localeCompare(b.name);
}
