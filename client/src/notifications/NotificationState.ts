import { atom } from "recoil";
import { HubConnection } from "@microsoft/signalr";
import { NotificationSubscriber } from "./NotificationSubscriber";

export class NotificationState {
  static hubConnectionEstablished = atom<boolean>({
    key: "hubConnectionEstablished",
    default: false,
  });

  static notificationSubscribers = atom<NotificationSubscriber[]>({
    key: "notificationSubscribers",
    default: [],
  });

  static notifications = atom<Notification[]>({
    key: "notifications",
    default: [],
  });
}
