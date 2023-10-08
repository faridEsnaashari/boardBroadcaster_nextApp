export type NotificationCardProps = Pick<
  Notification,
  "notifType" | "message" | "closing"
> & { onClose: () => void };

export enum NotificationTypes {
  Success,
  Error,
  Warning,
  Info,
}

export type Notification = {
  notifType: NotificationTypes | null;
  message: string;
  id: number;
  closing: boolean;
};

export type NotificationFunction = (
  message: Notification["message"],
  time?: number,
) => void;

export type NotificationProps = {
  notificationFucntions: {
    success: NotificationFunction;
    error: NotificationFunction;
    warning: NotificationFunction;
    info: NotificationFunction;
  };
};

export type NotificationsProps = {
  notifs: Notification[];
  onClose: (notifId: Notification["id"]) => void;
};
