import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ProfileDetails } from "./profile/ProfileDetails";
import { RewardsList } from "./rewards/RewardsList";
import { ChoreList } from "./ChoreList";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";

export function ParentScreen() {
  const { path } = useRouteMatch();

  return (
    <>
      <ProtectedRouteForRole />
      <Switch>
        <Route path={`${path}/rewards`}>
          <RewardsList />
        </Route>
        <Route path={`${path}/profile`}>
          <ProfileDetails />
        </Route>
        <Route path={[`${path}/chores`, path]} exact>
          <ChoreList />
        </Route>
      </Switch>
    </>
  );
}
