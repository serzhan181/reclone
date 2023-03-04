import { create } from "zustand";

interface State {
  authModal: boolean;
}

interface Actions {
  setAuthModal: (value: boolean) => void;
}

export const useModalStore = create<State & Actions>((set) => ({
  authModal: false,
  setAuthModal(value) {
    set((prev) => ({ ...prev, authModal: value }));
  },
}));
