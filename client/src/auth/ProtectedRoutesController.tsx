import React from "react";
import { Switch, Redirect, useRouteMatch, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { ChildScreen } from "../child/ChildScreen";
import { ParentScreen } from "../parent/ParentScreen";

export function ProtectedRoutesController() {
  const { path } = useRouteMatch();
  const userInfo = useRecoilValue(AppState.userInfo);

  //   if (userInfo?.role === "Child") {
  //       return <Redirect to={`${path}/child`} />;
  //   } else {
  //       userInfo.
  //   }
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
          {userInfo?.role === "Child" && <Redirect to={`${path}/child`} />}
          {userInfo?.role === "Parent" && <Redirect to={`${path}/parent`} />}
        </Route>
      </Switch>
    </>
  );
}
