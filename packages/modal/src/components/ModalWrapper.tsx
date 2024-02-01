import styled from "styled-components";
import { ModalState } from "../types";

const ModalWrapper = styled.section<{
  $state: ModalState;
}>`
  inset: 0;
  position: fixed;
  display: ${(props) =>
    `${props.$state === ModalState.CLOSED ? "none" : "block"}`};
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
  width: 100vw;
`;

export default ModalWrapper;
