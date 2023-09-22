"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/logout.style.module.css";
export default function Logout() {
  const [openLogOutDialog, setOpenLogOutDialog] = useState(false);

  const router = useRouter();
  const redirect = () => router.push("/logout");

  return (
    <div className={styles.optionContainer}>
      <div
        className={`${styles.logOut} ${
          !openLogOutDialog && styles.logOutClose
        }`}
        onClick={redirect}
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
