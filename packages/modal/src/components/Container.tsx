import styled from "styled-components";
import { ModalState, type LitPosition } from "../types";
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

export default StyledContainer;
