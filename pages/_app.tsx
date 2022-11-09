import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultLayout } from "@/src/layouts";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next/types";
import { QueryClient, QueryClientProvider } from "react-query";

export type PageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: PageWithLayout;
  session: Session;
};

const qc = new QueryClient();

export default function MyApp({
  Component,
  pageProps,
  session,
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={qc}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  );
}
