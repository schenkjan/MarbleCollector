import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { ChildChoreList } from "./chores/ChildChoreList";
import { ProfileDetails } from "./profile/ProfileDetails";
import PortalOverlay from "../shell/PortalOverlay";
import { useMyNotificationsByNameWithHandle } from "../notifications/NotificationHooks";
import { NotificationNames } from "../notifications/NotificationNames";

export function ChildScreen() {
  const { path } = useRouteMatch();

  const [
    notificationsToHandle,
    setNotificationsAsHandled,
  ] = useMyNotificationsByNameWithHandle(
    NotificationNames.children.createdAssignment
  );

  useEffect(() => {
    if (notificationsToHandle.length > 0) {
      alert(notificationsToHandle);
      setNotificationsAsHandled(notificationsToHandle);
    }
  }, [notificationsToHandle, setNotificationsAsHandled]);

  return (
    <>
      <ProtectedRouteForRole />
      <Switch>
        <Route path={`${path}/rewards`}>
          <p>Child Rewards</p>
        </Route>
        <Route path={`${path}/profile`}>
          <ProfileDetails />
        </Route>
        <Route path={[`${path}/chores`, path]} exact>
          <ChildChoreList></ChildChoreList>
        </Route>
      </Switch>
      <PortalOverlay />
    </>
  );
}
