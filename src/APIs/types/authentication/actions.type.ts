import { StatusCodes } from "@/tools/status-codes.tools";
import { VerifyEmailActionTypes } from "./authentication.enum";

export type VerifyEmailActionData = string;

export type RequestedVerifyEmail = {
  type: VerifyEmailActionTypes.REQUESTED_VERIFY_EMAIL;
};

export type RecivedVerifyEmail = {
  statusCode: StatusCodes.SUCCESS_MSG;
  type: VerifyEmailActionTypes.RECIVED_VERIFY_EMAIL;
};

export type FailedVerifyEmail = {
  statusCode: StatusCodes.NOTFOUND_ERR;
  type: VerifyEmailActionTypes.FAILED_VERIFY_EMAIL;
};

export type VerifyEmailAction =
  | FailedVerifyEmail
  | RecivedVerifyEmail
  | RequestedVerifyEmail;
