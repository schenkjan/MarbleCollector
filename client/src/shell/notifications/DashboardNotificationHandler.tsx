import React, { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useMyNotificationsByNamePrefixWithHandle } from "../../notifications/NotificationHooks";
import { NotificationNames } from "../../notifications/NotificationNames";
import { DashboardState } from "../DashboardState";
import ImgMarbles from "../../images/Marble.png";

type DashboardNotificationHandlerProps = {
  username: string;
};

export function DashboardNotificationHandler(
  props: DashboardNotificationHandlerProps
) {
  const logPrefix = "DashboardNotificationHandler";

  const [setChoreNotificationCount, setRewardNotificationCount] = [
    useSetRecoilState(DashboardState.choreNotificationCount),
    useSetRecoilState(DashboardState.rewardNotificationCount),
  ];

  const [
    newChoreNotifications,
    setChoreNotificationsHandled,
  ] = useMyNotificationsByNamePrefixWithHandle(
    NotificationNames.prefix.assignment
  );

  const [
    newRewardNotifications,
    setRewardNotificationsHandled,
  ] = useMyNotificationsByNamePrefixWithHandle(NotificationNames.prefix.grant);

  const showBrowserNotification = useCallback((type: string) => {
    if (shouldShowBrowserNotification()) {
      var options: NotificationOptions = {
        body: `Hey ${props.username}! Du hast eine neue ${type} Benachrichtigung.`,
        icon: ImgMarbles,
        dir: "ltr",
      };
      var notification = new Notification("MarbleCollector", options);
      setTimeout(() => {
        notification?.close();
      }, 5000); // close after 5 seconds
    }
  }, [props.username, shouldShowBrowserNotification]);

  /**
   * Increasing the count of chores...
   */
  useEffect(() => {
    if (newChoreNotifications.length > 0) {
      setChoreNotificationCount(
        (prevCount) => prevCount + newChoreNotifications.length
      );
      setChoreNotificationsHandled(newChoreNotifications);
      showBrowserNotification("Ämtli");
    }
  }, [
    newChoreNotifications,
    setChoreNotificationsHandled,
    setChoreNotificationCount,
    showBrowserNotification,
  ]);

  /**
   * Increasing the count of rewards
   */
  useEffect(() => {
    if (newRewardNotifications.length > 0) {
      setRewardNotificationCount(
        (prevCount) => prevCount + newRewardNotifications.length
      );
      setRewardNotificationsHandled(newRewardNotifications);
      showBrowserNotification("Belohnung");
    }
  }, [
    newRewardNotifications,
    setRewardNotificationsHandled,
    setRewardNotificationCount,
    showBrowserNotification,
  ]);

  function shouldShowBrowserNotification() {
    if (!("Notification" in window)) {
      console.log(
        `${logPrefix} This browser does not support desktop notification`
      );
      return false;
    } else if (Notification.permission === "granted") {
      console.log(`${logPrefix} Notification permission granted`);
      return true;
    }
    return false;
  }

  return (
    <>
    </>
  );
}
