"use client";

import { useContext, useState } from "react";
import { ActionMode, PageParams, ShapeEntity } from "../types.type";
import { UserContext } from "@/contexts/user/user.context";
import { NotFoundError } from "@/app/errors/not-found.error";
import styles from "../styles/page.style.module.css";
import HierarchyPanel from "../components/HierarchyPanel.component";
import DrawingPanel from "../components/DrawingPanel.component";
import { useSocket } from "@/hooks/use-socket/use-socket.hook";
import { changeShapeValues } from "@/tools/helpers.helper";
import ShapesList from "../components/ShapesList.component";

export default function Page({ params }: PageParams) {
  const userData = useContext(UserContext);

  const doesBoardExist = (): boolean => {
    const board = userData?.boards?.find(
      (board) => board.boardIdentifier === params.boardId,
    );

    return !!board;
  };

  const initShapes = (socketShapes: ShapeEntity[]) => {
    setShapes(
      socketShapes.map((shape) => ({
        ...shape,
        attributes: changeShapeValues("pixel", shape.attributes, {
          x: drawingPanelSize.width,
          y: drawingPanelSize.height,
        }),
      })),
    );
  };

  const socket = useSocket(params.boardId, initShapes);

  const [shapes, setShapes] = useState<ShapeEntity[]>([]);
  const [boardExists] = useState(doesBoardExist);
  const [shapesListOpening, setShapesListOpening] = useState(false);
  const [actionMode, setActionMode] = useState<ActionMode>(ActionMode.Disable);
  const [selectedShape, setSelectedShape] = useState<ShapeEntity["name"]>("");
  const [hoveredShape, setHoveredShape] = useState<ShapeEntity["name"]>("");
  const [drawingPanelSize, setDrawingPanelSize] = useState({
    width: 0,
    height: 0,
  });

  const createNewShape = (newShape: ShapeEntity) => {
    setShapes([...shapes, newShape]);
    setSelectedShape(newShape.name);

    const socketShape = {
      ...newShape,
      attributes: changeShapeValues("relative", newShape.attributes, {
        x: drawingPanelSize.width,
        y: drawingPanelSize.height,
      }),
    };

    socket.sendShape(socketShape);
  };

  const updateShape = (updatedShape: ShapeEntity) => {
    setShapes(
      shapes.map((shape) =>
        shape.name === updatedShape.name ? updatedShape : shape,
      ),
    );

    const socketShape = {
      ...updatedShape,
      attributes: changeShapeValues("relative", updatedShape.attributes, {
        x: drawingPanelSize.width,
        y: drawingPanelSize.height,
      }),
    };

    socket.sendShapeEventully(socketShape);
  };

  const onFinishPainting = () => {
    const shape = shapes.find((shape) => shape.name === selectedShape)!;
    const socketShape = {
      ...shape,
      attributes: changeShapeValues("relative", shape.attributes, {
        x: drawingPanelSize.width,
        y: drawingPanelSize.height,
      }),
    };

    socket.sendShapeEventully(socketShape);
  };

  const deleteShape = () => {
    if (!selectedShape) {
      return;
    }

    const deletedShape = shapes.find((shape) => shape.name === selectedShape)!;

    deletedShape.deleted = true;

    setShapes(
      shapes.map((shape) =>
        shape.name === deletedShape.name ? deletedShape : shape,
      ),
    );
    setSelectedShape("");

    socket.deleteShape(deletedShape);
  };

  const deleteAllShapes = () => {
    const deletedShapes = shapes.map((shape) => ({ ...shape, deleted: true }));
    setShapes(deletedShapes);

    setSelectedShape("");

    socket.deleteAllShapes(deletedShapes);
  };

  const duplicateShape = () => {
    if (!selectedShape) {
      return;
    }

    const currentShape = shapes.find((shape) => shape.name === selectedShape);

    const attributes = { ...currentShape!.attributes };

    "x" in attributes && (attributes.x = attributes.x + 10);
    "y" in attributes && (attributes.y = attributes.y + 10);
    "x1" in attributes && (attributes.x1 = attributes.x1 + 10);
    "y1" in attributes && (attributes.y1 = attributes.y1 + 10);

    const name = Date.now() + "";
    const newShape: ShapeEntity = { ...currentShape!, attributes, name };
    createNewShape(newShape);
  };

  const getShowableShapes = (): ShapeEntity[] =>
    shapes.filter((shape) => !shape.deleted);

  if (!boardExists) {
    throw new NotFoundError("board not found");
  }

  return (
    <div className={styles.panelsContainer}>
      <HierarchyPanel
        onShapesListOpening={setShapesListOpening}
        actionMode={actionMode}
        setActionMode={setActionMode}
        drawingPanelSize={drawingPanelSize}
        onCreateShape={createNewShape}
        onDeleteShape={deleteShape}
        onDeleteAllShapes={deleteAllShapes}
        onDuplicate={duplicateShape}
      />
      <ShapesList
        shapesListOpening={shapesListOpening}
        shapes={getShowableShapes()}
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        setHoveredShape={setHoveredShape}
      />
      <DrawingPanel
        paintable={true}
        shapes={getShowableShapes()}
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        actionMode={actionMode}
        hoveredShape={hoveredShape}
        setDrawingPanelSize={setDrawingPanelSize}
        onShapeUpdate={updateShape}
        onFinishPainting={onFinishPainting}
      />
    </div>
  );
}
