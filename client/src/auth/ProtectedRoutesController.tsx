import React from "react";
import { Switch, Redirect, useRouteMatch, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { ChildScreen } from "../child/ChildScreen";
import { ParentScreen } from "../parent/ParentScreen";

export function ProtectedRoutesController() {
  const { path } = useRouteMatch();
  const userRole = useRecoilValue(AppState.userRole);

  const currentUserRoleRedirect = `${path}/${userRole?.toLowerCase()}`;
  return (
    <>
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
    </>
  );
}
