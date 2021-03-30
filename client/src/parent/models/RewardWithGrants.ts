import { Grant } from "./Grant";
import { isParentActionNeeded } from "./GrantState";

export interface RewardWithGrants {
  id: number;
  name: string;
  description: string;
  value: number;
  grants: Grant[];
}

function maxTime(grants: Grant[]): number {
  return Math.max(
    ...grants.map((item) =>
      item.modified ? new Date(item.modified).getTime() : 0
    )
  );
}

function compareGrants(a: Grant[], b: Grant[]): number {
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
  a: RewardWithGrants,
  b: RewardWithGrants
): number {
  const grantComparison = compareGrants(a.grants, b.grants);
  if (grantComparison !== 0) return grantComparison;

  return b.name.localeCompare(a.name);
}
