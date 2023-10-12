import { Socket, io } from "socket.io-client";
import { ClientToServer, ServerToClient } from "./types.type";
import { useState, useEffect } from "react";
import { GENERAL } from "@/configs";
import { debouncerHOF } from "@/tools/helpers.helper";
import { Board } from "@/common/types/entities.type";

export const useSocket = (
  boardIdentifier: Board["boardIdentifier"],
  onInitShapes: ServerToClient["initShapes"],
  onNewShape?: ServerToClient["newShape"],
  onDeleteShape?: ServerToClient["deleteShape"],
) => {
  const [socket, setSocket] = useState<Socket<
    ServerToClient,
    ClientToServer
  > | null>(null);

  socket?.on("initShapes", onInitShapes);
  onNewShape && socket?.on("newShape", onNewShape);
  onDeleteShape && socket?.on("deleteShape", onDeleteShape);

  useEffect(() => {
    setSocket(io(GENERAL.SOCKET_URL!));

    return (): void => {
      socket!.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.emit("joinToRoom", boardIdentifier);
  }, [socket]);

  const deleteShape: ClientToServer["deleteShape"] = (shape) =>
    socket!.emit("deleteShape", shape);

  const deleteAllShapes: ClientToServer["deleteAllShapes"] = (shapes) =>
    socket!.emit("deleteAllShapes", shapes);

  const sendShape: ClientToServer["draw"] = (shape) =>
    socket!.emit("draw", shape);

  const sendShapeEventully = debouncerHOF<ClientToServer["draw"]>(
    sendShape,
    500,
  );

  return { deleteShape, sendShape, deleteAllShapes, sendShapeEventully };
};
