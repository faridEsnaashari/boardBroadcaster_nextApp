"use client";

import DrawingPanel from "@/app/(privates)/board/[boardId]/components/DrawingPanel.component";
import { useState } from "react";
import { ShapeEntity } from "@/app/(privates)/board/[boardId]/types.type";
import styles from "./styles/page.style.module.css";

export default function Page() {
  const [shapes, setShapes] = useState<ShapeEntity[]>([]);
  const [drawingPanelSize, setDrawingPanelSize] = useState({
    width: 0,
    height: 0,
  });

  return (
    <div className={styles.panelsContainer}>
      <DrawingPanel
        shapes={shapes}
        paintable={false}
        setDrawingPanelSize={setDrawingPanelSize}
      />
    </div>
  );
}
