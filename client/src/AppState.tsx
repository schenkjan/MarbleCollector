import { atom, selector } from "recoil";
import { persistUserInfoState } from "./AppStatePersistence";
import { AuthResponse } from "./login/models/AuthResponse";
import { UserAvatarInfo } from "./shell/models/UserAvatarInfo";

/**
 * Class holding the global app state with static properties.
 */
export class AppState {
  /**
   * Demo state
   */
  static currentScreenTitle = atom({
    key: "currentScreenTitle",
    default: "",
  });

  /**
   * Holding the currently logged in users basic information.
   */
  static userInfoState = atom<AuthResponse | null>({
    key: "userInfoState",
    default: null,
    effects_UNSTABLE: [persistUserInfoState],
  });

  /**
   * Convenience selector to check if the current user is authenticated/logged in
   */
  static userIsAuthenticated = selector<boolean>({
    key: "userIsAuthenticated",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfoState);
      return userInfo != null;
    },
  });

  /**
   * Convenience selector to retrieve the current users avatar
   */
  static userAvatarInfo = selector<UserAvatarInfo>({
    key: "userAvatarInfo",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfoState);
      return {
        imgSrc: userInfo?.avatar ?? "",
        imgAlt: userInfo?.username ?? "",
      };
    },
  });

  /**
   * Convenience selector to retrieve the current users access token for api access.
   */
  static userBearerToken = selector<string>({
    key: "userBearerToken",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfoState);
      return userInfo?.token ?? "";
    },
  });
}
