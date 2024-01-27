import { Blur, Position } from "@nw/ui";
export { Blur, Position };

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
export type UnionAnimation = "mounted" | "show" | "hide";

export type TModalParams =
  | Record<string, string | number | boolean | null | undefined>
  | string
  | number
  | boolean
  | null;

export enum ModalState {
  MOUNTED = "mounted",
  OPEN = "open",
  CLOSING = "closing",
  CLOSED = "closed",
  NONE = "none",
}

export enum ModalActionType {
  OPEN = "open",
  CLOSE = "close",
  CLOSE_ALL = "close-all",
}

export interface IModalAction {
  type: ModalActionType;
  replace?: boolean;
  payload: {
    name: string;
    params?: TModalParams;
    href?: string;
  };
}

export interface IModalWrapper {
  name: string;
  state: ModalState;
  params: TModalParams;
}

export interface IModal extends IModalWrapper {
  closeMe?: () => void;
}
