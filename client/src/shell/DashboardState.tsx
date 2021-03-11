import { atom } from "recoil";

export class DashboardState {
  /**
   * The title that is to be displayed in the dashboard.
   */
  static dashboardTitle = atom({
    key: "dashboardTitle",
    default: "...",
  });

  static choreNewsCount = atom<number>({
    key: "choreNewsCount",
    default: 10, // TODO js 27.02.2021: Set correct value.
  });

  // TODO js (27.02.2021): Should we move the state handling code to a store file?
  static rewardNewsCount = atom<number>({
    key: "rewardNewsCount",
    default: 100, // TODO js 27.02.2021: Set correct value.
  });

  // TODO js (27.02.2021): Should we move the state handling code to a store file?
  static profileNewsCount = atom<number>({
    key: "profileNewsCount",
    default: 1, // TODO js 27.02.2021: Set correct value.
  });
}
