"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const qc = new QueryClient();

export const RQProvider = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};
