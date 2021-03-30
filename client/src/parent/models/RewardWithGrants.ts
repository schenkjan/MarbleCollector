import { Grant } from "./Grant";

export interface RewardWithGrants {
  id: number;
  name: string;
  description: string;
  value: number;
  grants: Grant[];
}

function compareGrants(a: Grant[], b: Grant[]): number {
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
  a: RewardWithGrants,
  b: RewardWithGrants
): number {
  const grantComparison = compareGrants(a.grants, b.grants);
  if (grantComparison !== 0) return grantComparison;

  return a.name.localeCompare(b.name);
}
