export enum GrantState {
  Assigned,
  Requested,
  RequestConfirmed,
  RequestRefused,
  Archived,
}

export const GrantStateNames = [
  "zugewiesen",
  "angefragt",
  "bestätigt",
  "abgelehnt",
  "erledigt",
];
