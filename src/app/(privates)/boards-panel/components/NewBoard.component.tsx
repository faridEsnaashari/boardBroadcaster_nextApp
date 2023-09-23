"use client";

import { useRef, useState, useEffect } from "react";
import styles from "../styles/new-board.style.module.css";
import { NewBoardProps } from "../types.type";
import LoadingCircle from "@/common/components/loading-circle";

export default function NewBoard({ isLoading, createBoard }: NewBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const boardNameRef = useRef<HTMLInputElement>(null);

  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [inputFocuesd, setInputFocused] = useState(false);

  useEffect(() => {
    if (inputFocuesd) {
      setOpenRenameDialog(true);
    } else if (document.activeElement !== boardRef.current) {
      setOpenRenameDialog(false);
    }
  }, [inputFocuesd]);

  const resetBoard = () => {
    if (inputFocuesd) {
      return;
    }

    if (openRenameDialog) {
      setOpenRenameDialog(false);
    }
  };

  return (
    <div
      className={` ${styles.newBoardMainContainer} ${
        openRenameDialog
          ? styles.newBoardMainContainerOpen
          : styles.newBoardMainContainerClose
      }`}
      tabIndex={1}
      onBlur={resetBoard}
      ref={boardRef}
    >
      <div
        className={`${styles.newBoardRenameFieldContainer} ${
          openRenameDialog
            ? styles.newBoardRenameFieldContainerOpen
            : styles.newBoardRenameFieldContainerClose
        }`}
        onClick={() => setOpenRenameDialog(true)}
      >
        <div
          className={`${styles.newBoardRenameInputContainer} ${
            openRenameDialog
              ? styles.newBoardRenameInputContainerOpen
              : styles.newBoardRenameInputContainerClose
          }`}
        >
          <input
            ref={boardNameRef}
            type="text"
            className={styles.newBoardRenameInput}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
        </div>
        {isLoading ? (
          <div className={styles.newBoardLoadingCircle}>
            <LoadingCircle
              color={openRenameDialog ? "#fff" : "#21222d"}
              size={3}
            />
          </div>
        ) : (
          <div
            className={`${styles.newBoardRenameConfirmButton} ${
              openRenameDialog
                ? styles.newBoardRenameConfirmButtonWhite
                : styles.newBoardRenameConfirmButtonBlack
            }`}
            onClick={() => createBoard(boardNameRef.current!.value)}
          >
            <div />
            <div />
          </div>
        )}
      </div>
    </div>
  );
}
