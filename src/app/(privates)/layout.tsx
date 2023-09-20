import { getUserData } from "@/APIs/server-apis";
import { LayoutProps } from "./types.type";
import UserContext from "@/contexts/user";

export default async function Layout({ children }: LayoutProps) {
  try {
    const userData = await getUserData(true);

    return <UserContext userData={userData.data}>{children}</UserContext>;
  } catch (err) {
    console.error(err);
    throw new Error("you don't have access to this resource");
  }
}
