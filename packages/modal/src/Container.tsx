import * as React from "react";
import styled from "styled-components";
import { ModalState, type LitPosition } from "./types";
import { POSITION, ANIMATIONS } from "./Container.cfg";

const StyledContainer = styled.div<{
  $position: LitPosition;
  $state: ModalState;
  $noanimation?: boolean;
}>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  ${({ $noanimation, $position }) =>
    $noanimation === true && POSITION[`${$position}_1`]}
  ${({ $noanimation, $position }) =>
    !$noanimation && POSITION[`${$position}_0`]}
    ${({ $noanimation, $state, $position }) =>
    !$noanimation &&
    $state === ModalState.MOUNTED &&
    ANIMATIONS[$position].mounted}
  ${({ $noanimation, $state, $position }) =>
    !$noanimation && $state === ModalState.OPEN && ANIMATIONS[$position].show}
  ${({ $noanimation, $state, $position }) =>
    !$noanimation &&
    $state === ModalState.CLOSING &&
    ANIMATIONS[$position].hide}
`;

function Container({
  position,
  state,
  noanimation,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  position: LitPosition;
  state: ModalState;
  noanimation?: boolean;
}) {
  return (
    <StyledContainer
      $position={position}
      $state={state}
      $noanimation={noanimation}
      {...props}
    />
  );
}

export default Container;
