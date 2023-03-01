import { IUser } from "./../types/index";
import { create } from "zustand";

interface State {
  user: IUser | null;
}

interface Actions {
  setUser: (data: IUser) => void;
}

export const useUserStore = create<State & Actions>((set) => ({
  user: null,
  setUser(data) {
    set((state) => ({ ...state, user: data }));
  },
}));
