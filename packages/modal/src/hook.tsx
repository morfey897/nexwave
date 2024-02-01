import useModalStore from "./store";

export function useOpenModal() {
  const openModal = useModalStore((state) => state.openModal);
  return openModal;
}

export function useCloseModal() {
  const closeModal = useModalStore((state) => state.closeModal);
  return closeModal;
}

export function useCloseAllModal() {
  const closeAllModals = useModalStore((state) => state.closeAllModals);
  return closeAllModals;
}
