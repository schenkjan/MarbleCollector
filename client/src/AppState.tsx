import { atom, selector } from "recoil";
import { persistUserInfoState } from "./AppStatePersistence";
import { AuthResponse } from "./login/models/AuthResponse";
import { UserAvatarInfo } from "./shell/models/UserAvatarInfo";

export const currentScreen = atom({
  key: "currentScreen",
  default: "",
});

export const userInfoState = atom<AuthResponse | null>({
  key: "userInfoState",
  default: null,
  effects_UNSTABLE: [persistUserInfoState],
});

export const userIsAuthenticated = selector<boolean>({
  key: "userIsAuthenticated",
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    return userInfo != null;
  },
});

export const userAvatarInfo = selector<UserAvatarInfo>({
  key: "userAvatarInfo",
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    return {
      imgSrc:
        userInfo == null
          ? ""
          : "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png", // TODO
      imgAlt: userInfo?.username ?? "",
    };
  },
});

export const userBearerToken = selector<string>({
  key: "userBearerToken",
  get: ({ get }) => {
    const userInfo = get(userInfoState);
    return userInfo?.token ?? "";
  },
});
