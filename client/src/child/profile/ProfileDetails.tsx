import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useProfileGet } from "../../api/BackendAccess";
import { AppState } from "../../AppState";
import { ProtectedRouteForRole } from "../../auth/ProtectedRouteForRole";
import { useDashboardTitle } from "../../shell/hooks/DashboardTitleHook";
import { UserFamilyCard } from "./UserFamilyCard";
import { UserProfileCard } from "./UserProfileCard";
import { UserScoreCard } from "./UserScoreCard";

export function ProfileDetails() {
  useDashboardTitle("Profil");

  const { path } = useRouteMatch();

  const userInfo = useRecoilValue(AppState.userInfo);
  const { data } = useProfileGet(userInfo?.id);
  const name = userInfo?.username;

  // const family = data?.family;
  console.log(name);

  return (
    <>
      <Switch>
        <Route path={`${path}/${name}`}>
          <UserProfileCard user={data?.user} />
          <UserScoreCard userScore={data?.score} />
          <UserFamilyCard family={data?.family ?? []} />
        </Route>
      </Switch>
    </>
  );
}
