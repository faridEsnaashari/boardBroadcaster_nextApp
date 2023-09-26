"use client";

import { ErrorProps } from "@/common/types/next-components.type";
import { NotAuthorizedError } from "./errors/not-authorized.error";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error }: ErrorProps<NotAuthorizedError>) {
  const router = useRouter();

  useEffect(() => {
    error.handle && error.handle();

    if (error.message === "you don't have access to this resource") {
      router.push("/login");
    }

    if (error.message === "board not found") {
      router.push("/board/not-found");
    }
  }, [error]);

  return <p>{error.message}</p>;
}
