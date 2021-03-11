import { Redirect, Route, RouteProps } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";

export interface ProtectedRouteProps {
  routeProps: RouteProps;
  restrictedToRole?: string;
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = (
  props
) => {
  const userIsAuthenticated = useRecoilValue(AppState.userIsAuthenticated);

  return (
    <>
      <Route
        {...props.routeProps}
        render={() => {
          if (userIsAuthenticated) {
            return props.children;
          } else {
            return <Redirect to="/auth" />;
          }
        }}
      ></Route>
    </>
  );
};
