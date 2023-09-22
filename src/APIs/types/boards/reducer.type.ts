import { Board } from "@/common/types/entities.type";
import { StatusCodes } from "@/tools/status-codes.tools";

export type BoardCrudState = {
  isFetching: boolean;
  error?: string;
  board?: Board;
  statusCode?: StatusCodes;
};
