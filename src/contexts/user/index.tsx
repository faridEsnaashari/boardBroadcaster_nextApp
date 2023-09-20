"use client";

import { User } from "@/APIs/server-apis/server-apis.type";
import { ReactNode } from "react";
import { UserContext } from "./user.context";

export default function UserContextWrapper({
  userData,
  children,
}: {
  userData: User;
  children: ReactNode;
}) {
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
