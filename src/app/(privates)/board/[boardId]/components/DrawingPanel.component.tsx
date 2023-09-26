"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import styles from "../styles/drawing-panel.style.module.css";
import {
  Attributes,
  DrawingPanelProps,
  HorizontalLineAttributes,
  NormalLineAttributes,
  ShapeEntity,
  ShapeTypes,
  VerticalLineAttributes,
} from "../types.type";
import VerticalLine from "./VerticalLine.component";
import HorizontalLine from "./HorizontalLine.component";
import NormalLine from "./NormalLine.component";

export default function DrawingPanel({
  paintable,
  shapes,
  selected,
  hovered,
  setDrawingPanelSize,
}: DrawingPanelProps) {
  const drawingPanelRef = useRef<HTMLDivElement>(null);

  const [shapesShadow, setShapesShadow] =
    useState<ShapeEntity<Attributes>[]>(shapes);

  useEffect(() => setShapesShadow(shapes), [shapes]);

  useEffect(() => {
    onResize();
  }, []);

  const onResize = () => {
    if (!drawingPanelRef.current) {
      return;
    }

    const { width, height } = drawingPanelRef.current!.getBoundingClientRect();
    setDrawingPanelSize({ width, height });
  };

  const getShapes = (): ReactNode[] => {
    return (
      shapesShadow &&
      shapesShadow.map((shape, index) => {
        const { attributes, name, type } = shape;

        switch (type) {
          case ShapeTypes.VerticalLine:
            return (
              <VerticalLine
                attributes={attributes as VerticalLineAttributes}
                id={name}
                key={index}
                selected={!!selected}
                //onSelectedChange={paintable ? onSelectedChange : () => {}}
                hovered={hovered === name}
              />
            );

          case ShapeTypes.HorizontalLine:
            return (
              <HorizontalLine
                attributes={attributes as HorizontalLineAttributes}
                id={name}
                key={index}
                selected={!!selected}
                //onSelectedChange={paintable ? onSelectedChange : () => {}}
                hovered={hovered === name}
              />
            );

          case ShapeTypes.NormalLine:
            return (
              <NormalLine
                attributes={attributes as NormalLineAttributes}
                id={name}
                key={index}
                selected={!!selected}
                //onSelectedChange={paintable ? onSelectedChange : () => {}}
                hovered={hovered === name}
              />
            );
        }
      })
    );
  };

  return (
    <div
      ref={drawingPanelRef}
      className={styles.drawingPanel}
      id="drawingPanel"
    >
      {getShapes()}
    </div>
  );
}
