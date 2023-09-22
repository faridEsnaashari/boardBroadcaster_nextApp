"use client";

import { ReactNode } from "react";
import { UserContext } from "./user.context";
import { User } from "@/common/types/entities.type";

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
