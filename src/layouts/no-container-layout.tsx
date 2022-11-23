import { Header } from "@/src/organisms";
import { FC, ReactNode } from "react";

interface IDefaultLayout {
  children: ReactNode;
}

export const NoContainerLayout: FC<IDefaultLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-12">
        <div className="w-full">{children}</div>
      </main>
    </>
  );
};
