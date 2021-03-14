import { Redirect, useRouteMatch } from "react-router-dom";
import { useDashboardBasePath } from "../shell/hooks/DashboardBasePathHook";

/**
 * Ensures that the currently logged in user may access a route, even if he knows the url.
 */
export function ProtectedRouteForRole() {
  const { path } = useRouteMatch();
  const dashboardBasePath = useDashboardBasePath();

  let mustRedirectToDashboard = false;
  if (dashboardBasePath) {
    mustRedirectToDashboard = !path.startsWith(dashboardBasePath);
  }

  return <>{mustRedirectToDashboard && <Redirect to="/app" />}</>;
}
