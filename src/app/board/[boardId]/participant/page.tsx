"use client";

import DrawingPanel from "@/app/(privates)/board/[boardId]/components/DrawingPanel.component";
import { useState } from "react";
import { ShapeEntity } from "@/app/(privates)/board/[boardId]/types.type";
import styles from "./styles/page.style.module.css";
import { changeShapeValues } from "@/tools/helpers.helper";
import { useSocket } from "@/hooks/use-socket/use-socket.hook";
import { PageParams } from "./types.type";

export default function Page({ params }: PageParams) {
  const [shapes, setShapes] = useState<ShapeEntity[]>([]);
  const [drawingPanelSize, setDrawingPanelSize] = useState({
    width: 0,
    height: 0,
  });

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

  const onDraw = (updatedShape: ShapeEntity) => {
    let shapeWasExisted = false;

    const preparedUpdatedShape = {
      ...updatedShape,
      attributes: changeShapeValues("pixel", updatedShape.attributes, {
        x: drawingPanelSize.width,
        y: drawingPanelSize.height,
      }),
    };

    const updatedShapes = shapes.map((shape) => {
      if (shape.name !== preparedUpdatedShape.name) {
        return shape;
      }

      shapeWasExisted = true;
      return preparedUpdatedShape;
    });

    shapeWasExisted
      ? setShapes(updatedShapes)
      : setShapes([...updatedShapes, preparedUpdatedShape]);
  };

  const onDelete = (socketShape: ShapeEntity) => {
    setShapes(
      shapes.map((shape) =>
        shape.name === socketShape.name ? socketShape : shape,
      ),
    );
  };

  useSocket(params.boardId, initShapes, onDraw, onDelete);

  const getShowableShapes = (): ShapeEntity[] =>
    shapes.filter((shape) => !shape.deleted);

  return (
    <div className={styles.panelsContainer}>
      <DrawingPanel
        shapes={getShowableShapes()}
        paintable={false}
        setDrawingPanelSize={setDrawingPanelSize}
      />
    </div>
  );
}
