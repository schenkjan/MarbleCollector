import { DashboardLayout } from "../shell/DashboardLayout";
import { ChildChoreList } from "./chores/ChildChoreList";

export function ChildScreen() {
  return (
    <DashboardLayout>
      <ChildChoreList></ChildChoreList>
    </DashboardLayout>
  );
}
