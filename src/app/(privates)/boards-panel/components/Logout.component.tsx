"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/logout.style.module.css";
import useAPICaller from "@/hooks/use-api-caller.hook";
import { StatusCodes } from "@/tools/status-codes.tools";
import withNotification from "@/HOCs/withNotification";
import { NotificationProps } from "@/HOCs/withNotification/types.type";

function Logout({ notificationFucntions }: NotificationProps) {
  const [openLogOutDialog, setOpenLogOutDialog] = useState(false);

  const [logout, logoutResult] = useAPICaller().logoutCaller;

  const router = useRouter();

  useEffect(() => {
    if (logoutResult.isFetching) {
      return;
    }

    if (logoutResult.statusCode === StatusCodes.SUCCESS_MSG) {
      notificationFucntions.success("loged out successfully");
      router.push("/login");
    }
  }, [logoutResult.statusCode]);

  return (
    <div className={styles.optionContainer}>
      <div
        className={`${styles.logOut} ${
          !openLogOutDialog && styles.logOutClose
        }`}
        onClick={logout}
      >
        log out
      </div>
      <div
        className={styles.threeDotContainer}
        tabIndex={1}
        onBlur={() => setOpenLogOutDialog(false)}
        onClick={() => setOpenLogOutDialog(!openLogOutDialog)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default withNotification(Logout);
