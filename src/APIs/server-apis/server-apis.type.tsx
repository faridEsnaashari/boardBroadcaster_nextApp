import { StatusCodes } from "@/tools/status-codes.tools";
import { ApiBoard, ApiUser } from "../types/boards/entities.type";

export type ResponeData = ApiUser;

export type ServerApisResponse<T extends ResponeData = never> = {
  status: StatusCodes;
  success: boolean;
  message: string;
  data: T;
};

export type BoardExistsActionData = {
  boardIdentifier: ApiBoard["boardIdentifier"];
};
