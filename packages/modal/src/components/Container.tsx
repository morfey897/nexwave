import styled from "styled-components";
import { ModalState, type LitPosition } from "../types";
import { POSITION, buildAnimation } from "./Container.cfg";
import { type SetOfAnimParams } from "../types";

const StyledContainer = styled.div<{
  $position: LitPosition;
  $state: ModalState;
  $animParams?: SetOfAnimParams;
}>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  ${({ $position }) => POSITION[`${$position}_0`]}
  ${({ $state, $position, $animParams }) =>
    $state === ModalState.OPENING &&
    buildAnimation($position, "show", $animParams)}
  ${({ $state, $position, $animParams }) =>
    $state === ModalState.OPENED &&
    buildAnimation($position, "finish", $animParams)}
  ${({ $state, $position, $animParams }) =>
    $state === ModalState.CLOSING &&
    buildAnimation($position, "hide", $animParams)}
`;

export default StyledContainer;
