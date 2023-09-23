"use client";

import { BoardColor } from "@/common/types/entities.type";
import styles from "../styles/board-card.style.module.css";
import { BoardCardProps } from "../types.type";
import { useRef, useState, useEffect } from "react";
import Action from "./Action.component";
import LinkIcon from "@icons/link.png";
import RenameIcon from "@icons/rename.png";
import DeleteIcon from "@icons/garbageWhite.png";
import ConfirmIcon from "@icons/checkWhite.png";
import AbortIcon from "@icons/crossWhite.png";
import Image from "next/image";

export default function BoardCard({
  boardColor,
  deleted,
  name,
  copyPresenterUrl,
  copyParticipantUrl,
  id,
  done,
  isLoading,
  updateBoard,
  deleteBoard,
}: BoardCardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const [inputFocuesd, setInputFocused] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    openDeleteDialog && setOpenRenameDialog(false);
    openRenameDialog && setOpenDeleteDialog(false);
  }, [openRenameDialog, openDeleteDialog]);

  useEffect(() => {
    if (inputFocuesd) {
      setOpenRenameDialog(true);
    } else if (document.activeElement !== boardRef.current) {
      setOpenRenameDialog(false);
    }
  }, [inputFocuesd]);

  const getBoardColorStyle = (className: string): string => {
    const colorValue = Object.values(BoardColor).indexOf(boardColor);
    return styles[className + colorValue];
  };

  const resetBoard = () => {
    if (inputFocuesd) {
      return;
    }

    if (openRenameDialog) {
      setOpenRenameDialog(false);
    }

    if (openDeleteDialog) {
      setOpenDeleteDialog(false);
    }
  };

  const onRename = () => {
    const newName = renameInputRef.current!.value;
    if (!newName) {
      return;
    }

    updateBoard(newName);
    resetBoard();
  };

  return (
    <div
      className={`${styles.boardMainContainer} ${
        deleted && styles.boardMainContainerDelete
      } ${getBoardColorStyle("boardMainContainerColor")} `}
      tabIndex={1}
      onBlur={resetBoard}
      ref={boardRef}
    >
      <div className={styles.boardWrapper}>
        <div className={styles.boardNameContainer}>
          <div className={styles.boardName} style={{ color: boardColor }}>
            {name}
          </div>
        </div>
        <div className={styles.boardActions}>
          <div
            className={styles.boardCopyPresenterUrlAction}
            onClick={() => copyPresenterUrl()}
          >
            <Action
              tooltipText="presenter url"
              color={boardColor}
              done={done.presenterUrlCopiedSignal === id}
              icon={LinkIcon}
            />
          </div>
          <div
            className={styles.boardCopyParticipantUrlAction}
            onClick={() => copyParticipantUrl()}
          >
            <Action
              tooltipText="participant url"
              color={boardColor}
              done={done.participantUrlCopiedSignal === id}
              icon={LinkIcon}
            />
          </div>
          <div
            className={styles.boardRenameAction}
            onClick={() => setOpenRenameDialog(true)}
          >
            <Action
              tooltipText="rename"
              color={boardColor}
              isLoading={isLoading.rename}
              icon={RenameIcon}
            />
          </div>
          <div
            className={styles.boardDeleteAction}
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Action
              tooltipText="delete"
              color={boardColor}
              isLoading={isLoading.delete}
              icon={DeleteIcon}
            />
          </div>
        </div>
        <div
          className={`${styles.boardDeleteConfirmaionContainer} ${
            openDeleteDialog
              ? styles.boardDeleteConfirmaionContainerOpen
              : styles.boardDeleteConfirmaionContainerClose
          }`}
        >
          <div onClick={() => deleteBoard()}>
            <Image src={ConfirmIcon} alt="confirm?" />
          </div>
          <div onClick={resetBoard}>
            <Image src={AbortIcon} alt="abort" />
          </div>
        </div>
      </div>
      <div
        className={` ${styles.boardRenameFieldContainer} ${
          openRenameDialog
            ? styles.boardRenameFieldContainerOpen
            : styles.boardRenameFieldContainerClose
        }`}
      >
        <input
          ref={renameInputRef}
          type="text"
          className={`
                    ${styles.boardRenameInput}
                    ${getBoardColorStyle("boardRenameInputColor")}
                    `}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <div className={styles.boardRenameConfirmButtonContainer}>
          <div
            className={`${styles.boardRenameConfirmButton} ${styles.boardRenameConfirmButtonFake}`}
          ></div>
          <div className={styles.boardRenameConfirmButton} onClick={onRename}>
            <Image src={ConfirmIcon} alt="confirm icon" />
          </div>
          <div
            className={`${styles.boardRenameConfirmButton} ${styles.boardRenameConfirmButtonFake}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
