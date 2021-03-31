import React from "react";
import { Route } from "react-router";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../../AppState";
import { useProfileGet } from "../../profile/ProfileBackendAccess";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { ProfileDetailsForUser } from "./ProfileDetailsForUser";

export function ProfileDetails() {
  useDashboardTitle("Profil");

  const { path } = useRouteMatch();

  const { data } = useProfileGet();
  const userId = useRecoilValue(AppState.userInfo);
  const presentUserId = data ? data?.user.id : userId?.id;

  return (
    <>
      <Switch>
        <Route path={`${path}/:id`}>
          <ProfileDetailsForUser />
        </Route>
        <Route path={`${path}`}>
          <Redirect
            to={`${path}/${presentUserId /* userinfo.id*/}`}
            // to={`${path}/${userId?.id}`}
          />
        </Route>
      </Switch>
    </>
  );
}
