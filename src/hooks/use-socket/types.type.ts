import { ShapeEntity } from "@/app/(privates)/board/[boardId]/types.type";
import { Board } from "@/common/types/entities.type";

export interface ClientToServer {
  deleteShape: (shape: ShapeEntity) => void;
  deleteAllShapes: (shapes: ShapeEntity[]) => void;
  draw: (shape: ShapeEntity) => void;
  joinToRoom: (boardIdentifier: Board["boardIdentifier"]) => void;
}

export interface ServerToClient {
  deleteShape: (shape: ShapeEntity) => void;
  newShape: (shape: ShapeEntity) => void;
  initShapes: (shapes: ShapeEntity[]) => void;
}
