import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { darkModeState, persistUserInfoState } from "./AppStatePersistence";
import { AuthResponse } from "./auth/login/models/AuthResponse";
import { UserAvatarInfo } from "./shell/models/UserAvatarInfo";
import { SnackState } from "./shell/models/SnackState";
import { BackdropOverlayState } from "./shell/models/BackdropOverlayState";

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
      const userInfo = get(AppState.userInfoState) as AuthResponse;
      if (
        userInfo &&
        Object.keys(userInfo).length === 0 &&
        userInfo.constructor === Object
      ) {
        return null;
      }
      return userInfo;
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

  /**
   * Convenience selector to retrieve the current users id
   */
  static userId = selector<number>({
    key: "userId",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfo);
      return userInfo?.id ?? 0;
    },
  });

  /**
   * Convenience selector to retrieve the current users role.
   */
  static userRole = selector<string>({
    key: "userRole",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfo);
      return userInfo?.role ?? "";
    },
  });

  /**
   * Holding the currently State of react-query requests.
   */
  static queryStateInfo = atom<BackdropOverlayState>({
    key: "queryStateInfo",
    default: {
      open: false,
    },
  });

  /**
   * Convenience selector to retrieve the current users family membership.
   */
  static family = selector<string>({
    key: "userFamilyMembership",
    get: ({ get }) => {
      const userInfo = get(AppState.userInfo);
      return userInfo?.family ?? "";
    },
  });

  /**
   * Holding the current state of the dark mode.
   */
  static darkModeState = atom<boolean>({
    key: "darkModeState",
    default: false,
    effects_UNSTABLE: [darkModeState],
  });
}

export function useFamilyMembership(): string {
  const family = useRecoilValue(AppState.family);

  return family;
}

export function useDarkModeState() {
  return useRecoilState(AppState.darkModeState);
}
