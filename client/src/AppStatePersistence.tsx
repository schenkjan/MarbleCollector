import { recoilPersist } from "recoil-persist";

export const { persistAtom: persistUserInfoState } = recoilPersist({
  key: "userInfoState",
  storage: localStorage,
});
