"use client";

import { CSSProperties, ReactNode } from "react";
import { RectangleAttributes, ShapeProps } from "../types.type";
import styles from "../styles/shape.style.module.css";

export default function Rectangle({
  id,
  attributes,
  selected,
  hovered,
}: ShapeProps<RectangleAttributes>) {
  const prepareRectangleAttributes = (): RectangleAttributes => {
    const { x, y, width, height, ...rest } = attributes;

    if (width < 0 && height < 0) {
      return {
        x: x + width,
        y: y + height,
        width: -1 * width,
        height: -1 * height,
        ...rest,
      };
    }

    if (width < 0) {
      return {
        x: x + width,
        width: -1 * width,
        y,
        height,
        ...rest,
      };
    }

    if (height < 0) {
      return {
        y: y + height,
        height: -1 * height,
        x,
        width,
        ...rest,
      };
    }

    return attributes;
  };

  const prepareRectangle = (): ReactNode => {
    const preparedAttributes = prepareRectangleAttributes();

    const left = `${preparedAttributes.x}px`;
    const top = `${preparedAttributes.y}px`;

    const shapeStyles: CSSProperties = {};

    shapeStyles.left = left;
    shapeStyles.top = top;

    shapeStyles.height = `${preparedAttributes.height}px`;
    shapeStyles.width = `${preparedAttributes.width}px`;

    shapeStyles.zIndex = selected ? 1 : 0;

    return (
      <div
        className={styles.shape}
        style={shapeStyles}
        id={id}
        //onClick={() => onSelectedChange({ shape: id })}
      >
        <div
          className={`${styles.shapeSelectionBox} ${
            (selected || hovered) && styles.shapeSelectionBoxSelected
          } `}
        ></div>
      </div>
    );
  };

  return <>{prepareRectangle()}</>;
}
