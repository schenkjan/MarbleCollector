import { DashboardLayout } from "../shell/DashboardLayout";
import { ChildChoreList } from "./chores/ChildChoreList";
import { ChildRewardList } from "./rewards/ChildRewardList";

export function ChildScreen() {
  return (
    <DashboardLayout>
      <ChildChoreList></ChildChoreList>
      <ChildRewardList></ChildRewardList>
    </DashboardLayout>
  );
}
