"use client";

import { CSSProperties, ReactNode } from "react";
import styles from "../styles/shape.style.module.css";
import { ShapeProps, VerticalLineAttributes } from "../types.type";

export default function VerticalLine({
  hovered,
  selected,
  attributes,
  id,
  setSelectedShape,
}: ShapeProps<VerticalLineAttributes>) {
  const prepareVerticalLineAttributes = (): VerticalLineAttributes => {
    const { x, y, length, ...rest } = attributes;

    if (length >= 0) {
      return attributes;
    }

    return {
      x,
      y: y + length,
      length: -1 * length,
      ...rest,
    };
  };

  const prepareVerticalLine = (): ReactNode => {
    const preparedAttributes = prepareVerticalLineAttributes();

    const left = `${preparedAttributes.x}px`;
    const top = `${preparedAttributes.y}px`;

    const shapeStyles: CSSProperties = {};

    shapeStyles.left = left;
    shapeStyles.top = top;

    shapeStyles.backgroundColor = preparedAttributes.color;

    shapeStyles.width = "2px";
    shapeStyles.height = `${preparedAttributes.length}px`;

    shapeStyles.zIndex = selected || hovered ? 1 : 0;

    return (
      <div
        className={styles.shape}
        style={shapeStyles}
        id={id}
        onClick={() => setSelectedShape && setSelectedShape(id)}
      >
        <div
          className={` ${styles.shapeSelectionBox} ${
            (selected || hovered) && styles.shapeSelectionBoxSelected
          } `}
        ></div>
      </div>
    );
  };

  return <>{prepareVerticalLine()}</>;
}
