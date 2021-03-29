/**
 * Workaround because of native Notification interface
 */
export interface NotificationBase {
  notificationName: string;
  args: any[];
}

export class UserNotification implements NotificationBase {
  notificationName: string;
  args: any[];

  constructor(notification: NotificationBase) {
    this.notificationName = notification.notificationName;
    this.args = notification.args;
  }

  public get notificationId(): string {
    return this.args[0] as string;
  }

  public get targetUserId(): number {
    return this.args[1] as number;
  }

  public get targetEntityId(): number {
    return this.args[2] as number;
  }
}
