import { BoardColor } from "@/common/types/entities.type";

export type ApiBoard = {
  _id: string;
  name: string;
  color: BoardColor;
  owner: ApiUser | ApiUser["_id"];
  boardIdentifier: string;
  __v: number;
};

export type ApiUser = {
  _id: string;
  name: string;
  email: string;
  boards: ApiBoard[];
  __v: number;
};
