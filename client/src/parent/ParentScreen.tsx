import { DashboardLayout } from "../shell/DashboardLayout";
import { ChoreTable } from "./ChoreTable";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ProfileDetails } from "./profile/ProfileDetails";
import { RewardsTable } from "./rewards/RewardsTable";

export function ParentScreen() {
  const { path } = useRouteMatch();

  return (
    <DashboardLayout>
      <Switch>
        <Route path={`${path}/rewards`}>
          <RewardsTable />
        </Route>
        <Route path={`${path}/profile`}>
          <ProfileDetails />
        </Route>
        <Route path={[`${path}/chores`, path]} exact>
          <ChoreTable />
        </Route>
      </Switch>
    </DashboardLayout>
  );
}
