import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { ChildChoreList } from "./chores/ChildChoreList";
import { ChildRewardList } from "./rewards/ChildRewardList";
import { ProfileDetails } from "./profile/ProfileDetails";
import PortalOverlay from "../shell/PortalOverlay";

export function ChildScreen() {
  const { path } = useRouteMatch();

  return (
    <>
      <ProtectedRouteForRole />
      <Switch>
        <Route path={`${path}/rewards`}>
          <ChildRewardList />
        </Route>
        <Route path={`${path}/profile`}>
          <ProfileDetails />
        </Route>
        <Route path={[`${path}/chores`, path]} exact>
          <ChildChoreList></ChildChoreList>
        </Route>
      </Switch>
      <PortalOverlay />
    </>
  );
}
