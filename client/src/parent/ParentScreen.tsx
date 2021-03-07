import { useState } from "react";
import { DashboardLayout } from "../shell/DashboardLayout";
import { ChoreTable } from "./ChoreTable";
import {
  BrowserRouter as Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAvatarInfo } from "../AppState";
import { ShowSnack } from "../Snackbar";

export function ParentScreen() {
  const { path } = useRouteMatch();
  const userAvatar = useRecoilValue(userAvatarInfo);

  // how can we improve the layout, so that we don't have to repeat ourselves for every sub component and every screen?
  // maybe we have a global state for the title, then we need the Dashboardlayout exactly once
  return (
    <Switch>
      <Route path={`${path}/rewards`}>
        <DashboardLayout
          avatarAlt={userAvatar.imgAlt}
          avatarSrc={userAvatar.imgSrc}
          title="Belohnungs-Pinwand"
        >
          <p>Belohnungen...</p>
        </DashboardLayout>
      </Route>
      <Route path={`${path}/profile`}>
        <DashboardLayout
          avatarAlt={userAvatar.imgAlt}
          avatarSrc={userAvatar.imgSrc}
          title="Profil"
        >
          <p>Profil...</p>
        </DashboardLayout>
      </Route>
      <Route path={[`${path}/chores`, path]} exact>
        <DashboardLayout
          avatarAlt={userAvatar.imgAlt}
          avatarSrc={userAvatar.imgSrc}
          title="Ämtli Pinwand"
        >
          <ChoreTable />
        </DashboardLayout>
      </Route>
      <ShowSnack />
    </Switch>
  );
}
