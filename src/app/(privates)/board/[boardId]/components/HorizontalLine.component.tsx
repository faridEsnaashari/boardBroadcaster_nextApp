"use client";

import { CSSProperties, ReactNode } from "react";
import { HorizontalLineAttributes, ShapeProps } from "../types.type";
import styles from "../styles/shape.style.module.css";

export default function HorizontalLine({
  id,
  attributes,
  selected,
  hovered,
  setSelectedShape,
}: ShapeProps<HorizontalLineAttributes>) {
  const prepareHorizontalLineAttributes = (): HorizontalLineAttributes => {
    const { x, y, length, ...rest } = attributes;

    if (length >= 0) {
      return attributes;
    }

    return {
      y,
      x: x + length,
      length: -1 * length,
      ...rest,
    };
  };

  const prepareHorizontalLine = (): ReactNode => {
    const preparedAttributes = prepareHorizontalLineAttributes();

    const left = `${preparedAttributes.x}px`;
    const top = `${preparedAttributes.y}px`;

    const shapeStyles: CSSProperties = {};

    shapeStyles.left = left;
    shapeStyles.top = top;

    shapeStyles.backgroundColor = preparedAttributes.color;

    shapeStyles.width = `${preparedAttributes.length}px`;
    shapeStyles.height = "2px";

    shapeStyles.zIndex = selected || hovered ? 1 : 0;

    return (
      <div
        className={styles.shape}
        style={shapeStyles}
        id={id}
        onClick={() => setSelectedShape && setSelectedShape(id)}
      >
        <div
          className={`${styles.shapeSelectionBox} ${
            (selected || hovered) && styles.shapeSelectionBoxSelected
          }`}
        ></div>
      </div>
    );
  };

  return <>{prepareHorizontalLine()}</>;
}
