import React, { useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getApiBaseUrl } from "../parent/ParentBackendAccess";
import { AppState } from "../AppState";
import { UserRoles } from "../auth/UserRoles";
import { useErrorNotification } from "../shell/hooks/SnackbarHooks";
import { NotificationState } from "./NotificationState";
import { NotificationSubscriberHandler } from "./NotificationSubscriberHandler";

/**
 * Will build and terminate the hub connection for the currently logged in user.
 * @returns A virtual react component without any dom...
 */
export function HubConnectionHandler() {
  const apiBaseUrl = getApiBaseUrl();
  const logPrefix = "HubConnectionHandler ::";
  const errorNotification = useErrorNotification();
  const userInfo = useRecoilValue(AppState.userInfo);
  const setHubConnectionEstablished = useSetRecoilState(
    NotificationState.hubConnectionEstablished
  );
  const notificationSubscribers = useRecoilValue(
    NotificationState.notificationSubscribers
  );

  //   const [hubConnection, setHubConnection] = useRecoilState(
  //     NotificationState.hubConnection
  //   );
  /**
   * Is tracked as local state, since there seems to be an issue with signalr and recoil...
   */
  const [hubConnection, setHubConnection] = useState<HubConnection | null>(
    null
  );

  const childNotificationHubUrl = `${apiBaseUrl}/hubs/child`;
  const parentNotificationHubUrl = `${apiBaseUrl}/hubs/parent`;

  useEffect(() => {
    console.log(`${logPrefix} Init hook called`);
    const userIsAuthenticated = userInfo !== null;
    const hubConnectionIsInitialized = hubConnection !== null;
    console.log(
      `${logPrefix} User? ${userIsAuthenticated} :: HubConnection? ${hubConnectionIsInitialized}`
    );

    const shouldBuildConnection =
      userIsAuthenticated && !hubConnectionIsInitialized;
    console.log(
      `${logPrefix} Should build connection? ${shouldBuildConnection}`
    );
    if (shouldBuildConnection) {
      initializeHubConnection();
    }

    const shouldTerminateConnection =
      !userIsAuthenticated && hubConnectionIsInitialized;
    console.log(
      `${logPrefix} Should terminate connection? ${shouldTerminateConnection}`
    );
    if (shouldTerminateConnection) {
      terminateHubConnection();
    }

    /**
     * Will terminate an existing signal r hub connection after a users logout.
     */
    async function terminateHubConnection() {
      await hubConnection?.stop();
      setHubConnection(null);
      setHubConnectionEstablished(false);
    }

    /**
     * Will initialize a signal r hub connection for the currently logged in users role.
     */
    async function initializeHubConnection() {
      const hubConnectionUrl =
        userInfo?.role === UserRoles.Parent
          ? parentNotificationHubUrl
          : childNotificationHubUrl;
      console.log(
        `${logPrefix} :: Building hub connection to ${hubConnectionUrl}`
      );
      const hubConnect = new HubConnectionBuilder()
        .withUrl(hubConnectionUrl)
        .withAutomaticReconnect()
        .build();

      try {
        console.log(`${logPrefix} :: Starting connection...`);
        await hubConnect.start();
        console.log(`${logPrefix} :: Connection successful...`);
        setHubConnection(hubConnect);
        setHubConnectionEstablished(true);
      } catch (err) {
        errorNotification(
          "Beim abonnieren von Benachrichtigungen ist ein unbekannter Fehler aufgetreten..."
        );
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (hubConnection) {
      for (const notificationSubscriber of notificationSubscribers) {
        console.log(
          `${logPrefix} :: Subscribing '${notificationSubscriber.subscriberKey}' to connection`
        );
        hubConnection.on(
          notificationSubscriber.notificationMethodName,
          notificationSubscriber.notificationReceivedCallback
        );
      }
    }
  }, [notificationSubscribers]);

  return (
    <>
      <NotificationSubscriberHandler userRole={userInfo?.role} />
    </>
  );
}
