import { toast } from "react-hot-toast";
import { authRequest } from "@/src/graphql/requests/auth.requests";
import { AuthenticationMeta } from "./../types/index";
import { setAuthCookie } from "@/src/utils/authentication";
import { useUserStore } from "@/src/store/user.store";
import create from "zustand";
import { deleteAuthorizationFromClient } from "../utils/authentication";

interface AuthState {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  setAuthData: (data: AuthenticationMeta) => Promise<any> | void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authenticated: false,
  setAuthenticated(authenticated) {
    set((state) => ({ ...state, authenticated }));
  },

  async setAuthData(data) {
    setAuthCookie(data.access_token);

    this.setAuthenticated(true);
    useUserStore.getState().setUser(data.user);
  },

  async logout() {
    console.log("IN LOGOUT");
    // delete cookies, remove headers
    deleteAuthorizationFromClient();

    const userIs = await authRequest.me();
    if (userIs === "Unauthorized") {
      this.setAuthenticated(false);
      useUserStore.setState({});

      return true;

      toast.success("You logged out!");
    }
    return false;
  },
}));
