import * as React from "react";
import { ModalState, IModalWrapper, TModalParams } from "./types";
import { filterModals } from "./utils";
import { DURATION_MS } from "./config";
import useModalStore from "./store";
import { ProviderWrapper } from "./components";

function Provider({
  Components,
  ...props
}: {
  Components: Record<string, React.FC<IModalWrapper>>;
} & React.HTMLAttributes<HTMLDivElement>) {
  const listOfModals = useModalStore((state) => state.modals);
  const timers = React.useRef<Record<string, NodeJS.Timeout>>({});
  const [modalsList, setModalList] = React.useState<string[]>([]);
  const [modalProps, setModalProps] = React.useState<
    Record<string, TModalParams>
  >({});
  const [modals, setModals] = React.useState<Record<string, ModalState>>({});

  //Prepare modal list and params
  React.useEffect(() => {
    const newList: Array<string> = [];
    const modalParams: Record<string, TModalParams> = {};

    for (const [name, value] of Object.entries(listOfModals)) {
      if (!(name in Components)) continue;
      newList.push(name);
      modalParams[name] = value;
    }
    setModalList((prev) => [...new Set([...prev, ...newList])]);
    setModalProps((params) => ({ ...params, ...modalParams }));
  }, [listOfModals, Components]);

  // Initialize mounting and closing state
  React.useEffect(() => {
    setModals((modals) =>
      [...new Set([...modalsList, ...Object.keys(modals)])].reduce(
        (acc, name) => {
          const state = modals[name];
          const hasList = modalsList.includes(name);
          const hasModals =
            state === ModalState.MOUNTED || state === ModalState.OPEN;
          if (hasList && !hasModals) {
            acc = {
              ...acc,
              [name]: ModalState.MOUNTED,
            };
          } else if (!hasList && hasModals) {
            acc = {
              ...acc,
              [name]: ModalState.CLOSING,
            };
          }
          return acc;
        },
        modals,
      ),
    );
  }, [modalsList]);

  // To open state
  React.useEffect(() => {
    clearTimeout(timers.current["open"]);
    timers.current["open"] = setTimeout(() => {
      setModals(filterModals(modals, ModalState.MOUNTED, ModalState.OPEN));
    }, 100);
  }, [modals]);

  // To close state
  React.useEffect(() => {
    clearTimeout(timers.current["close"]);
    timers.current["close"] = setTimeout(() => {
      setModals(filterModals(modals, ModalState.CLOSING, ModalState.CLOSED));
    }, DURATION_MS);
  }, [modals]);

  // Unmounting
  React.useEffect(() => {
    if (Object.values(modals).some((state) => state === ModalState.OPEN)) {
      document.body.style.cssText = `overflow: hidden;`;
    } else {
      document.body.style.cssText = ``;
    }
    setModals(filterModals(modals, ModalState.CLOSED, null));
  }, [modals]);

  // Clean up all timers
  React.useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const memoChildren = React.useMemo(() => {
    return Object.entries(modals).map(([name, state]) => {
      const Component = Components[name];
      const params = modalProps[name];
      return Component ? (
        <Component key={name} name={name} state={state} params={params} />
      ) : null;
    });
  }, [modals, Components, modalProps]);

  return <ProviderWrapper {...props}>{memoChildren}</ProviderWrapper>;
}

export default Provider;
