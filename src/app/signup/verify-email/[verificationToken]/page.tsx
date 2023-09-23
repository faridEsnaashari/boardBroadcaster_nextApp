"use client";
import useAPICaller from "@/hooks/use-api-caller.hook";
import { Params } from "./types/params.type";
import { useEffect } from "react";
import { StatusCodes } from "@/tools/status-codes.tools";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page({ params }: Params) {
  const verificationToken = params.verificationToken;
  const [verifyEmail, result] = useAPICaller().verifyEmailCaller;

  const router = useRouter();

  useEffect(() => verifyEmail(verificationToken), []);
  useEffect(() => {
    if (result.statusCode === StatusCodes.SUCCESS_MSG) {
      router.push("/login");
    }
  }, [result]);

  if (result.isFetching) {
    return <span>wait. verifing email.</span>;
  }

  if (result.statusCode === StatusCodes.UNAUTHORIZED_ERR) {
    return (
      <p>
        <span>url is wrong</span>
        <br />
        <span>
          click here to go to the<Link href="/"> home</Link>
        </span>
      </p>
    );
  }

  if (result.statusCode === StatusCodes.SUCCESS_MSG) {
    return <span>email has been verified successfully</span>;
  }
}
