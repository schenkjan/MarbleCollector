import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { LoginScreen } from "./login/LoginScreen";
import { LogoutScreen } from "./logout/LogoutScreen";

export function AuthController() {
  const { path } = useRouteMatch();
  const userIsAuthenticated = useRecoilValue(AppState.userIsAuthenticated);

  return (
    <>
      <Switch>
        <Route path={`${path}/login`}>
          {userIsAuthenticated ? <Redirect to="/" /> : <LoginScreen />}
        </Route>
        <Route path={`${path}/logout`}>
          <LogoutScreen />
        </Route>
        <Route path="*">
          <Redirect to={`${path}/login`} />
        </Route>
      </Switch>
    </>
  );
}
