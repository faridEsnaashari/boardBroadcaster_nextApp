import { BoardColor } from "@/common/types/entities.type";
import { StaticImageData } from "next/image";

export type NewBoardProps = {
  isLoading: boolean;
  createBoard: (name: string) => void;
};

export type BoardCardProps = {
  boardColor: BoardColor;
  deleted: boolean;
  name: string;
  copyPresenterUrl: () => void;
  copyParticipantUrl: () => void;
  id: string;
  done: {
    presenterUrlCopiedSignal: string;
    participantUrlCopiedSignal: string;
  };
  isLoading: {
    rename: boolean;
    delete: boolean;
  };
  updateBoard: (name: string) => void;
  deleteBoard: () => void;
};

export type ActionProps = {
  icon: StaticImageData;
  color: BoardColor;
  done?: boolean;
  tooltipText: string;
  isLoading?: boolean;
};
