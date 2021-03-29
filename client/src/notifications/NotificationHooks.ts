import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AppState } from "../AppState";
import { UserNotification } from "./Notification";
import { NotificationState } from "./NotificationState";

/**
 * Retrieve all notifications from global state.
 * @returns all the notifications present in the global state.
 */
export function useAllNotifications() {
  const notifications = useRecoilValue(NotificationState.notifications);
  return notifications;
}

/**
 * Retrieve all notifications from global state filtered by notification name.
 * @param notificationName The signal r name of the notification
 * @returns all notifications for a notification type
 */
export function useAllNotificationsByName(notificationName: string) {
  return useAllNotifications().filter(
    (n) => n.notificationName === notificationName
  );
}

/**
 * Retrieve user notifications that are marked as being relevant for the currently logged in user.
 * @returns notifications for me
 */
export function useMyNotifications() {
  const userId = useRecoilValue(AppState.userId);
  const notifications = useAllNotifications();
  return notifications
    .map((n) => new UserNotification(n))
    .filter((un) => un.targetUserId === userId);
}

/**
 * Retrieve user notifications that are marked as being relevant for the currently logged in user for a given name
 * @param notificationName The signal r name of the notification
 * @returns notifications for me
 */
export function useMyNotificationsByName(notificationName: string) {
  return useMyNotifications().filter(
    (n) => n.notificationName === notificationName
  );
}

/**
 * Retrieve notifications that are marked as being relevant for me and allows the consumer to keep track of the messages he already handled.
 * @returns all the new user notifications as well as a method to mark them as handled, so that they don't reappear.
 */
export function useMyNotificationsWithHandle(): [
  UserNotification[],
  (handledNotifications: UserNotification[]) => void
] {
  const [handled, setHandled] = useState<string[]>([]);
  const unhandledNotifications = useMyNotifications().filter(
    (n) => handled.indexOf(n.notificationId) === -1
  );

  function setHandledInternal(handledNotifications: UserNotification[]) {
    if (handledNotifications.length > 0) {
      setHandled((handled) => [
        ...handled,
        ...handledNotifications.map((n) => n.notificationId),
      ]);
    }
  }

  return [unhandledNotifications, setHandledInternal];
}

/**
 * Retrieve notifications that are marked as being relevant for me and are of a notification type and allows the consumer to keep track of the messages he already handled.
 * @returns all the new user notifications as well as a method to mark them as handled, so that they don't reappear.
 */
export function useMyNotificationsByNameWithHandle(
  notificationName: string
): [UserNotification[], (handledNotifications: UserNotification[]) => void] {
  const [notifications, setAsHandled] = useMyNotificationsWithHandle();
  return [
    notifications.filter((n) => n.notificationName === notificationName),
    setAsHandled,
  ];
}
