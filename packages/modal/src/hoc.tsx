import * as React from "react";
import {
  IModal,
  IModalWrapper,
  Position,
  PositionX,
  PositionY,
  LitPosition,
} from "./types";
import clsx from "clsx";
import { useCloseModal } from "./hook";
import { ModalWrapper, Container, Overlay } from "./components";
import throttle from "./throttle";
import { totalHeight } from "./utils";

function withModal(
  Component: React.FC<IModal>,
  props?: {
    noCancelByOverlay?: boolean;
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
    const refContainer = React.useRef(null);
    const [height, setHeight] = React.useState(0);

    /**
     * Close the current modal
     */
    const closeMe = React.useCallback(() => {
      closeModal(name);
    }, [closeModal, name]);

    /**
     * Close the current modal by clicking on the overlay
     */
    const onClickOverlay: React.MouseEventHandler = React.useCallback(
      (event) => {
        if (event.target === refOverlay.current && !props.noCancelByOverlay) {
          closeMe();
        }
      },
      [closeMe, refOverlay],
    );

    /**
     * Close the current modal by pressing the ESC key
     */
    const onKeyDown = React.useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape" && !props.noCancelByOverlay) closeMe();
      },
      [closeMe],
    );

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
      if (!element) return;
      const height = totalHeight(element);
      setHeight(height);
    }, [state]);

    React.useEffect(() => {
      window.addEventListener("resize", onChangeSize);
      return () => window.removeEventListener("resize", onChangeSize);
    }, [onChangeSize]);

    return (
      <ModalWrapper
        $state={state}
        className={clsx(props?.wrapper?.className)}
        style={props?.wrapper?.style}
        onScroll={onChangeSize}
      >
        <Overlay
          ref={refOverlay}
          $state={state}
          className={clsx(props?.overlay?.className)}
          onClick={onClickOverlay}
          style={{
            ...props?.overlay?.style,
            height: `${height}px`,
          }}
        />
        <Container
          $position={FinalPosition}
          $noanimation={props?.noanimation}
          $state={state}
          className={clsx(props?.container?.className)}
          style={props?.container?.style}
          role="dialog"
          ref={refContainer}
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
