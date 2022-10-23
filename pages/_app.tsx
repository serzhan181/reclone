import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultLayout } from "@/src/layouts";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SessionProvider>
  );
}
