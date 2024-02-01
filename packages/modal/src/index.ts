export { default as ModalProvider } from "./Provider";
export {
  type IModal,
  type IModalAction,
  ModalActionType,
  Position,
} from "./types";
export { default as withModal } from "./hoc";
export { useCloseModal, useOpenModal, useCloseAllModal } from "./hook";
