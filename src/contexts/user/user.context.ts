import { User } from "@/common/types/entities.type";
import { createContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);
