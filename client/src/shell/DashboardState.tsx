import { atom } from "recoil";

export class DashboardState {
  /**
   * The title that is to be displayed in the dashboard.
   */
  static dashboardTitle = atom({
    key: "dashboardTitle",
    default: "...",
  });

  static choreNotificationCount = atom<number>({
    key: "choreNotificationCount",
    default: 0,
  });

  static rewardNotificationCount = atom<number>({
    key: "rewardNewsCount",
    default: 0,
  });

  static profileNotificationCount = atom<number>({
    key: "profileNotificationCount",
    default: 0,
  });
}
