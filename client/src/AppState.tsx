import { atom, selector } from "recoil";
import { createFalse } from "typescript";
import { AuthResponse } from "./login/models/AuthResponse";
import { UserAvatarInfo } from "./shell/models/UserAvatarInfo";
import { Color } from "@material-ui/lab/Alert";

export const currentScreen = atom({
  key: "currentScreen",
  default: "",
});

export const userInfoState = atom<AuthResponse | null>({
  key: "userInfoState",
  default: null,
});

export const snackState = atom({
  key: "snackInfo",
  default: {
    open: false,
    message: "",
    severity: "success" as Color,
  },
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

export const SnackValues = selector({
  key: "SnackValues",
  get: ({ get }) => {
    const snackValues = get(snackState);
    return {
      open: snackValues.open,
      message: snackValues.message,
      severity: snackValues.severity,
    };
    // set(snackState, !currentValue);
  },
});
