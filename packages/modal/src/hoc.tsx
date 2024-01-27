import * as React from "react";
import {
  IModal,
  IModalWrapper,
  ModalState,
  Blur,
  Position,
  PositionX,
  PositionY,
  LitPosition,
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
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  width: 100vw;
`;

function withModal(
  Component: React.FC<IModal>,
  props?: {
    zIndex?: number;
    noanimation?: boolean;
    position?: Position | [PositionX, PositionY];
    wrapper?: {
      className?: string;
      style?: React.CSSProperties;
    };
    container?: {
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
  const positionX = ((Array.isArray(props?.position)
    ? props?.position[0]
    : props?.position) || Position.CENTER) as PositionX;

  const positionY = ((Array.isArray(props?.position) && props?.position[1]) ||
    Position.CENTER) as PositionY;

  const FinalPosition = `${positionX}x${positionY}` as LitPosition;

  function Wrapper({ name, state, params }: IModalWrapper) {
    const closeModal = useCloseModal();
    const refOverlay = React.useRef(null);

    const closeMe = React.useCallback(() => {
      if (typeof closeModal === "function") {
        closeModal({ name });
      }
    }, [closeModal, name]);

    const onClickOverlay: React.MouseEventHandler = React.useCallback(
      (event) => {
        if (event.target === refOverlay.current) {
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
        role="dialog"
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
          position={FinalPosition}
          noanimation={props?.noanimation}
          state={state}
          className={clsx(props?.container?.className)}
          style={props?.container?.style}
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
