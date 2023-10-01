"use client";

import { useRef, useEffect, useState } from "react";
import styles from "../styles/shapes-list.style.module.css";
import { ShapeEntity, ShapesListProps } from "../types.type";
import ShapeDetail from "./ShapeDetail.component";

export default function ShapesList({
  shapesListOpening,
  shapes,
  selectedShape,
  setSelectedShape,
  setHoveredShape,
}: ShapesListProps) {
  const OPEN_SHAPES_LIST_TIME = 400;
  const ATTRIBUTES_CLOSING_TIME = 300;
  const INFINITY_SCROLL = 1000000;

  const shapesListRef = useRef<HTMLDivElement>(null!);
  const previousShapaOpenedAttributeContainerRef =
    useRef<ShapeEntity["name"]>("");

  const [attributesContainerOpening, setAttributesContainerOpening] =
    useState(false);

  useEffect(() => scrollShapesList(), [shapesListOpening]);

  const openOrCloseAttributesContainerOpening = (
    shapeName: ShapeEntity["name"],
    open: boolean,
  ): void => {
    if (open) {
      setAttributesContainerOpening(true);
      previousShapaOpenedAttributeContainerRef.current = shapeName;
      return;
    }

    setTimeout(() => {
      if (shapeName !== previousShapaOpenedAttributeContainerRef.current) {
        return;
      }
      setAttributesContainerOpening(false);
    }, ATTRIBUTES_CLOSING_TIME);
  };

  const scrollShapesList = () => {
    if (shapesListOpening) {
      setTimeout(
        () =>
          shapesListRef.current.scroll({
            top: INFINITY_SCROLL,
            behavior: "smooth",
          }),
        OPEN_SHAPES_LIST_TIME,
      );
      return;
    }

    setTimeout(() => shapesListRef.current.scroll(0, 0), OPEN_SHAPES_LIST_TIME);
  };

  const getShapesDetails = () => {
    return (
      shapes &&
      shapes.map((shape, index) => {
        return (
          <ShapeDetail
            key={index}
            shapeType={shape.type}
            openOrCloseAttributesContainerOpening={(open: boolean) =>
              openOrCloseAttributesContainerOpening(shape.name, open)
            }
            onClick={() => setSelectedShape(shape.name)}
            setHoveredShape={setHoveredShape}
            shapeName={shape.name}
            selected={shape.name === selectedShape}
            attributes={shape.attributes}
          />
        );
      })
    );
  };

  return (
    <div
      ref={shapesListRef}
      className={`${styles.shapesDetailsContainerOverflowOwner}  ${
        shapesListOpening && styles.shapesDetailsContainerOverflowOwnerOpen
      }`}
    >
      <div
        className={` ${styles.shapesDetailsContainer} ${
          attributesContainerOpening && styles.shapesDetailsContainerOpen
        } `}
      >
        <div className={styles.shapesDetailsUi}>{getShapesDetails()}</div>
      </div>
    </div>
  );
}
