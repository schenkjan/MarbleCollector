import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserRoles } from "../auth/UserRoles";
import { NotificationState } from "./NotificationState";

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

    function subscribeToParentNotifications() {
      setNotificationSubscribers((subscribers) => [
        {
          subscriberKey: "parent.receiveMessage",
          notificationMethodName: "ReceiveMessage",
          notificationReceivedCallback: (...args: any[]) => console.log(args),
        },
      ]);
    }

    function subscribeToChildrenNotifications() {
      setNotificationSubscribers((subscribers) => [
        {
          subscriberKey: "child.figuresUpdated",
          notificationMethodName: "UpdateFigures",
          notificationReceivedCallback: (...args: any[]) => console.log(args),
        },
      ]);
    }
  }, [hubConnectionEstablished, userRole]);

  return <></>;
}
