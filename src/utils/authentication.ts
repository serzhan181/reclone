import {
  GetServerSidePropsContext,
  NextPageContext,
  PreviewData,
} from "next/types";
import { IMe } from "./../types/index";
import { gqlClient } from "@/src/graphql/setup";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import cookie from "js-cookie";
import nookies from "nookies";
import { request } from "../graphql/custom-gql-fns";
import { AUTH_ME } from "../graphql/api/auth.graphql";
import { ParsedUrlQuery } from "querystring";

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

export const setAuthCookie = (token: string) => {
  cookie.set(
    process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string,
    token,
    {
      expires: 30 * 24 * 60 * 60,
    }
  );
};

export const isAuthServer = async (
  ctx: NextPageContext | GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  let authenticated = false;

  const cookie = nookies.get(ctx);
  const token =
    cookie[process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string] || "";

  console.log("TOKEN", token);

  const data = await request(AUTH_ME, {}, token).catch(() => {
    authenticated = false;
  });

  authenticated = data?.me.authenticated;

  return authenticated;
};
