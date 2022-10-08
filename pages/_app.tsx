import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultLayout } from "@/src/layouts";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}
