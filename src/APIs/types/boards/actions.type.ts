import { StatusCodes } from "@/tools/status-codes.tools";
import {
  CreateBoardActionTypes,
  DeleteBoardAcrionTypes,
  UpdateBoardActionTypes,
} from "./boards.enum";
import { ApiBoard } from "./entities.type";

export type BoardCrudAction<
  T extends
    | UpdateBoardActionTypes
    | CreateBoardActionTypes
    | DeleteBoardAcrionTypes,
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

export type UpdateBoardActionData = {
  id: ApiBoard["_id"];
  name: ApiBoard["name"];
};

export type CreateBoardActionData = {
  name: ApiBoard["name"];
  color: ApiBoard["color"];
};

export type DeleteBoardActionData = {
  id: ApiBoard["_id"];
};
