import { BoardColor } from "@/common/types/entities.type";

export type ApiBoard = {
  _id: string;
  name: string;
  color: BoardColor;
  owner: User | User["_id"];
  boardIdentifier: string;
  __v: number;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  __v: number;
};
