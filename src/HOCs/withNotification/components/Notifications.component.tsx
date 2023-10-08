"use client";

import { createPortal } from "react-dom";
import { NotificationsProps } from "../types.type";
import NotificationCard from "./NotificationCard.component";
import { useRef, useEffect } from "react";

export default function Notifications({ notifs, onClose }: NotificationsProps) {
  const notificationsContainer = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    notificationsContainer.current = document.getElementById(
      "notificationsContainer",
    ) as HTMLDivElement;
  }, []);

  const getNotificationCards = () =>
    notifs.map((notif) => (
      <NotificationCard
        key={notif.id}
        message={notif.message}
        notifType={notif.notifType}
        closing={notif.closing}
        onClose={() => onClose(notif.id)}
      />
    ));

  return (
    <>
      {notificationsContainer.current &&
        createPortal(getNotificationCards(), notificationsContainer.current)}
    </>
  );
}
