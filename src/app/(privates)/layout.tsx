import { getUserData } from "@/APIs/server-apis";
import { LayoutProps } from "@/common/types/next-components.type";
import UserContext from "@/contexts/user";
import { redirect } from "next/navigation";

export default async function Layout({ children }: LayoutProps) {
  try {
    const userData = await getUserData(true);

    return <UserContext userData={userData}>{children}</UserContext>;
  } catch (err) {
    console.error(err);
    redirect("/login");
  }
}
