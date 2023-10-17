import { StatusCodes } from "@/tools/status-codes.tools";
import {
  LoginActionTypes,
  LogoutActionTypes,
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

export type LogoutAction = {
  statusCode?: StatusCodes;
  type: LogoutActionTypes;
};

export type LoginActionData = {
  password: string;
  email: string;
};

export type SignupActionData = {
  password: string;
  email: string;
  name: string;
};

export type VerifyEmailActionData = string;
