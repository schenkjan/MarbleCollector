import { DashboardLayout } from "../shell/DashboardLayout";
import { ChildChoreList } from "./ChildChoreList";

export function ChildScreen() {
  return (
    <DashboardLayout>
      <ChildChoreList></ChildChoreList>
    </DashboardLayout>
  );
}
