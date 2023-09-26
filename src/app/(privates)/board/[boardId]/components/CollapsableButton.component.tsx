"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../styles/collapsable-button.style.module.css";
import { CollapsableButtonsProps } from "../types.type";
import Image from "next/image";

import NewShapeIcon from "@icons/plus.png";

export default function CollapsableButtons({
  children,
}: CollapsableButtonsProps) {
  const [collapse, setCollapse] = useState(true);

  const closerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const closer = document.createElement("div");
    closer.className = styles.collapsableContainerCloser;
    closer.onclick = () => setCollapse(true);
    closer.style.display = "none";

    closerRef.current = closer;

    const container = document.querySelector("body")!;
    container.appendChild(closer);
  }, []);

  useEffect(() => {
    const closer = closerRef.current;
    closer.style.display = `${collapse ? "none" : "unset"}`;
    closerRef.current = closer;
  }, [collapse]);

  return (
    <div>
      {collapse && (
        <div className={styles.button} onClick={() => setCollapse(false)}>
          <Image src={NewShapeIcon} alt="new shape icon" />
        </div>
      )}
      <div
        className={` ${styles.collapsableButtons} ${
          !collapse && styles.collapsableButtonsOpen
        } ${collapse && styles.collapsableButtonsButton} `}
      >
        {children}
      </div>
    </div>
  );
}
