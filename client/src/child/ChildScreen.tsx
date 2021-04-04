import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { ChildChoreList } from "./chores/ChildChoreList";
import { ChildRewardList } from "./rewards/ChildRewardList";
import { ProfileDetails } from "./profile/ProfileDetails";
import { Container } from "@material-ui/core";

export function ChildScreen() {
  const { path } = useRouteMatch();
  return (
    <Container maxWidth="md" disableGutters>
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
        <Route path="*">
          <Redirect to={`${path}`} />
        </Route>
      </Switch>
    </Container>
  );
}
