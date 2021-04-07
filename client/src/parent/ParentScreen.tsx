import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { ProfileDetails } from "../profile/ProfileDetails";
import { ChoreList } from "./chores/ChoreList";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { RewardsList } from "./rewards/RewardsList";
import { Container } from "@material-ui/core";

export function ParentScreen() {
  const { path } = useRouteMatch();

  return (
    <Container maxWidth="md" disableGutters>
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
        <Route path="*">
          <Redirect to={`${path}`} />
        </Route>
      </Switch>
    </Container>
  );
}
