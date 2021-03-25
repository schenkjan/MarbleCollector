import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { NotificationState } from "./NotificationState";
import { NotificationSubscriber } from "./NotificationSubscriber";

export function useNotificationSubscription(
  subscriber: NotificationSubscriber
) {
  const setNotificationSubscribers = useSetRecoilState(
    NotificationState.notificationSubscribers
  );

  useEffect(() => {
    console.log(
      `Adding new subscriber ${subscriber.subscriberKey} ${subscriber.notificationMethodName}`
    );
    setNotificationSubscribers((subscribers) => [...subscribers, subscriber]);
  }, [subscriber]);

  useEffect(() => () => {
    console.log(
      `Removing subscriber ${subscriber.subscriberKey} ${subscriber.notificationMethodName}`
    );
    setNotificationSubscribers((subscribers) => {
      const newSubscribers = subscribers.filter(
        (s) => s.subscriberKey != subscriber.subscriberKey
      );
      return [...newSubscribers];
    });
  });
}
