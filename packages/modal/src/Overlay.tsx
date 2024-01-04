import * as React from "react";
import styled, { keyframes, css } from "styled-components";
import { ModalState, OverlayBlur, type UnionAnimation } from "./types";
import {
  DURATION,
  TIMING_FUNCTION,
  opacity,
  opacityAnimation,
} from "./animations";

const BLURS = {
  none: "0",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  xxl: "20px",
  xxxl: "24px",
};

const ANIMATIONS: Record<UnionAnimation, any> = {
  mounted: opacity("show", "from"),
  show: opacityAnimation("show"),
  hide: opacityAnimation("hide"),
  unmounted: opacity("hide", "to"),
};

const StyledOverlay = styled.div<{ $blur?: OverlayBlur; $state?: ModalState }>`
  inset: 0;
  position: fixed;
  background-color: transparent;
  backdrop-filter: ${(props) =>
    `blur(${BLURS[(props.$blur || OverlayBlur.NONE) as keyof typeof BLURS]})`};
  ${(props) => props.$state === ModalState.MOUNTED && ANIMATIONS.mounted}
  ${(props) => props.$state === ModalState.OPEN && ANIMATIONS.show}
  ${(props) => props.$state === ModalState.CLOSING && ANIMATIONS.hide}
  ${(props) => props.$state === ModalState.CLOSED && ANIMATIONS.unmounted}
`;

const Overlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    blur?: OverlayBlur;
    state: ModalState;
  }
>(function Component({ blur, state, ...props }, ref) {
  return <StyledOverlay ref={ref} $blur={blur} $state={state} {...props} />;
});

export default Overlay;
