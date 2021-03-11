import { DashboardLayout } from "../shell/DashboardLayout";
import { FiguresOverview } from "./FiguresOverview";

export function ChildScreen() {
  return (
    <DashboardLayout>
      <FiguresOverview></FiguresOverview>
    </DashboardLayout>
  );
}
