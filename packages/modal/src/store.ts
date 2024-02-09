import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TModalParams, ModalState } from "./types";

interface IModalStore {
  modals: Array<{
    name: string;
    params: TModalParams;
  }>;
  _modalsState: Record<string, ModalState>;
  openModal: (
    name: string,
    params?: TModalParams,
    immediately?: boolean,
  ) => void;
  closeModal: (name: string, immediately?: boolean) => void;
  closeAllModals: (immediately?: boolean) => void;
  finishedAnim: (name: string) => void;
  getModalState: (name: string) => ModalState;
}

const useModalStore = create(
  immer<IModalStore>((set, get) => ({
    modals: [],
    _modalsState: {},
    openModal: (name, params, immediately) =>
      set((state) => {
        if (state.modals.find((modal) => modal.name === name)) return;
        state.modals.push({
          name,
          params,
        });
        state._modalsState[name] = immediately
          ? ModalState.OPENED
          : ModalState.OPENING;
      }),
    closeModal: (name, immediately) =>
      set((state) => {
        if (immediately) {
          const index = state.modals.findIndex((modal) => modal.name === name);
          if (index === -1) return;
          state.modals.splice(index, 1);
        } else {
          state._modalsState[name] = ModalState.CLOSING;
        }
      }),
    closeAllModals: (immediately) =>
      set((state) => {
        if (immediately) {
          state.modals = [];
          state._modalsState = {};
        } else {
          state.modals.forEach((modal) => {
            state._modalsState[modal.name] = ModalState.CLOSING;
          });
        }
      }),

    finishedAnim: (name) => {
      set((state) => {
        const prevState = state._modalsState[name];
        if (prevState === ModalState.OPENING) {
          state._modalsState[name] = ModalState.OPENED;
        } else if (prevState === ModalState.CLOSING) {
          const index = state.modals.findIndex((modal) => modal.name === name);
          if (index === -1) return;
          state.modals.splice(index, 1);
        }
      });
    },

    getModalState: (name) => get()._modalsState[name] || ModalState.NONE,
  })),
);

export default useModalStore;
