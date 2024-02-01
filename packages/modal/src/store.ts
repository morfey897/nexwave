import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TModalParams = Record<string, string | number | boolean>;

interface IModalStore {
  modals: Record<string, TModalParams>;
  openModal: (name: string, params?: TModalParams) => void;
  closeModal: (name: string) => void;
  closeAllModals: () => void;
}

const useModalStore = create(
  immer<IModalStore>((set) => ({
    modals: {},
    openModal: (name, params) =>
      set((state) => {
        state.modals[name] = params;
      }),
    closeModal: (name) =>
      set((state) => {
        delete state.modals[name];
      }),
    closeAllModals: () =>
      set((state) => {
        state.modals = {};
      }),
  })),
);

export default useModalStore;
