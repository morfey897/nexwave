import * as React from "react";
import styled from "styled-components";
import { ModalState, Blur, type UnionAnimation } from "./types";
import { StyledOverlay } from "@nw/ui";
import { opacity, opacityAnimation } from "./animations";

const ANIMATIONS: Record<UnionAnimation, any> = {
  mounted: opacity("show", "from"),
  show: opacityAnimation("show"),
  hide: opacityAnimation("hide"),
  unmounted: opacity("hide", "to"),
};

const AnimatedOverlay = styled(StyledOverlay)<{
  $blur?: Blur;
  $state?: ModalState;
}>`
  ${(props) => props.$state === ModalState.MOUNTED && ANIMATIONS.mounted}
  ${(props) => props.$state === ModalState.OPEN && ANIMATIONS.show}
  ${(props) => props.$state === ModalState.CLOSING && ANIMATIONS.hide}
  ${(props) => props.$state === ModalState.CLOSED && ANIMATIONS.unmounted}
`;

const Overlay = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    blur?: Blur;
    state: ModalState;
  }
>(function Component({ blur, state, ...props }, ref) {
  return <AnimatedOverlay ref={ref} $blur={blur} $state={state} {...props} />;
});

export default Overlay;
