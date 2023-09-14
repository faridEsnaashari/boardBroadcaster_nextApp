import { StatusCodes } from "@/tools/status-codes.tools";
import {
  LoginActionTypes,
  SignUpActionTypes,
  VerifyEmailActionTypes,
} from "./authentication.enum";

export type VerifyEmailActionData = string;

export type VerifyEmailAction = {
  statusCode?: StatusCodes;
  type: VerifyEmailActionTypes;
};

export type SignUpActionData = {
  name: string;
  email: string;
  password: string;
};

export type SignUpAction = {
  statusCode?: StatusCodes;
  type: SignUpActionTypes;
};

export type LoginActionData = {
  email: string;
  password: string;
};

export type LoginAction = {
  statusCode?: StatusCodes;
  type: LoginActionTypes;
  userToken?: string;
};
