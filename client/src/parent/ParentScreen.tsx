import React, { lazy } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
//import ProfileDetails from "./profile/ProfileDetails";
//import ChoreList from "./chores/ChoreList";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
//import RewardsList from "./rewards/RewardsList";
import PortalOverlay from "../shell/PortalOverlay";

const ProfileDetails = lazy(() => import("./profile/ProfileDetails"));
const ChoreList = lazy(() => import("./chores/ChoreList"));
const RewardsList = lazy(() => import("./rewards/RewardsList"));

export default function ParentScreen() {
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
      <PortalOverlay />
    </>
  );
}
