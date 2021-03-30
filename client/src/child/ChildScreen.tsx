import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { ChildChoreList } from "./chores/ChildChoreList";
import { ProfileDetails } from "./profile/ProfileDetails";

export function ChildScreen() {
  const { path } = useRouteMatch();
  return (
    <>
      <ProtectedRouteForRole />
      <Switch>
        <Route path={`${path}/rewards`}>
          <p>Child Rewards</p>
        </Route>
        <Route path={`${path}/profile`}>
          <ProfileDetails />
        </Route>
        <Route path={[`${path}/chores`, path]} exact>
          <ChildChoreList></ChildChoreList>
        </Route>
      </Switch>
    </>
  );
}
