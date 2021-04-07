import React from "react";
import { Route } from "react-router";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { useDashboardTitle } from "../shell/hooks/DashboardTitleHook";
import { ProfileDetailsForUser } from "./ProfileDetailsForUser";

export function ProfileDetails() {
  useDashboardTitle("Profil");

  const { path } = useRouteMatch();

  const userId = useRecoilValue(AppState.userInfo);

  return (
    <>
      <Switch>
        <Route path={`${path}/:id`}>
          <ProfileDetailsForUser />
        </Route>
        <Route path={`${path}`}>
          <Redirect to={`${path}/${userId?.id}`} />
        </Route>
      </Switch>
    </>
  );
}
