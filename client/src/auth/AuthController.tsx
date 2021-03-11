import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { LoginScreen } from "./login/LoginScreen";
import { LogoutScreen } from "./logout/LogoutScreen";

/**
 * The Auth controller is responsible for the users auth routing.
 * -> The user is redirected to the login screen if he is not authenticated for any route /auth/*
 * -> The user is redirected to home if he wants to access login when he is already logged in
 * -> The user is logged out only if he is authenticated and accessing auth/logout
 */
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
          {userIsAuthenticated ? (
            <LogoutScreen />
          ) : (
            <Redirect to={`${path}/login`} />
          )}
        </Route>
        <Route path="*">
          <Redirect to={`${path}/login`} />
        </Route>
      </Switch>
    </>
  );
}
