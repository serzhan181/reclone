import { IMe } from "./../types/index";
import { gqlClient } from "@/src/graphql/setup";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import cookie from "js-cookie";

export const initializeAuthentication = async (me: IMe) => {
  if (me?.authenticated) {
    useAuthStore.setState({ authenticated: true });
    useUserStore.setState({ user: me.user });
  }
};

export const deleteAuthorizationFromClient = async () => {
  cookie.remove(process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string, {
    sameSite: "Lax",
  });
  gqlClient.setHeader("Authorization", "");

  return;
};
