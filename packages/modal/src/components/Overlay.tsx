import styled from "styled-components";
import { ModalState } from "../types";
import { ANIMATIONS } from "./Overlay.cfg";

const AnimatedOverlay = styled.div<{
  $state?: ModalState;
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: transparent;
  ${(props) => props.$state === ModalState.MOUNTED && ANIMATIONS.mounted}
  ${(props) => props.$state === ModalState.OPEN && ANIMATIONS.show}
  ${(props) => props.$state === ModalState.CLOSING && ANIMATIONS.hide}
`;

export default AnimatedOverlay;
