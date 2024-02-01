export enum Position {
  CENTER = "center",
  LEFT = "left",
  RIGHT = "right",
  TOP = "top",
  BOTTOM = "bottom",
}

export type PositionX = Position.LEFT | Position.RIGHT | Position.CENTER;
export type PositionY =
  | Position.TOP
  | Position.BOTTOM
  | Position.CENTER
  | `-${Position.TOP}`
  | `-${Position.BOTTOM}`;
export type LitPosition = Exclude<
  `${PositionX}x${PositionY}`,
  "leftx-top" | "leftx-bottom" | "rightx-top" | "rightx-bottom"
>;
export type UnionAnimation = "show" | "finish" | "hide";

export type TModalParams = Record<string, string | number | boolean>;

export enum ModalState {
  OPENING = "opening",
  OPENED = "opened",
  CLOSING = "closing",
  NONE = "none",
}

export interface IModalWrapper {
  name: string;
  params: TModalParams | undefined;
}

export interface IModal {
  name: string;
  params: TModalParams | undefined;
  state: ModalState;
  closeMe: () => void;
}
