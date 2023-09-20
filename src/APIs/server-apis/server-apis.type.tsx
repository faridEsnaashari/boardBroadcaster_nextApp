import { StatusCodes } from "@/tools/status-codes.tools";

export type User = {
  _id?: string;
  name?: string;
  email?: string;
  boards?: Board[];
};

export type Board = {
  _id: string;
  name: string;
  color: string;
  owner: User["_id"];
  boardIdentifier: string;
};

export type ServerApisResponse = {
  statusCode: StatusCodes;
  data: User;
};
