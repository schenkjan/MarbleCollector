import { atom, selector } from "recoil";
import { persistUserInfoState } from "./AppStatePersistence";
import { AuthResponse } from "./auth/login/models/AuthResponse";
import { UserAvatarInfo } from "./shell/models/UserAvatarInfo";
import { SnackState } from "./shell/models/SnackState";
import { choreNewsCount } from "./shell/NavigationBar";
import { PortalOverlayState } from "./shell/models/PortalOverlayState";

/**
 * Class holding the global app state with static properties.
 */
export class AppState {
  /**
   * To be used only for login and logout for everything else use userinfo.
   * Holding the currently logged in users basic information which will be persisted to local storage or an empty object.
   * The empty object workaround had to be introduced because of a bug in recoil-persist (no null check).
   */
  static userInfoState = atom<AuthResponse | {}>({
    key: "userInfoState",
    default: {},
    effects_UNSTABLE: [persistUserInfoState],
  });

  /**
   * Accessor for the currently logged in users basic information.
   */
  static userInfo = selector<AuthResponse | null>({
    key: "userInfo",
    get: ({ get }) => {
      return get(AppState.userInfoState) as AuthResponse;
    },
  });

  /*
   * Holding the currently message of Snackbar.
   */
  static snackState = atom<SnackState>({
    key: "snackState",
    default: {
      open: false,
      message: "",
      severity: "success",
    },
  });

  /**
   * Convenience selector to check if the current user is authenticated/logged in
   */
  static userIsAuthenticated = selector<boolean>({
    key: "userIsAuthenticated",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfo);
      return userInfo?.token != null;
    },
  });

  /**
   * Convenience selector to retrieve the current users avatar
   */
  static userAvatarInfo = selector<UserAvatarInfo>({
    key: "userAvatarInfo",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfo);
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
      const userInfo = get(AppState.userInfo);
      return userInfo?.token ?? "";
    },
  });

  /*
   * Holding the currently State of react-query requests.
   */
  static queryStateInfo = atom<PortalOverlayState>({
    key: "queryStateInfo",
    default: {
      open: false,
      variant: "isLoading",
    },
  });
}
