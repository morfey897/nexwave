import * as React from "react";
import {
  IModal,
  IModalWrapper,
  ModalState,
  Blur,
  Position,
} from "./types";
import Overlay from "./Overlay";
import Container from "./Container";
import clsx from "clsx";
import styled from "styled-components";
import { useCloseModal } from "./hook";

const ModalWrapper = styled.section<{
  $state: ModalState;
  $zIndex: number;
}>`
  inset: 0;
  position: fixed;
  display: ${(props) =>
    `${props.$state === ModalState.CLOSED ? "none" : "block"}`};
  z-index: ${(props) => props.$zIndex};
`;

function withModal(
  Component: React.FC<IModal>,
  props?: {
    zIndex?: number;
    position?: Position;
    wrapper?: {
      className?: string;
      style?: React.CSSProperties;
    };
    overlay?: {
      blur?: Blur;
      className?: string;
      style?: React.CSSProperties;
    };
  },
) {
  function Wrapper({ name, state, params }: IModalWrapper) {
    const closeModal = useCloseModal();
    const refOverlay = React.useRef(null);

    const closeMe = React.useCallback(() => {
      if (typeof closeModal === "function") {
        closeModal({ name });
      }
    }, [closeModal, name]);

    const onClickOverlay: React.MouseEventHandler = React.useCallback(
      (e) => {
        if (e.target === refOverlay.current) {
          closeMe();
        }
      },
      [closeMe, refOverlay],
    );

    const onKeyDown = React.useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") closeMe();
      },
      [closeMe],
    );

    React.useEffect(() => {
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
      <ModalWrapper
        $zIndex={props?.zIndex || 30}
        $state={state}
        className={clsx(props?.wrapper?.className)}
        style={props?.wrapper?.style}
      >
        <Overlay
          ref={refOverlay}
          state={state}
          blur={props?.overlay?.blur || Blur.MD}
          style={props?.overlay?.style}
          className={clsx(props?.overlay?.className)}
          onClick={onClickOverlay}
        />
        <Container
          position={props?.position || Position.CENTER}
          state={state}
        >
          <Component
            name={name}
            state={state}
            params={params}
            closeMe={closeMe}
          />
        </Container>
      </ModalWrapper>
    );
  }
  return React.memo(Wrapper);
}

export default withModal;
