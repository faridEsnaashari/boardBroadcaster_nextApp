"use client";
import DuplicateIcon from "@icons/duplicate.png";
import DeleteAllButtonIcon from "@icons/broom.png";
import DeleteButtonIcon from "@icons/x-mark.png";
import SelectButtonSelectIcon from "@icons/tap.png";
import SelectButtonMoveIcon from "@icons/move.png";
import SelectButtonRescaleIcon from "@icons/pen.png";
import ShapeListsIcon from "@icons/menu.png";
import HorizontalLineIcon from "@icons/horizontalLineIcon.svg";
import VerticalLineIcon from "@icons/verticalLineIcon.png";
import NormalLineIcon from "@icons/normalLineIcon.png";
import RectongleIcon from "@icons/rectongleIcon.svg";

import { useEffect, useState, MouseEvent } from "react";
import styles from "../styles/hierarchy-panel.style.module.css";
import CollapsableButtons from "./CollapsableButton.component";
import {
  ActionMode,
  Attributes,
  HierarchyPanelProps,
  ShapeEntity,
  ShapeTypes,
} from "../types.type";
import Image from "next/image";

export default function HierarchyPanel({
  onShapesListOpening,
  setActionMode,
  actionMode,
  drawingPanelSize,
  onCreateShape,
  onDeleteShape,
  onDeleteAllShapes,
  onDuplicate,
}: HierarchyPanelProps) {
  const [shapesListOpening, setShapesListOpening] = useState(false);
  const [centerOfDrawingPanel, setCenterOfDrawingPanel] = useState({
    x: 0,
    y: 0,
    firstShapeLength: 0,
  });

  useEffect(() => onShapesListOpening(shapesListOpening), [shapesListOpening]);
  useEffect(
    () =>
      setCenterOfDrawingPanel({
        x: drawingPanelSize.width / 2,
        y: drawingPanelSize.height / 2,
        firstShapeLength: drawingPanelSize.width / 20,
      }),
    [drawingPanelSize],
  );

  const openOrCloseShapesList = () => setShapesListOpening(!shapesListOpening);

  const buttonClickedAutoEffect = (e: MouseEvent<HTMLDivElement>): void => {
    const BUTTON_ACTIVE_TIME = 300;

    const target = e.currentTarget as HTMLDivElement;
    target.classList.add(styles.buttonClicked);
    setTimeout(
      () => target.classList.remove(styles.buttonClicked),
      BUTTON_ACTIVE_TIME,
    );
  };

  const onShapeFunctionClicked = (
    shapeFunction: "delete" | "deleteAll" | "duplicate",
    e: MouseEvent<HTMLDivElement>,
  ) => {
    buttonClickedAutoEffect(e);

    shapeFunction === "delete" && onDeleteShape();
    shapeFunction === "deleteAll" && onDeleteAllShapes();
    shapeFunction === "duplicate" && onDuplicate();
  };

  const generateAttributes = (shapeType: ShapeTypes): Attributes => {
    switch (shapeType) {
      case ShapeTypes.HorizontalLine: {
        return {
          x: centerOfDrawingPanel.x,
          y: centerOfDrawingPanel.y,
          length: centerOfDrawingPanel.firstShapeLength,
          color: "#454545",
        };
      }

      case ShapeTypes.VerticalLine: {
        return {
          x: centerOfDrawingPanel.x,
          y: centerOfDrawingPanel.y,
          length: centerOfDrawingPanel.firstShapeLength,
          color: "#454545",
        };
      }

      case ShapeTypes.NormalLine: {
        return {
          x1: centerOfDrawingPanel.x,
          y1: centerOfDrawingPanel.y,
          x2: centerOfDrawingPanel.x + centerOfDrawingPanel.firstShapeLength,
          y2: centerOfDrawingPanel.y + centerOfDrawingPanel.firstShapeLength,
          color: "#454545",
        };
      }

      case ShapeTypes.Rectangle: {
        return {
          x: centerOfDrawingPanel.x,
          y: centerOfDrawingPanel.y,
          width: centerOfDrawingPanel.firstShapeLength,
          height: centerOfDrawingPanel.firstShapeLength,
          color: "#454545",
        };
      }
    }
  };

  const createShape = (
    shapeType: ShapeTypes,
    e: MouseEvent<HTMLDivElement>,
  ) => {
    buttonClickedAutoEffect(e);

    const shapeId = Date.now() + "";

    const newShape: ShapeEntity = {
      deleted: false,
      name: shapeId,
      type: shapeType,
      attributes: generateAttributes(shapeType),
    };

    setActionMode(ActionMode.Rescale);
    onCreateShape(newShape);
  };

  return (
    <div
      className={` ${styles.hierarchyPanel} ${
        shapesListOpening && styles.hierarchyPanelShapesListOpen
      } `}
    >
      <div className={styles.hierarchyButtonsContainer}>
        <div
          className={`${styles.button} ${
            !shapesListOpening && styles.buttonClicked
          }`}
          onClick={openOrCloseShapesList}
        >
          <Image src={ShapeListsIcon} alt="shape list icon" />
        </div>

        <div className={styles.hierarchyPanelDivider}></div>
        <CollapsableButtons>
          <div
            className={styles.button}
            onClick={(e) => createShape(ShapeTypes.HorizontalLine, e)}
          >
            <Image src={HorizontalLineIcon} alt="horizontal line icon" />
          </div>
          <div
            className={styles.button}
            onClick={(e) => createShape(ShapeTypes.VerticalLine, e)}
          >
            <Image src={VerticalLineIcon} alt="vertical line icon" />
          </div>
          <div
            className={styles.button}
            onClick={(e) => createShape(ShapeTypes.Rectangle, e)}
          >
            <Image src={RectongleIcon} alt="rectongle icon" />
          </div>
          <div
            className={styles.button}
            onClick={(e) => createShape(ShapeTypes.NormalLine, e)}
          >
            <Image src={NormalLineIcon} alt="normal line icon" />
          </div>
        </CollapsableButtons>
        <div className={styles.hierarchyPanelDivider}></div>
        <div
          className={`${styles.button} ${
            actionMode === ActionMode.Move && styles.buttonClicked
          }`}
          onClick={() => setActionMode(ActionMode.Move)}
        >
          <Image src={SelectButtonMoveIcon} alt="select button move icon" />
        </div>
        <div
          className={`${styles.button} ${
            actionMode === ActionMode.Rescale && styles.buttonClicked
          }`}
          onClick={() => setActionMode(ActionMode.Rescale)}
        >
          <Image
            src={SelectButtonRescaleIcon}
            alt="select button rescale icon"
          />
        </div>
        <div
          className={`${styles.button} ${
            actionMode === ActionMode.Select && styles.buttonClicked
          }`}
          onClick={() => setActionMode(ActionMode.Select)}
        >
          <Image src={SelectButtonSelectIcon} alt="select button icon" />
        </div>
        <div className={styles.hierarchyPanelDivider}></div>
        <div
          className={styles.button}
          onClick={(e) => onShapeFunctionClicked("duplicate", e)}
        >
          <Image src={DuplicateIcon} alt="duplicate icon" />
        </div>
        <div className={styles.hierarchyPanelDivider}></div>
        <div
          className={styles.button}
          onClick={(e) => onShapeFunctionClicked("delete", e)}
        >
          <Image src={DeleteButtonIcon} alt="delete button icon" />
        </div>
        <div
          className={styles.button}
          onClick={(e) => onShapeFunctionClicked("deleteAll", e)}
        >
          <Image src={DeleteAllButtonIcon} alt="delete all button icon" />
        </div>
      </div>
    </div>
  );
}
