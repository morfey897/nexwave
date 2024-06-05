export { default as ModalProvider } from './Provider';
export { type IModal, ModalState, Position } from './types';
export { default as withModal } from './hoc';
export { default as Modal } from './Modal';
export {
	useCloseModal,
	useOpenModal,
	useCloseAllModal,
	useModals,
} from './hook';

export { Container, Overlay, ModalWrapper } from './components';
