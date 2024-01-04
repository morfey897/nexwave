import * as React from "react";
import styled, { css } from "styled-components";
import { ModalPosition, ModalState, type UnionAnimation } from "./types";
import {
  move,
  moveAnimation,
  opacity,
  opacityAnimation,
  DURATION,
  TIMING_FUNCTION,
} from "./animations";

const ANIMATIONS: Record<UnionAnimation, Record<ModalPosition, any>> = {
  mounted: {
    [ModalPosition.LEFT]: move("X", "0", "show", "from"),
    [ModalPosition.RIGHT]: move("X", "1", "show", "from"),
    [ModalPosition.TOP]: move("X", "0", "show", "from"),
    [ModalPosition.BOTTOM]: move("X", "1", "show", "from"),
    [ModalPosition.CENTER]: opacity("show", "from"),
  },
  show: {
    [ModalPosition.LEFT]: moveAnimation("X", "0", "show"),
    [ModalPosition.RIGHT]: moveAnimation("X", "1", "show"),
    [ModalPosition.TOP]: moveAnimation("Y", "0", "show"),
    [ModalPosition.BOTTOM]: moveAnimation("Y", "1", "show"),
    [ModalPosition.CENTER]: opacityAnimation("show"),
  },
  hide: {
    [ModalPosition.LEFT]: moveAnimation("X", "0", "hide"),
    [ModalPosition.RIGHT]: moveAnimation("X", "1", "hide"),
    [ModalPosition.TOP]: moveAnimation("Y", "0", "hide"),
    [ModalPosition.BOTTOM]: moveAnimation("Y", "1", "hide"),
    [ModalPosition.CENTER]: opacityAnimation("hide"),
  },
  unmounted: {
    [ModalPosition.LEFT]: move("X", "0", "hide", "to"),
    [ModalPosition.RIGHT]: move("X", "1", "hide", "to"),
    [ModalPosition.TOP]: move("X", "0", "hide", "to"),
    [ModalPosition.BOTTOM]: move("X", "1", "hide", "to"),
    [ModalPosition.CENTER]: opacity("hide", "to"),
  },
};

const StyledContainer = styled.div<{
  $position: ModalPosition;
  $state: ModalState;
}>`
  position: absolute;
  ${(props) =>
    props.$position === ModalPosition.CENTER &&
    "top: 50%; left: 50%; transform: translate(-50%, -50%);"}
  ${(props) =>
    props.$position === ModalPosition.RIGHT && "right: 0; top: 0; bottom: 0;"}
  ${(props) =>
    props.$position === ModalPosition.LEFT && "left: 0; top: 0; bottom: 0;"}
  ${(props) =>
    props.$position === ModalPosition.TOP && "left: 0; right:0; top: 0;"}
  ${(props) =>
    props.$position === ModalPosition.BOTTOM && "left: 0; right:0; bottom: 0;"}

  /*Animations*/ 
  ${(props) =>
    props.$state === ModalState.MOUNTED && ANIMATIONS.mounted[props.$position]}
  ${(props) =>
    props.$state === ModalState.OPEN && ANIMATIONS.show[props.$position]}
  ${(props) =>
    props.$state === ModalState.CLOSING && ANIMATIONS.hide[props.$position]}
    ${(props) =>
    props.$state === ModalState.CLOSED && ANIMATIONS.unmounted[props.$position]}
`;

function Container({
  position,
  state,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  position?: ModalPosition;
  state: ModalState;
}) {
  return <StyledContainer $position={position} $state={state} {...props} />;
}

export default Container;
