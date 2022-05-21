import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { DashboardState } from "../DashboardState";

/**
 * Hook to simplify setting a title on the dashboard.
 * @param title The title to be displayed in the dashboard.
 */
export function useDashboardTitle(title: string) {
  const setDashboardTitle = useSetRecoilState(DashboardState.dashboardTitle);

  useEffect(() => {
    setDashboardTitle(title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return title;
}
