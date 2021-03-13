import { atom, useRecoilValue } from "recoil";
import { User } from "./models/User";

const childrenAtom = atom<User[]>({
  key: "childrenForParentDashboard",
  default: [
    // TODO js (13.03.2021): Read data from backend using Recoil effects!
    {
      id: 3,
      username: "lars-frederik",
      email: "lars.muster@gmail.com",
      avatar:
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/68.png",
      role: "Child",
      family: "Muster",
    },
    {
      id: 4,
      username: "lara",
      email: "lara.muster@gmail.com",
      avatar:
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/29.png",
      role: "Child",
      family: "Muster",
    },
    {
      id: 5,
      username: "lena",
      email: "lena.muster@gmail.com",
      avatar:
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/31.png",
      role: "Child",
      family: "Muster",
    },
  ],
});

export function useChildren(): User[] {
  return useRecoilValue(childrenAtom);
}
