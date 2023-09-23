"use client";

import { getElementValueById } from "@/tools/helpers.helper";
import styles from "./styles/page.style.module.css";
import { FormEvent, useEffect } from "react";
import useAPICaller from "@/hooks/use-api-caller.hook";
import { StatusCodes } from "@/tools/status-codes.tools";
import { useRouter } from "next/navigation";
import UserNameIcon from "@icons/user.png";
import PasswordIcon from "@icons/key.png";
import EmailIcon from "@icons/mail.png";
import Image from "next/image";

export default function Page() {
  const [signUp, result] = useAPICaller().signUpCaller;
  const router = useRouter();

  useEffect(() => {
    if (result.statusCode === StatusCodes.SUCCESS_CREATE_MSG) {
      router.push("/signup/verification-sent");
      return;
    }
  }, [result]);

  const registerTheUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = getElementValueById("name")!;
    const password = getElementValueById("password")!;
    const email = getElementValueById("email")!;

    const userInformation = {
      name,
      password,
      email,
    };

    signUp(userInformation);
  };

  return (
    <div className={styles.signupMainContainer}>
      <div className={styles.signupBackgroundColor1}></div>
      <div className={styles.signupBackgroundColor2}></div>
      <div className={styles.signupContainer}>
        <form onSubmit={registerTheUser}>
          <div className={styles.inputContainer}>
            <input type="text" name="name" id="name" />
            <div>
              <Image src={UserNameIcon} alt="user-name-icon" />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input type="password" name="password" id="password" />
            <div>
              <Image src={PasswordIcon} alt="user-name-icon" />
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input type="text" name="email" id="email" />
            <div>
              <Image src={EmailIcon} alt="user-name-icon" />
            </div>
          </div>
          <div className={styles.signupSubmitMainContainer}>
            <div className={styles.signupSubmitContainer}>
              <div className={styles.hover}></div>
              <div></div>
              <input type="submit" value="signup" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
