import { create } from "zustand";

interface IMessage {
  id: string;
  createdAt: string;
  username: string;
  userImg: string | null | undefined;
  body: string;
}

interface State {
  messages: IMessage[] | null;
}

interface Actions {
  addComment: (message: IMessage) => void;
}

export const useLocalComments = create<State & Actions>((set) => ({
  messages: null,
  addComment(message) {
    set((state) => ({
      ...state,
      messages: [message, ...(state.messages || [])],
    }));
  },
}));
