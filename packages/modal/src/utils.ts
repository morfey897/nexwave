import { Position, PositionX, PositionY, LitPosition } from "./types";

export const totalHeight = (element: Element | null | undefined) => {
  if (!element || typeof element.getBoundingClientRect != "function") return 0;
  const rect = element.getBoundingClientRect();
  const height = rect.height;
  const style = window.getComputedStyle(element);
  const totalHeight = ["top", "bottom"]
    .map((side) => Number.parseInt(style["margin-" + side], 10))
    .reduce((total, side) => total + side, height);
  return totalHeight;
};

export const getPosition = (position?: Position | [PositionX, PositionY]) => {
  const positionX = ((Array.isArray(position) ? position[0] : position) ||
    Position.CENTER) as PositionX;

  const positionY = ((Array.isArray(position) && position[1]) ||
    Position.CENTER) as PositionY;

  return `${positionX}x${positionY}` as LitPosition;
};
