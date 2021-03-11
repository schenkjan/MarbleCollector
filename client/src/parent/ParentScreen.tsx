import { DashboardLayout } from "../shell/DashboardLayout";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { ChoreList } from "./ChoreList";

export function ParentScreen() {
  const { path } = useRouteMatch();
  const userAvatarInfo = useRecoilValue(AppState.userAvatarInfo);

  // how can we improve the layout, so that we don't have to repeat ourselves for every sub component and every screen?
  // maybe we have a global state for the title, then we need the Dashboardlayout exactly once
  return (
    <Switch>
      <Route path={`${path}/rewards`}>
        <DashboardLayout
          avatarAlt={userAvatarInfo.imgAlt}
          avatarSrc={userAvatarInfo.imgSrc}
          title="Belohnungs-Pinwand"
        >
          <p>Belohnungen...</p>
        </DashboardLayout>
      </Route>
      <Route path={`${path}/profile`}>
        <DashboardLayout
          avatarAlt={userAvatarInfo.imgAlt}
          avatarSrc={userAvatarInfo.imgSrc}
          title="Profil"
        >
          <p>Profil...</p>
        </DashboardLayout>
      </Route>
      <Route path={[`${path}/chores`, path]} exact>
        <DashboardLayout
          avatarAlt={userAvatarInfo.imgAlt}
          avatarSrc={userAvatarInfo.imgSrc}
          title="Ämtli Pinwand"
        >
          {/* <ChoreTable /> */}
          <ChoreList />
        </DashboardLayout>
      </Route>
    </Switch>
  );
}
