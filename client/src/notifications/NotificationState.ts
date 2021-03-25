import { atom } from "recoil";
import { NotificationSubscriber } from "./NotificationSubscriber";
import { NotificationBase } from "./Notification";

export class NotificationState {
  static hubConnectionEstablished = atom<boolean>({
    key: "hubConnectionEstablished",
    default: false,
  });

  static notificationSubscribers = atom<NotificationSubscriber[]>({
    key: "notificationSubscribers",
    default: [],
  });

  static notifications = atom<NotificationBase[]>({
    key: "notifications",
    default: [],
  });
}
