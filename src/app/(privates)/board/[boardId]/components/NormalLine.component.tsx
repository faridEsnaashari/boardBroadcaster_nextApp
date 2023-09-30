"use client";

import { CSSProperties, ReactNode } from "react";
import { NormalLineAttributes, ShapeProps } from "../types.type";
import styles from "../styles/shape.style.module.css";

export default function NormalLine({
  id,
  attributes,
  selected,
  hovered,
  setSelectedShape,
}: ShapeProps<NormalLineAttributes>) {
  const prepareNormalLine = (): ReactNode => {
    const { x1, y1, x2, y2 } = attributes;

    const length = y2 - y1;
    const width = x2 - x1;

    const squreOfLength = length * length;
    const squreOfWidth = width * width;

    const sum = squreOfWidth + squreOfLength;

    const diagonalLength = Math.sqrt(sum);

    const angleInRadians = Math.atan2(y2 - y1, x2 - x1);
    const angleInDegree = (angleInRadians * 180) / Math.PI;

    const shapeStyles: CSSProperties = {};

    shapeStyles.width = `${diagonalLength}px`;
    shapeStyles.height = "2px";

    const left = `${attributes.x1}px`;
    const top = `${attributes.y1}px`;

    shapeStyles.backgroundColor = attributes.color;

    const normalLineHolderStyles: CSSProperties = {
      transform: `rotate(${angleInDegree}deg)`,
      width: "1px",
      height: "1px",
      position: "absolute",
      top: top,
      left: left,
      zIndex: selected ? 1 : 0,
    };

    return (
      <div style={normalLineHolderStyles}>
        <div
          className={styles.shape}
          style={shapeStyles}
          id={id}
          onClick={() => setSelectedShape && setSelectedShape(id)}
        >
          <div
            className={`${styles.shapeSelectionBox} ${
              (selected || hovered) && styles.shapeSelectionBoxSelected
            } `}
          ></div>
        </div>
      </div>
    );
  };

  return <>{prepareNormalLine()}</>;
}
