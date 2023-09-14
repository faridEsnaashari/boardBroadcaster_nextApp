"use client";

import styles from "./styles/page.style.module.css";

import UserNameIcon from "@icons/user.png";
import PasswordIcon from "@icons/key.png";
import Image from "next/image";
import { getElementValueById } from "@/tools/helpers.helper";
import useAPICaller from "@/hooks/use-api-caller.hook";
import { FormEvent, useEffect } from "react";
import { StatusCodes } from "@/tools/status-codes.tools";
import { useRouter } from "next/navigation";

export default function Page() {
  const [login, result] = useAPICaller().loginCaller;
  const router = useRouter();

  const logInTheUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = getElementValueById("password") as string;
    const email = getElementValueById("email") as string;

    const userInformation = {
      password,
      email,
    };

    login(userInformation);
  };

  useEffect(() => {
    if (result.statusCode === StatusCodes.SUCCESS_MSG) {
      router.push("/boards-panel");
      return;
    }
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
        </form>
      </div>
    </div>
  );
}
