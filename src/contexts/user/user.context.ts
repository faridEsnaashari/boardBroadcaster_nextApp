import { User } from "@/APIs/server-apis/server-apis.type";
import { createContext } from "react";

export const UserContext = createContext<User>({});
