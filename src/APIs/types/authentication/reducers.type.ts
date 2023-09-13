import { StatusCodes } from "@/tools/status-codes.tools";

export type VerifyEmailState = {
  isFetching: boolean;
  statusCode?: StatusCodes;
};
