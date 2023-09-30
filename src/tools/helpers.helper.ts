import { Attributes } from "@/app/(privates)/board/[boardId]/types.type";
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

const changePixelToRelativeHOF =
  (panel: { x: number; y: number }) => (value: number, axis: "x" | "y") =>
    value / panel[axis];

const changeRelativeToPixelHOF =
  (panel: { x: number; y: number }) => (value: number, axis: "x" | "y") =>
    panel[axis] * value;

export const changeShapeValues = (
  mode: "relative" | "pixel",
  attributes: Attributes,
  panel: { x: number; y: number },
): Attributes => {
  const changeRelativeToPixel = changeRelativeToPixelHOF(panel);
  const changePixelToRelative = changePixelToRelativeHOF(panel);
  const newAttributes = { ...attributes };

  if (mode === "relative") {
    "x" in newAttributes &&
      (newAttributes.x = changePixelToRelative(newAttributes.x, "x"));

    "y" in newAttributes &&
      (newAttributes.y = changePixelToRelative(newAttributes.y, "y"));

    "length" in newAttributes &&
      (newAttributes.length = changePixelToRelative(newAttributes.length, "x"));

    "x1" in newAttributes &&
      (newAttributes.x1 = changePixelToRelative(newAttributes.x1, "x"));

    "x2" in newAttributes &&
      (newAttributes.x2 = changePixelToRelative(newAttributes.x2, "x"));

    "y1" in newAttributes &&
      (newAttributes.y1 = changePixelToRelative(newAttributes.y1, "y"));

    "y2" in newAttributes &&
      (newAttributes.y2 = changePixelToRelative(newAttributes.y2, "y"));

    "width" in newAttributes &&
      (newAttributes.width = changePixelToRelative(newAttributes.width, "x"));

    "height" in newAttributes &&
      (newAttributes.height = changePixelToRelative(newAttributes.height, "y"));
  }

  if (mode === "pixel") {
    "x" in newAttributes &&
      (newAttributes.x = changeRelativeToPixel(newAttributes.x, "x"));

    "y" in newAttributes &&
      (newAttributes.y = changeRelativeToPixel(newAttributes.y, "y"));

    "length" in newAttributes &&
      (newAttributes.length = changeRelativeToPixel(newAttributes.length, "x"));

    "x1" in newAttributes &&
      (newAttributes.x1 = changeRelativeToPixel(newAttributes.x1, "x"));

    "x2" in newAttributes &&
      (newAttributes.x2 = changeRelativeToPixel(newAttributes.x2, "x"));

    "y1" in newAttributes &&
      (newAttributes.y1 = changeRelativeToPixel(newAttributes.y1, "y"));

    "y2" in newAttributes &&
      (newAttributes.y2 = changeRelativeToPixel(newAttributes.y2, "y"));

    "width" in newAttributes &&
      (newAttributes.width = changeRelativeToPixel(newAttributes.width, "x"));

    "height" in newAttributes &&
      (newAttributes.height = changeRelativeToPixel(newAttributes.height, "y"));
  }

  return newAttributes;
};

export const debouncerHOF = (function () {
  let lastExec = 0;
  return <T>(fn: T, ms: number): T => {
    return ((...args: unknown[]) => {
      const now = Date.now();
      if (now < lastExec + ms) {
        return;
      } else {
        lastExec = now;
      }

      (fn as (...args: unknown[]) => void)(...args);
    }) as T;
  };
})();
