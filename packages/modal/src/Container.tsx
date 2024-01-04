import * as React from "react";
import styled from "styled-components";
import { Position, ModalState, type UnionAnimation } from "./types";
import { move, moveAnimation, opacity, opacityAnimation } from "./animations";
import { StyledContainer } from "@nw/ui";

const ANIMATIONS: Record<UnionAnimation, Record<Position, any>> = {
  mounted: {
    [Position.LEFT]: move("X", "0", "show", "from"),
    [Position.RIGHT]: move("X", "1", "show", "from"),
    [Position.TOP]: move("X", "0", "show", "from"),
    [Position.BOTTOM]: move("X", "1", "show", "from"),
    [Position.CENTER]: opacity("show", "from"),
  },
  show: {
    [Position.LEFT]: moveAnimation("X", "0", "show"),
    [Position.RIGHT]: moveAnimation("X", "1", "show"),
    [Position.TOP]: moveAnimation("Y", "0", "show"),
    [Position.BOTTOM]: moveAnimation("Y", "1", "show"),
    [Position.CENTER]: opacityAnimation("show"),
  },
  hide: {
    [Position.LEFT]: moveAnimation("X", "0", "hide"),
    [Position.RIGHT]: moveAnimation("X", "1", "hide"),
    [Position.TOP]: moveAnimation("Y", "0", "hide"),
    [Position.BOTTOM]: moveAnimation("Y", "1", "hide"),
    [Position.CENTER]: opacityAnimation("hide"),
  },
  unmounted: {
    [Position.LEFT]: move("X", "0", "hide", "to"),
    [Position.RIGHT]: move("X", "1", "hide", "to"),
    [Position.TOP]: move("X", "0", "hide", "to"),
    [Position.BOTTOM]: move("X", "1", "hide", "to"),
    [Position.CENTER]: opacity("hide", "to"),
  },
};

const AnimatedContainer = styled(StyledContainer)<{
  $position: Position;
  $state: ModalState;
}>`
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
  position: Position;
  state: ModalState;
}) {
  return <AnimatedContainer $position={position} $state={state} {...props} />;
}

export default Container;
