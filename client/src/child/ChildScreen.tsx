import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ProtectedRouteForRole } from "../auth/ProtectedRouteForRole";
import { ChildChoreList } from "./chores/ChildChoreList";
import { FiguresOverview } from "./figures/FiguresOverview";

export function ChildScreen() {
  const { path } = useRouteMatch();

  return (
    <>
      <ProtectedRouteForRole />
      <Switch>
        <Route path={`${path}/rewards`}>Not implemented yet</Route>
        <Route path={`${path}/profile`}>
          <FiguresOverview />
        </Route>
        <Route path={[`${path}/chores`, path]} exact>
          <ChildChoreList />
        </Route>
      </Switch>
    </>
  );
}
