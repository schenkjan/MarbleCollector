export interface NotificationSubscriber {
  subscriberKey: string;
  notificationMethodName: string;
  notificationReceivedCallback: (...args: any[]) => void;
}
