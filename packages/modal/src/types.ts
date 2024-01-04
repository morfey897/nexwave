export { Blur, Position } from "@nw/ui";

export type UnionAnimation = "mounted" | "show" | "hide" | "unmounted";

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
