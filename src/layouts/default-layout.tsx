import { Header } from "@/src/organisms";
import { FC, ReactNode } from "react";

interface IDefaultLayout {
  children: ReactNode;
}

export const DefaultLayout: FC<IDefaultLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-12">{children}</main>
    </>
  );
};
