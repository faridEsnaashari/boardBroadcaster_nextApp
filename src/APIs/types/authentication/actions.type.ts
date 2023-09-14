import { StatusCodes } from "@/tools/status-codes.tools";
import {
  LoginActionTypes,
  SignUpActionTypes,
  VerifyEmailActionTypes,
} from "./authentication.enum";

export type VerifyEmailAction = {
  statusCode?: StatusCodes;
  type: VerifyEmailActionTypes;
};

export type SignUpAction = {
  statusCode?: StatusCodes;
  type: SignUpActionTypes;
};

export type LoginAction = {
  statusCode?: StatusCodes;
  type: LoginActionTypes;
  userToken?: string;
};
