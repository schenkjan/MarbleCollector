import { useState } from "react";
import { DashboardLayout } from "../shell/DashboardLayout";
import { ChoreTable } from "./ChoreTable";
import { BrowserRouter as  Switch, Route, useRouteMatch } from "react-router-dom";

export function ParentScreen() {
  const {path, } = useRouteMatch();
  const [avatarAlt, ] = useState("Mami"); // TODO js (25.02.2021): Set the avatar alt value depending on logged in user.
  const [avatarSrc, ] = useState(""); // TODO js (25.02.2021): Set the avatar src depending on logged in user.

  return (
    <Switch>
      <Route path={`${path}/rewards`}>
        <DashboardLayout avatarAlt={avatarAlt} avatarSrc={avatarSrc} title="Belohungs-Pinwand">
          <p>Belohnungen...</p>
        </DashboardLayout>
      </Route>
      <Route path={`${path}/profile`}>
        <DashboardLayout avatarAlt={avatarAlt} avatarSrc={avatarSrc} title="Profil">
          <p>Profil...</p>
        </DashboardLayout>
      </Route>
      <Route path={path}>
        <DashboardLayout avatarAlt={avatarAlt} avatarSrc={avatarSrc} title="Ämtli Pinwand">
          <ChoreTable/>
        </DashboardLayout>
      </Route>
    </Switch>
  );
}
