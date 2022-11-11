import { AUTH_ME } from "@/src/graphql/api/auth.graphql";
import { UserSignUp } from "./../types/index";
import { authenticateClient } from "@/src/utils/authenticate-client";
import { useUserStore } from "@/src/store/user.store";
import { LOGIN, SIGN_UP } from "@/src/graphql/api/auth.graphql";
import create from "zustand";
import { UserLogin } from "../types";
import { request } from "@/src/graphql/custom-gql-fns";
import { deleteAuthorizationFromClient } from "../utils/authentication";

interface AuthState {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  me: () => Promise<any>;
  login: (dto: UserLogin) => Promise<any> | void;
  signup: (dto: UserSignUp) => Promise<any> | void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  authenticated: false,
  setAuthenticated(authenticated) {
    set((state) => ({ ...state, authenticated }));
  },

  async me() {
    const data = await request(AUTH_ME, {}).catch((err) => err);
    return data;
  },

  async login(dto) {
    try {
      const data = await request(LOGIN, { login: dto });

      authenticateClient(data.login.access_token);

      this.setAuthenticated(true);
      useUserStore.getState().setUser(data.login.user);
    } catch (err) {
      console.log("err", err);
      return err;
    }
  },

  async signup(dto) {
    try {
      const data = await request(SIGN_UP, { sign_up: dto });

      authenticateClient(data.signUp.access_token);

      this.setAuthenticated(true);
      useUserStore.getState().setUser(data.signUp.user);
    } catch (err: any) {
      console.log(err);
      return err;
    }
  },

  async logout() {
    console.log("IN LOGOUT");
    const before = await this.me();
    // delete cookies, remove headers
    deleteAuthorizationFromClient();

    const userIs = await this.me();
    if (userIs === "Unauthorized") {
      this.setAuthenticated(false);
      useUserStore.setState({});

      return true;
    }
    return false;
  },
}));
