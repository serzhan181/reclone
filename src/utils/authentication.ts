import { AUTH_ME } from "@/src/graphql/api/auth.graphql";
import { gqlClient } from "@/src/graphql/setup";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import cookie from "js-cookie";

export const initializeAuthentication = async () => {
  const token =
    cookie.get(process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string) ||
    "";

  gqlClient.setHeader("Authorization", `Bearer ${token}`);
  const data = await gqlClient.request(AUTH_ME).catch(() => {
    console.log("unauthorized");
  });

  if (data?.me?.authenticated) {
    const { me } = data;
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
