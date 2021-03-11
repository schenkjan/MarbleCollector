import { DashboardLayout } from "../shell/DashboardLayout";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ProfileDetails } from "./profile/ProfileDetails";
import { RewardsTable } from "./rewards/RewardsTable";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { ChoreList } from "./ChoreList";

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
          <ChoreList />
        </Route>
      </Switch>
    </DashboardLayout>
  );
}
