import { Assignment } from "./Assignment";
import { isParentActionNeeded } from "./AssignmentState";

export interface ChoreWithAssignments {
  id: number;
  name: string;
  description: string;
  value: number;
  dueDate: Date;
  assignments: Assignment[];
}

function maxTime(assignments: Assignment[]): number {
  return Math.max(
    ...assignments.map((item) =>
      item.modified ? new Date(item.modified).getTime() : 0
    )
  );
}

function compareAssignments(a: Assignment[], b: Assignment[]): number {
  if (a.length === 0 || b.length === 0) {
    return a.length - b.length;
  }

  const aActive = a.filter((item) => isParentActionNeeded(item.state));
  const bActive = b.filter((item) => isParentActionNeeded(item.state));

  if (aActive.length !== bActive.length) return aActive.length - bActive.length;

  const activeTimeComparison = maxTime(aActive) - maxTime(bActive);

  if (activeTimeComparison !== 0) return activeTimeComparison;

  return maxTime(a) - maxTime(b);
}

export function compareChores(
  a: ChoreWithAssignments,
  b: ChoreWithAssignments
): number {
  const assignmentComparison = compareAssignments(a.assignments, b.assignments);
  if (assignmentComparison !== 0) return assignmentComparison;

  return b.name.localeCompare(a.name);
}
