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
