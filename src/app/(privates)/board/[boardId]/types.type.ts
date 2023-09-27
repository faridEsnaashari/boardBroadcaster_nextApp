import { Dispatch, ReactNode, SetStateAction } from "react";

export type PageParams = { params: { boardId: string } };

export type DrawingPanelProps = {
  paintable: boolean;
  shapes: ShapeEntity[];
  selectedShape?: ShapeEntity["name"];
  actionMode?: ActionMode;
  hoveredShape?: ShapeEntity["name"];
  setDrawingPanelSize: ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => void;
  setSelectedShape?: (shapeName: ShapeEntity["name"]) => void;
};

export type Attributes =
  | VerticalLineAttributes
  | HorizontalLineAttributes
  | NormalLineAttributes
  | RectangleAttributes;

export type ShapeProps<T extends Attributes> = {
  hovered: boolean;
  selected: boolean;
  attributes: T;
  id: ShapeEntity<T>["name"];
  setSelectedShape?: (shapeName: ShapeEntity["name"]) => void;
};

export type VerticalLineAttributes = {
  x: number;
  y: number;
  length: number;
  color: string;
};

export type RectangleAttributes = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

export type NormalLineAttributes = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
};

export type HorizontalLineAttributes = {
  x: number;
  y: number;
  length: number;
  color: string;
};

export type ShapeEntity<T extends Attributes = Attributes> = {
  deleted: boolean;
  type: ShapeTypes;
  attributes: T;
  name: string;
};

export enum ShapeTypes {
  VerticalLine,
  NormalLine,
  HorizontalLine,
  Rectangle,
}

export type CollapsableButtonsProps = { children: ReactNode };

export type HierarchyPanelProps = {
  onShapesListOpening: (shapesListOpening: boolean) => void;
  setSelectedShape: (shapeName: ShapeEntity["name"]) => void;
  actionMode: ActionMode;
  setActionMode: Dispatch<SetStateAction<ActionMode>>;
  drawingPanelSize: { width: number; height: number };
};

export enum ActionMode {
  Disable,
  Rescale,
  Move,
  Select,
}
