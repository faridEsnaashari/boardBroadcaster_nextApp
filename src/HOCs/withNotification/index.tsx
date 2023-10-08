"use client";

import { useState, ComponentType, useRef } from "react";
import {
  Notification,
  NotificationFunction,
  NotificationProps,
  NotificationTypes,
  NotificationsProps,
} from "./types.type";
import Notifications from "./components/Notifications.component";

export default function withNotification<T>(
  Component: ComponentType<T & NotificationProps>,
) {
  return function WithNotification(props: T) {
    const [notifs, setNotifs] = useState<Notification[]>([]);
    const notifsRef = useRef<Notification[]>([]);

    const SHOW_NOTIF_TIME = 3000;

    const resetNotif = (notifId: Notification["id"], time?: number) => {
      setTimeout(() => {
        notifsRef.current = notifsRef.current.map((notif) =>
          notif.id === notifId ? { ...notif, closing: true } : notif,
        );
        setNotifs(notifsRef.current);
      }, time || SHOW_NOTIF_TIME);
    };
    const createNotification =
      (notifType: NotificationTypes): NotificationFunction =>
      (message: Notification["message"], time?: number) => {
        const newNotif = {
          notifType,
          message,
          id: Date.now(),
          closing: false,
        };

        notifsRef.current = [newNotif, ...notifsRef.current];
        setNotifs(notifsRef.current);
        resetNotif(newNotif.id, time);
      };

    const success: NotificationFunction = createNotification(
      NotificationTypes.Success,
    );
    const error: NotificationFunction = createNotification(
      NotificationTypes.Error,
    );
    const warning: NotificationFunction = createNotification(
      NotificationTypes.Warning,
    );
    const info: NotificationFunction = createNotification(
      NotificationTypes.Info,
    );

    const notificationProps: NotificationProps = {
      notificationFucntions: {
        success,
        error,
        warning,
        info,
      },
    };

    const onClose: NotificationsProps["onClose"] = (
      notifId: Notification["id"],
    ) => {
      notifsRef.current = notifsRef.current.filter(
        (notif) => notif.id !== notifId,
      );
      setNotifs(notifsRef.current);
    };

    return (
      <>
        <Notifications notifs={notifs} onClose={onClose} />
        <Component
          notificationFucntions={notificationProps.notificationFucntions}
          {...props}
        />
      </>
    );
  };
}
