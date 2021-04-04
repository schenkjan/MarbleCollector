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

export function isParentActionNeeded(state: GrantState): boolean {
  return state === GrantState.Requested;
}

export function isDone(state: GrantState): boolean {
  return state === GrantState.RequestConfirmed || state === GrantState.Archived;
}
