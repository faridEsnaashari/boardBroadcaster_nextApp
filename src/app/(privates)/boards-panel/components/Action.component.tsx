"use client";

import LoadingCircle from "@/common/components/loading-circle";
import Image from "next/image";
import { ActionProps } from "../types.type";
import styles from "../styles/action.style.module.css";
import { useRef, useEffect, MouseEvent } from "react";

export default function Action({
  icon: Icon,
  color,
  done,
  isLoading,
  tooltipText,
}: ActionProps) {
  const DONE_SHOW_TIME = 2000;

  const doneRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLParagraphElement | null>(null);
  const resetTooltipPostionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!done) {
      return;
    }

    const doneDOM = doneRef.current!;
    doneDOM.classList.remove(styles.doneHide);
    doneDOM.classList.add(styles.doneShow);

    setTimeout(() => {
      doneDOM.classList.remove(styles.doneShow);
      doneDOM.classList.add(styles.doneHide);
    }, DONE_SHOW_TIME);
  }, [done]);

  useEffect(() => {
    tooltipRef.current && (tooltipRef.current.innerHTML = tooltipText);
  }, [tooltipText]);

  useEffect(() => {
    const tooltip = document.createElement("p");
    tooltip.classList.add(styles.tooltip);
    tooltip.innerHTML = tooltipText;

    tooltipRef.current = tooltip;

    document.body.appendChild(tooltip);

    return () => {
      document.body.removeChild(tooltip);
    };
  }, []);

  const getTooltipPosition = (
    tooltip: typeof tooltipRef.current,
    action: HTMLDivElement,
  ) => {
    const tooltipBoundingClientRect = tooltip!.getBoundingClientRect();
    const actionBoundingClientRect = action.getBoundingClientRect();

    return {
      top: actionBoundingClientRect.top - tooltipBoundingClientRect.height - 5,
      left:
        actionBoundingClientRect.left +
        actionBoundingClientRect.width / 2 -
        tooltipBoundingClientRect.width / 2,
    };
  };

  const toggleTooltipShowStatus = (
    e: MouseEvent<HTMLDivElement>,
    showStatus: boolean,
  ) => {
    if (!tooltipRef?.current) {
      return;
    }

    if (showStatus) {
      tooltipRef.current.style.top =
        getTooltipPosition(tooltipRef.current, e.target as HTMLDivElement).top +
        "px";
      tooltipRef.current.style.left =
        getTooltipPosition(tooltipRef.current, e.target as HTMLDivElement)
          .left + "px";

      if (resetTooltipPostionTimeoutRef) {
        clearTimeout(resetTooltipPostionTimeoutRef.current!);
      }

      tooltipRef.current.classList.add(styles.tooltipShow);
    } else {
      resetTooltipPostionTimeoutRef.current = setTimeout(() => {
        tooltipRef.current!.style.top = 0 + "px";
        tooltipRef.current!.style.left = 0 + "px";
      }, 300);

      tooltipRef.current.classList.remove(styles.tooltipShow);
    }
  };

  return (
    <div
      className={styles.actionsContainer}
      style={{ backgroundColor: color }}
      onMouseOver={(e) => toggleTooltipShowStatus(e, true)}
      onMouseLeave={(e) => toggleTooltipShowStatus(e, false)}
    >
      <div
        className={`${styles.actions} ${isLoading && styles.actionsLoading}`}
      >
        <div
          ref={doneRef}
          style={{ backgroundColor: color }}
          className={`${styles.doneHide} ${styles.doneContainer}`}
        >
          <div></div>
        </div>
        <div>
          <LoadingCircle size={3} color="#fff" />
        </div>
        <Image src={Icon} alt="action icon" />
      </div>
    </div>
  );
}
