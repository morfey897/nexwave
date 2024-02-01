import styled from "styled-components";
import { ModalState, type LitPosition } from "../types";
import { POSITION, ANIMATIONS } from "./Container.cfg";

const StyledContainer = styled.div<{
  $position: LitPosition;
  $state: ModalState;
}>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  ${({ $position }) => POSITION[`${$position}_0`]}
  ${({ $state, $position }) =>
    $state === ModalState.OPENING && ANIMATIONS[$position].show}
  ${({ $state, $position }) =>
    $state === ModalState.OPENED && ANIMATIONS[$position].finish}
  ${({ $state, $position }) =>
    $state === ModalState.CLOSING && ANIMATIONS[$position].hide}
`;

export default StyledContainer;
