import * as React from "react";
import {
  ModalState,
  IModalWrapper,
  IModalAction,
  TModalParams,
  ModalActionType,
} from "./types";
import {
  // decodeParams,
  // isModalByName,
  // pureModalName,
  encodeParams,
  decodeParams,
  filterModals,
} from "./utils";

import styled from "styled-components";

const ProviderWrapper = styled.div`
  position: absolute;
`;

export const Context = React.createContext<{
  action: (action: IModalAction) => void;
  prefix?: string;
} | null>(null);

function Provider({
  id = "modal-provider",
  Components,
  prefix,
  searchParams,
  navigate,
  children,
}: {
  id?: string;
  Components: Record<string, React.FC<IModalWrapper>>;
  prefix: string;
  searchParams: URLSearchParams;
  navigate: (href: string, replace: boolean) => void;
  children: React.ReactNode;
}) {
  const timers = React.useRef<Record<string, NodeJS.Timeout>>({});
  const [modalsList, setList] = React.useState<string[]>([]);
  const [modalProps, setModalProps] = React.useState<
    Record<string, TModalParams>
  >({});
  const [modals, setModals] = React.useState<Record<string, ModalState>>({});

  React.useEffect(() => {
    const newList: Array<string> = [];
    const modalParams: Record<string, TModalParams> = {};

    for (const [key, value] of searchParams.entries()) {
      if (!key.startsWith(prefix)) continue;
      const name = key.replace(prefix, "");
      if (!(name in Components)) continue;
      newList.push(name);
      modalParams[name] = decodeParams(value);
    }
    setList(newList);
    setModalProps((params) => ({ ...params, ...modalParams }));
  }, [searchParams, Components, prefix]);

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
    }, 10);
  }, [modals]);

  // To close state
  React.useEffect(() => {
    clearTimeout(timers.current["close"]);
    timers.current["close"] = setTimeout(() => {
      setModals(filterModals(modals, ModalState.CLOSING, ModalState.CLOSED));
    }, 300);
  }, [modals]);

  // Unmount
  React.useEffect(() => {
    if (Object.values(modals).some((state) => state === ModalState.OPEN)) {
      // document.body.classList.add('overflow-hidden', 'h-screen');
    } else {
      console.log("close");
      // document.body.classList.remove('overflow-hidden', 'h-screen');
    }
    setModals(filterModals(modals, ModalState.CLOSED, null));
  }, [modals]);

  React.useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const onAction = React.useCallback(
    (action: IModalAction) => {
      const { type, payload, replace } = action;
      const clone = new URLSearchParams(searchParams);
      switch (type) {
        case ModalActionType.CLOSE:
          clone.delete(prefix + payload.name);
          break;
        case ModalActionType.OPEN:
          clone.set(
            prefix + payload.name,
            encodeParams(payload.params || null),
          );
          break;
        case ModalActionType.CLOSE_ALL:
          for (const key of clone.keys()) {
            if (key.startsWith(prefix)) {
              clone.delete(key);
            }
          }
          break;
        default:
          return;
      }
      const params = clone.toString();
      const url = `${payload.href || ""}?${params}`;
      navigate(url, replace === true);
    },
    [navigate, searchParams],
  );

  const memoModals = React.useMemo(() => Object.keys(modals), [modals]);

  return (
    <Context.Provider value={{ action: onAction, prefix }}>
      {children}
      <ProviderWrapper id={id}>
        {memoModals.map((name) => {
          const Component = Components[name];
          return !!Component ? (
            <Component
              key={name}
              name={name}
              state={modals[name]}
              params={modalProps[name]}
            />
          ) : null;
        })}
      </ProviderWrapper>
    </Context.Provider>
  );
}

export default Provider;