"use client";

import { useContext, useState } from "react";
import { ActionMode, PageParams, ShapeEntity } from "../types.type";
import { UserContext } from "@/contexts/user/user.context";
import { NotFoundError } from "@/app/errors/not-found.error";
import styles from "../styles/page.style.module.css";
import HierarchyPanel from "../components/HierarchyPanel.component";
import DrawingPanel from "../components/DrawingPanel.component";

export default function Page({ params }: PageParams) {
  const userData = useContext(UserContext);

  const doesBoardExist = (): boolean => {
    const board = userData?.boards?.find(
      (board) => board.boardIdentifier === params.boardId,
    );

    return !!board;
  };

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
        setSelectedShape={setSelectedShape}
      />
      <DrawingPanel
        paintable={true}
        shapes={shapes}
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
        actionMode={actionMode}
        hoveredShape={hoveredShape}
        setDrawingPanelSize={setDrawingPanelSize}
      />
    </div>
  );
}
