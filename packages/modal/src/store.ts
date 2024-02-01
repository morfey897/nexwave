import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TModalParams = Record<string, string | number | boolean>;

interface IModal {
  name: string;
  params: TModalParams;
}

interface IModalStore {
  modals: Array<IModal>;
  openModal: (name: string, params?: TModalParams) => void;
  closeModal: (name: string) => void;
  closeAllModals: () => void;
}

const useModalStore = create(
  immer<IModalStore>((set) => ({
    modals: [],
    openModal: (name, params) =>
      set((state) => {
        state.modals.push({
          name,
          params,
        });
      }),
    closeModal: (name) =>
      set((state) => {
        const index = state.modals.findIndex((modal) => modal.name === name);
        if (index === -1) return;
        state.modals.splice(index, 1);
      }),
    closeAllModals: () =>
      set((state) => {
        state.modals = [];
      }),
  })),
);

export default useModalStore;
