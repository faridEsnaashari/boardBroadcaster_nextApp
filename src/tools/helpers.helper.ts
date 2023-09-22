import { BoardColor } from "@/common/types/entities.type";

export const getElementValueById = (id: string): string | undefined => {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  return (element as HTMLInputElement).value;
};

export const getRandomBoardColor = (): BoardColor => {
  const randomNumber = getRandomNumber(0, 3);

  return Object.values(BoardColor).find(
    (color, index) => index === randomNumber,
  )!;
};

const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;
