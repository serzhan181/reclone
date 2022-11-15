import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { DefaultLayout } from "@/src/layouts";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next/types";
import { QueryClientProvider } from "react-query";
import { Authenticator } from "@/src/hoc/authenticator";
import nookies from "nookies";
import { gqlClient } from "@/src/graphql/setup";
import { AUTH_ME } from "@/src/graphql/api/auth.graphql";
import { qc } from "@/src/react-query/setup";
import type { IMe } from "@/src/types";

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsCustom = NextPage &
  AppProps & {
    Component: PageWithLayout;
    session: Session;
    me: IMe;
  };

export default function MyApp({
  Component,
  pageProps,
  session,
  me,
}: AppPropsCustom) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={qc}>
        {getLayout(
          <>
            <Authenticator me={me} />
            <Component {...pageProps} />
          </>
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appCtx: AppContext) => {
  const cookie = nookies.get(appCtx.ctx);
  const token =
    cookie[process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string] || "";

  gqlClient.setHeader("Authorization", `Bearer ${token}`);
  const data = await gqlClient.request(AUTH_ME).catch(() => {
    console.log("unauthorized");
  });

  return { me: data?.me || null };
};
