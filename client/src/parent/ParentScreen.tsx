import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ProfileDetails } from "./profile/ProfileDetails";
import { RewardsTable } from "./rewards/RewardsTable";
import { ChoreList } from "./ChoreList";

export function ParentScreen() {
  const { path } = useRouteMatch();

  return (
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
  );
}
