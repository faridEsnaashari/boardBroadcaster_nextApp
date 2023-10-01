"use client";

import styles from "../styles/shape-detail.style.module.css";
import Image from "next/image";
import { ReactNode, useState, useEffect } from "react";
import { KeyOfAttributes, ShapeDetailProps, ShapeTypes } from "../types.type";
import RectongleIcon from "@icons/rectongleIcon.svg";
import NormalLineIcon from "@icons/normalLineIcon.png";
import VerticalLineIcon from "@icons/verticalLineIcon.png";
import HorizontalLineIcon from "@icons/horizontalLineIcon.svg";
import Attribute from "./Attribute.component";

export default function ShapeDetail({
  shapeType,
  openOrCloseAttributesContainerOpening,
  onClick,
  setHoveredShape,
  shapeName,
  selected,
  attributes,
}: ShapeDetailProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    openOrCloseAttributesContainerOpening(open);
    setHoveredShape(open ? shapeName : "");
  }, [open]);

  const getShapeIcon = (): ReactNode => {
    switch (shapeType) {
      case ShapeTypes.HorizontalLine:
        return <Image src={HorizontalLineIcon} alt="horizontal line icon" />;

      case ShapeTypes.NormalLine:
        return <Image src={NormalLineIcon} alt="horizontal line icon" />;

      case ShapeTypes.Rectangle:
        return <Image src={RectongleIcon} alt="horizontal line icon" />;

      case ShapeTypes.VerticalLine:
        return <Image src={VerticalLineIcon} alt="horizontal line icon" />;
    }
  };

  const getAttributes = () => {
    return Object.entries(attributes).map(([attribute, value], index) => (
      <Attribute
        key={index}
        attribute={attribute as KeyOfAttributes}
        shapeName={shapeName}
        value={value}
      />
    ));
  };

  return (
    <div
      className={`${styles.shapeDetailContainer} ${
        selected && styles.buttonClicked
      }`}
      onClick={onClick}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {getShapeIcon()}
      <div
        className={` ${styles.attributesContainer} ${
          open
            ? styles.attributesContainerOpen
            : styles.attributesContainerClose
        }`}
        onMouseEnter={() => setOpen(false)}
      >
        {getAttributes()}
      </div>
    </div>
  );
}
