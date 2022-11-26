import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { DefaultLayout } from "@/src/layouts";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next/types";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Authenticator } from "@/src/hoc/authenticator";
import nookies from "nookies";
import { gqlClient } from "@/src/graphql/setup";
import { AUTH_ME } from "@/src/graphql/api/auth.graphql";
import { qc } from "@/src/react-query/setup";
import type { IMe } from "@/src/types";
import { Toaster } from "react-hot-toast";

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsCustom = NextPage &
  AppProps & {
    Component: PageWithLayout;
    me: IMe;
  };

export default function MyApp({ Component, pageProps, me }: AppPropsCustom) {
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={qc}>
      {getLayout(
        <>
          <Component {...pageProps} />
        </>
      )}
      <Authenticator me={me} />
      <Toaster />

      {/* Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
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
