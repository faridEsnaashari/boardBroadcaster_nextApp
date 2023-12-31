"use client";

import axios from "axios";
import styles from "./styles/page.style.module.css";
import UserNameIcon from "@icons/user.png";
import PasswordIcon from "@icons/key.png";
import Image from "next/image";
import {
  getElementValueById,
  isValidEmail,
  isValidPassword,
} from "@/tools/helpers.helper";
import useAPICaller from "@/hooks/use-api-caller.hook";
import { FormEvent, useEffect } from "react";
import { StatusCodes } from "@/tools/status-codes.tools";
import { useRouter } from "next/navigation";
import withNotification from "@/HOCs/withNotification";
import { NotificationProps } from "@/HOCs/withNotification/types.type";
import Link from "next/link";

function Page({ notificationFucntions }: NotificationProps) {
  const [login, result] = useAPICaller().loginCaller;
  const router = useRouter();

  const logInTheUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = getElementValueById("password")!;
    const email = getElementValueById("email")!;

    if (!isValidPassword(password) || !isValidEmail(email)) {
      notificationFucntions.error("wrong format");
      return;
    }

    const userInformation = {
      password,
      email,
    };

    login(userInformation);
  };

  useEffect(() => {
    if (!result.statusCode) {
      return;
    }

    if (result.statusCode === StatusCodes.UNAUTHORIZED_ERR) {
      notificationFucntions.error("wrong username or password");
      return;
    }

    if (result.statusCode === StatusCodes.SUCCESS_MSG) {
      global.localStorage.setItem("userToken", result.userToken as string);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + result.userToken;

      notificationFucntions.success("loged in successfully");

      router.push("/boards-panel");
      return;
    }

    notificationFucntions.error("something went wrong. please try again");
  }, [result.statusCode]);

  return (
    <div className={styles.loginMainContainer}>
      <div className={styles.loginBackgroundColor1}></div>
      <div className={styles.loginBackgroundColor2}></div>
      <div className={styles.loginContainer}>
        <form onSubmit={logInTheUser}>
          <div className={styles.inputContainer}>
            <input type="text" name="email" id="email" />
            <div>
              <Image src={UserNameIcon} alt="user-name-icon" />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input type="password" name="password" id="password" />
            <div>
              <Image src={PasswordIcon} alt="password-name-icon" />
            </div>
          </div>
          <div className={styles.loginSubmitMainContainer}>
            <div className={styles.loginSubmitContainer}>
              <div className={styles.hover}></div>
              <div></div>
              <input type="submit" value="login" />
            </div>
          </div>
          <div>
            <Link href="/signup">signup</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withNotification(Page);
