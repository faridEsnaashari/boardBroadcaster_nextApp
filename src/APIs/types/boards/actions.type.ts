import { StatusCodes } from "@/tools/status-codes.tools";
import { CreateBoardActionTypes, UpdateBoardActionTypes } from "./boards.enum";
import { ApiBoard } from "./entities.type";

export type BoardCrudAction<
  T = UpdateBoardActionTypes | CreateBoardActionTypes,
> = {
  statusCode?: StatusCodes;
  type: T;
  board?: ApiBoard;
  error?: string;
};

export type ApiBoardResponse = {
  message: string;
  data: ApiBoard;
};
