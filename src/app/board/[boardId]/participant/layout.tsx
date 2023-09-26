import { LayoutProps } from "@/common/types/next-components.type";
import { LayoutParams } from "./types.type";
import { doesBoardExists } from "@/APIs/server-apis";
import { NotFoundError } from "@/app/errors/not-found.error";

export default async function Layout({
  params,
  children,
}: LayoutProps & LayoutParams) {
  try {
    const exists = await doesBoardExists({ boardIdentifier: params.boardId });
    if (!exists.success) {
      throw new Error();
    }
    return <>{children}</>;
  } catch (err) {
    throw new NotFoundError("board not found");
  }
}
