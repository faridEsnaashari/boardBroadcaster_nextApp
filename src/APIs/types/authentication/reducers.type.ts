import { StatusCodes } from "@/tools/status-codes.tools";

export type VerifyEmailState = {
  isFetching: boolean;
  statusCode?: StatusCodes;
};

export type SignUpState = {
  isFetching: boolean;
  statusCode?: StatusCodes;
};

export type LoginState = {
  isFetching: boolean;
  statusCode?: StatusCodes;
  userToken?: string;
};
