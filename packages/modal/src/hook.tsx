import * as React from "react";
import { Context } from "./Provider";
import { TModalParams, ModalActionType } from "./types";

type IAction = {
  name: string;
  params?: TModalParams;
  href?: string;
  replace?: boolean;
};

export function useActionModal() {
  const context = React.useContext(Context);
  if (context === null) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context.action;
}

export function useOpenModal() {
  const action = useActionModal();
  const open = React.useCallback(
    (param: IAction) => {
      if (typeof action === "function") {
        action({
          type: ModalActionType.OPEN,
          replace: param.replace,
          payload: {
            name: param.name,
            params: param.params,
            href: param.href,
          },
        });
      }
    },
    [action],
  );

  return open;
}

export function useCloseModal() {
  const action = useActionModal();
  const close = React.useCallback(
    (param: Omit<IAction, "params">) => {
      if (typeof action === "function") {
        action({
          type: ModalActionType.CLOSE,
          replace: param.replace,
          payload: {
            name: param.name,
            href: param.href,
          },
        });
      }
    },
    [action],
  );

  return close;
}
