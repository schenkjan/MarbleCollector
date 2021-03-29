import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useMyNotificationsByNamePrefixWithHandle } from "../notifications/NotificationHooks";
import { NotificationNames } from "../notifications/NotificationNames";
import { DashboardState } from "./DashboardState";

export function DashboardNotificationHandler() {
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

  /**
   * Increasing the count of chores...
   */
  useEffect(() => {
    if (newChoreNotifications.length > 0) {
      setChoreNotificationCount(
        (prevCount) => prevCount + newChoreNotifications.length
      );
      setChoreNotificationsHandled(newChoreNotifications);
    }
  }, [
    newChoreNotifications,
    setChoreNotificationsHandled,
    setChoreNotificationCount,
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
    }
  }, [
    newRewardNotifications,
    setRewardNotificationsHandled,
    setRewardNotificationCount,
  ]);

  return <></>;
}
