import { StatusCodes } from "@/tools/status-codes.tools";
import { VerifyEmailActionTypes } from "./authentication.enum";

export type VerifyEmailActionData = string;

export type VerifyEmailAction = {
  statusCode?: StatusCodes;
  type: VerifyEmailActionTypes;
};
