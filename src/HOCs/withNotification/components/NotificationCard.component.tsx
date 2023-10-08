"use client";

import { NotificationCardProps } from "../types.type";
import styles from "../styles/notification-card.styles.module.css";
import Image from "next/image";
import CrossIcon from "@icons/x-mark.png";
import { useRef, useEffect } from "react";

export default function NotificationCard({
  notifType,
  message,
  onClose,
  closing,
}: NotificationCardProps) {
  const ANIMATION_RUNNING_TIME = 1000;

  const notificationContainerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const notificationsContainer = document.getElementById(
      "notificationsContainer",
    )!;

    notificationsContainer.style.animation = "none";
    notificationsContainer.offsetHeight;
    notificationsContainer.style.animation = "";
  }, []);

  useEffect(() => {
    if (!closing) {
      return;
    }

    closeNotif();
  }, [closing]);

  const closeNotif = () => {
    notificationContainerRef.current.classList.add(styles.close);
    setTimeout(() => onClose(), ANIMATION_RUNNING_TIME);
  };

  return (
    <div
      ref={notificationContainerRef}
      className={` ${styles.notificationContainer} ${
        styles["notificationContainer" + notifType]
      }`}
    >
      <div>{message}</div>
      <button onClick={closeNotif}>
        <Image src={CrossIcon} alt="close button icon" />
      </button>
    </div>
  );
}
