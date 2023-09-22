import { User } from "@/common/types/entities.type";
import { StatusCodes } from "@/tools/status-codes.tools";

export type ServerApisResponse = {
  statusCode: StatusCodes;
  data: User;
};
