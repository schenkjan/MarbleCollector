import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserRoles } from "../auth/UserRoles";
import { NotificationNames } from "./NotificationNames";
import { NotificationState } from "./NotificationState";
import { NotificationSubscriber } from "./NotificationSubscriber";

type NotificationSubscriberHandlerProps = {
  userRole: string | undefined;
};

/**
 * Component is responsible for subscribing to the relevant notifications and pushing them into the global state.
 * @param props The component property
 * @returns a virtual component without any ui
 */
export function NotificationSubscriberHandler(
  props: NotificationSubscriberHandlerProps
) {
  const { userRole } = props;
  const logPrefix = "NotificationSubscriberHandler ::";
  const hubConnectionEstablished = useRecoilValue(
    NotificationState.hubConnectionEstablished
  );
  const setNotificationSubscribers = useSetRecoilState(
    NotificationState.notificationSubscribers
  );
  const setNotifications = useSetRecoilState(NotificationState.notifications);

  useEffect(() => {
    const userRoleDefined = userRole !== undefined;
    console.log(
      `${logPrefix} Connection established? ${hubConnectionEstablished} :: UserRole defined? ${userRoleDefined}`
    );
    if (hubConnectionEstablished && userRoleDefined) {
      // register notification subscribers
      console.log(`${logPrefix} Register notification subscribers...`);
      if (props.userRole === UserRoles.Parent) {
        subscribeToParentNotifications();
      } else {
        subscribeToChildrenNotifications();
      }
    } else {
      console.log(`${logPrefix} Unregister notification subscribers...`);
      setNotificationSubscribers([]);
    }

    function pushNotification(notificationName: string) {
      return (...args: any[]) => {
        console.log(`${logPrefix} :: ${notificationName} :: args=`, args);
        setNotifications((notifications) => [
          ...notifications,
          { notificationName: notificationName, args: args },
        ]);
      };
    }

    function getSubscriber(
      subscriberKey: string,
      notificationMethodName: string
    ): NotificationSubscriber {
      return {
        subscriberKey: subscriberKey,
        notificationMethodName: notificationMethodName,
        notificationReceivedCallback: pushNotification(notificationMethodName),
      };
    }

    function subscribeToParentNotifications() {
      setNotificationSubscribers([
        getSubscriber(
          "parent.receiveMessage",
          NotificationNames.parent.receiveMessage
        ),
      ]);
    }

    function subscribeToChildrenNotifications() {
      setNotificationSubscribers([
        getSubscriber(
          "child.createdAssignment",
          NotificationNames.children.createdAssignment
        ),
        getSubscriber(
          "child.figuresUpdated",
          NotificationNames.children.updateFigures
        ),
      ]);
    }
  }, [hubConnectionEstablished, userRole]);

  return <></>;
}
