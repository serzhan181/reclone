import { Header } from "@/src/organisms";
import { FC, ReactNode } from "react";

interface IDefaultLayout {
  children: ReactNode;
}

export const DefaultLayout: FC<IDefaultLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-12">
        <div className="flex pt-2 flex-center">
          <div className="container flex gap-2 overflow-hidden">{children}</div>
        </div>
      </main>
    </>
  );
};
