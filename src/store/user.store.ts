import create from "zustand";
import produce from "immer";
import { IUser } from "@/src/types";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) =>
    set(
      produce((state: UserState) => {
        state.user = user;
      })
    ),
}));
