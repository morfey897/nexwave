import * as React from "react";
import styled, { type RuleSet } from "styled-components";
import { ModalState, Blur, type UnionAnimation } from "./types";
import { StyledOverlay } from "@nw/ui";
import { opacity, opacityAnim } from "./animations";

const ANIMATIONS: Record<UnionAnimation, RuleSet | string> = {
  mounted: opacity("0.3"),
  show: opacityAnim(["0.3", "1"]),
  hide: opacityAnim(["1", "0.3"]),
};

const AnimatedOverlay = styled(StyledOverlay)<{
  $blur?: Blur;
  $state?: ModalState;
}>`
  ${(props) => props.$state === ModalState.MOUNTED && ANIMATIONS.mounted}
  ${(props) => props.$state === ModalState.OPEN && ANIMATIONS.show}
  ${(props) => props.$state === ModalState.CLOSING && ANIMATIONS.hide}
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
