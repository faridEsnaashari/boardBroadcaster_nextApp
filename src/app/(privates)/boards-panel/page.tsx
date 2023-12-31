"use client";

import { UserContext } from "@/contexts/user/user.context";
import { useContext, useState, useEffect } from "react";
import styles from "./styles/page.style.module.css";
import NewBoard from "./components/NewBoard.component";
import { getRandomBoardColor } from "@/tools/helpers.helper";
import useAPICaller from "@/hooks/use-api-caller.hook";
import { StatusCodes } from "@/tools/status-codes.tools";
import { Board } from "@/common/types/entities.type";
import BoardCard from "./components/BoardCard.component";
import { GENERAL } from "@/configs";
import { useSignal } from "@/hooks/use-signal.hook";
import withNotification from "@/HOCs/withNotification";
import { NotificationProps } from "@/HOCs/withNotification/types.type";

function Page({ notificationFucntions }: NotificationProps) {
  const userData = useContext(UserContext);

  const [boards, setBoards] = useState<Board[]>(userData!.boards!);
  const [renameLoading, setRenameLoading] = useState<Board["_id"][]>([]);
  const [deleteLoading, setDeleteLoading] = useState<Board["_id"][]>([]);
  const [deleted, setDeleted] = useState<Board["_id"][]>([]);

  const [presenterUrlCopiedSignal, presenterUrlCopiedSignalActivate] =
    useSignal<Board["_id"]>();
  const [participantUrlCopiedSignal, participantUrlCopiedSignalActivate] =
    useSignal<Board["_id"]>();

  const [createBoardAction, createBoardResult] =
    useAPICaller().boardCaller.create;

  const [updateBoardAction, updateBoardResult] =
    useAPICaller().boardCaller.update;

  const [deleteBoardAction, deleteBoardResult] =
    useAPICaller().boardCaller.delete;

  useEffect(() => {
    if (deleteBoardResult.isFetching) {
      return;
    }

    if (deleteBoardResult.error) {
      notificationFucntions.error("something went wrong");
      return setDeleteLoading(
        deleteLoading.filter((boardId) => boardId !== deleteBoardResult.error),
      );
    }

    if (deleteBoardResult.statusCode === StatusCodes.SUCCESS_MSG) {
      notificationFucntions.success("board has been deleted successfully");
      setDeleteLoading(
        deleteLoading.filter(
          (boardId) => boardId !== deleteBoardResult.board?._id,
        ),
      );

      setDeleted([...deleted, deleteBoardResult.board!._id]);
    }
  }, [deleteBoardResult.isFetching]);

  useEffect(() => {
    if (updateBoardResult.isFetching) {
      return;
    }

    if (updateBoardResult.error) {
      notificationFucntions.error("something went wrong");
      setRenameLoading(
        renameLoading.filter((boardId) => boardId !== updateBoardResult.error),
      );
      return;
    }

    if (updateBoardResult.statusCode === StatusCodes.SUCCESS_MSG) {
      notificationFucntions.success("board has been updated successfully");
      setRenameLoading(
        renameLoading.filter(
          (boardId) => boardId !== updateBoardResult.board?._id,
        ),
      );
      setBoards(
        boards.map((board) =>
          board._id === updateBoardResult.board?._id
            ? { ...board, name: updateBoardResult.board.name }
            : board,
        ),
      );
    }
  }, [updateBoardResult.isFetching]);

  useEffect(() => {
    if (createBoardResult.statusCode === StatusCodes.SUCCESS_CREATE_MSG) {
      notificationFucntions.success("board has been created successfully");
      setBoards([...boards, createBoardResult.board!]);
    }

    if (createBoardResult.error) {
      notificationFucntions.error("something went wrong");
    }
  }, [createBoardResult.isFetching]);

  const createBoard = (name: Board["name"]) => {
    if (!name) {
      notificationFucntions.error("wrong format");
      return;
    }

    const color = getRandomBoardColor();

    createBoardAction({
      name,
      color,
    });
  };

  const updateBoard = (boardId: Board["_id"]) => (name: Board["name"]) => {
    if (!name) {
      notificationFucntions.error("wrong format");
      return;
    }

    updateBoardAction({ id: boardId, name });
    setRenameLoading([...renameLoading, boardId]);
  };

  const deleteBoard = (boardId: Board["_id"]) => () => {
    deleteBoardAction({ id: boardId });
    setDeleteLoading([...deleteLoading, boardId]);
  };

  const copyPresenterUrl =
    (boardUrl: Board["boardIdentifier"], boardId: Board["_id"]) => () => {
      navigator.clipboard.writeText(
        `${GENERAL.APP_URL}/board/${boardUrl}/presenter`,
      );
      presenterUrlCopiedSignalActivate(boardId);
    };

  const copyParticipantUrl =
    (boardUrl: Board["boardIdentifier"], boardId: Board["_id"]) => () => {
      navigator.clipboard.writeText(
        `${GENERAL.APP_URL}/board/${boardUrl}/participant`,
      );
      participantUrlCopiedSignalActivate(boardId);
    };

  return (
    <div className={styles.boardsPanelBody}>
      {boards?.map((board, index) => (
        <BoardCard
          id={board._id}
          boardColor={board.color}
          name={board.name}
          updateBoard={updateBoard(board._id)}
          deleteBoard={deleteBoard(board._id)}
          copyPresenterUrl={copyPresenterUrl(board.boardIdentifier, board._id)}
          copyParticipantUrl={copyParticipantUrl(
            board.boardIdentifier,
            board._id,
          )}
          deleted={deleted.includes(board._id)}
          isLoading={{
            rename: renameLoading.includes(board._id),
            delete: deleteLoading.includes(board._id),
          }}
          done={{
            presenterUrlCopiedSignal,
            participantUrlCopiedSignal,
          }}
          key={index}
        />
      ))}
      <NewBoard
        createBoard={createBoard}
        isLoading={createBoardResult.isFetching}
      />
    </div>
  );
}

export default withNotification(Page);
