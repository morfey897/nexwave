import * as React from "react";
import {
  Position,
  PositionX,
  PositionY,
  ModalState,
  SetOfAnimParams,
} from "./types";
import clsx from "clsx";
import { ModalWrapper, Container, Overlay } from "./components";
import throttle from "./throttle";
import { totalHeight, getPosition } from "./utils";

type TModal = {
  noCancelByOverlay?: boolean;
  position?: Position | [PositionX, PositionY];
  animParams?: SetOfAnimParams;
  container?: {
    className?: string;
    style?: React.CSSProperties;
  };
  overlay?: {
    className?: string;
    style?: React.CSSProperties;
  };
  onCloseModal?: () => void;
  onFinishedAnimation?: () => void;
  state?: ModalState;
};

function Modal({
  state,
  position,
  noCancelByOverlay,
  animParams,
  container,
  overlay,
  onCloseModal,
  onFinishedAnimation,
  children,
  ...props
}: TModal & React.HTMLProps<HTMLDivElement>) {
  const FinalPosition = getPosition(position);

  const refOverlay = React.useRef(null);
  const refContainer = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  /**
   * Close the current modal
   */
  const closeMe = React.useCallback(() => {
    typeof onCloseModal === "function" && onCloseModal();
  }, [onCloseModal]);

  /**
   * Close the current modal by clicking on the overlay
   */
  const onClickOverlay: React.MouseEventHandler = React.useCallback(
    (event) => {
      if (event.target === refOverlay.current && !noCancelByOverlay) {
        closeMe();
      }
    },
    [closeMe, refOverlay, noCancelByOverlay],
  );

  /**
   * Close the current modal by pressing the ESC key
   */
  const onKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !noCancelByOverlay) closeMe();
    },
    [closeMe, noCancelByOverlay],
  );

  const onAnimEnd = React.useCallback(() => {
    typeof onFinishedAnimation === "function" && onFinishedAnimation();
  }, [onFinishedAnimation]);

  const onChangeSize = React.useMemo(
    () =>
      throttle(() => {
        const element = refContainer.current as HTMLElement;
        if (!element) return;
        const height = totalHeight(element);
        setHeight(height);
      }, 200),
    [],
  );

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  React.useEffect(() => {
    const element = refContainer.current as HTMLElement;
    if (!element || state != ModalState.OPENED) return;
    const height = totalHeight(element);
    setHeight(height);
  }, [state]);

  React.useEffect(() => {
    window.addEventListener("resize", onChangeSize);
    return () => window.removeEventListener("resize", onChangeSize);
  }, [onChangeSize]);

  return (
    <ModalWrapper onScroll={onChangeSize} {...props}>
      <Overlay
        ref={refOverlay}
        $state={state}
        className={clsx(overlay?.className)}
        onClick={onClickOverlay}
        style={{
          ...overlay?.style,
          height: `${height}px`,
        }}
      />
      <Container
        $position={FinalPosition}
        $state={state}
        $animParams={animParams}
        className={clsx(container?.className)}
        style={container?.style}
        role="dialog"
        ref={refContainer}
        onAnimationEnd={onAnimEnd}
      >
        {children}
      </Container>
    </ModalWrapper>
  );
}

export default Modal;
