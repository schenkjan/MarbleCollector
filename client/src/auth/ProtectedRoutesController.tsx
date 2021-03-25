import React, { lazy, Suspense } from "react";
import { Switch, Redirect, useRouteMatch, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
// import { ChildScreen } from "../child/ChildScreen";
// import { ParentScreen } from "../parent/ParentScreen";

const ChildScreen = lazy(() => import("../child/ChildScreen"));
const ParentScreen = lazy(() => import("../parent/ParentScreen"));

export function ProtectedRoutesController() {
  const { path } = useRouteMatch();
  const userRole = useRecoilValue(AppState.userRole);

  const currentUserRoleRedirect = `${path}/${userRole?.toLowerCase()}`;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={`${path}/child`}>
          <ChildScreen />
        </Route>
        <Route path={`${path}/parent`}>
          <ParentScreen />
        </Route>
        <Route path="*">
          <Redirect to={currentUserRoleRedirect} />
        </Route>
      </Switch>
    </Suspense>
  );
}
