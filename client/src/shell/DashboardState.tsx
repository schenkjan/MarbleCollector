import { atom } from "recoil";

export class DashboardState {
  /**
   * The title that is to be displayed in the dashboard.
   */
  static dashboardTitle = atom({
    key: "dashboardTitle",
    default: "...",
  });
}
