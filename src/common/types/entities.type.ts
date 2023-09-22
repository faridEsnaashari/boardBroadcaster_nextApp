export enum BoardColor {
  Red = "#d04f4f",
  Orange = "#d0984f",
  Green = "#a8d04f",
  Blue = "#4fd0ac",
}

export type Board = {
  _id: string;
  name: string;
  color: BoardColor;
  owner?: User;
  boardIdentifier: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  boards?: Board[];
};
