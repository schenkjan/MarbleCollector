export enum AssignmentState {
  Assigned,
  Active,
  RequestedToCheck,
  CheckConfirmed,
  CheckRefused,
  Archived,
}

export const AssignmentStateNames = [
  "zugewiesen",
  "aktiv",
  "bestätigen",
  "bestätigt",
  "abgelehnt",
  "erledigt",
];

export function isParentActionNeeded(state: AssignmentState): boolean {
  return state === AssignmentState.RequestedToCheck;
}

export function isDone(state: AssignmentState): boolean {
  return (
    state === AssignmentState.CheckConfirmed ||
    state === AssignmentState.Archived
  );
}
