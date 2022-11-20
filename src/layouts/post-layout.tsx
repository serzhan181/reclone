import { Header } from "@/src/organisms";
import { FC, ReactNode } from "react";
import Image from "next/image";

interface IDefaultLayout {
  children: ReactNode;
}

const imgsrc =
  "https://styles.redditmedia.com/t5_2s30g/styles/bannerBackgroundImage_zjbes4zarmd01.png?width=4000&s=9a78c4d3789062c4df2d41b6b24d80d87b82ad81";

const pp = "https://www.gravatar.com/avatar/?d=mp&f=y";

export const PostLayout: FC<IDefaultLayout> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-10">
        <div className="flex flex-col w-full h-screen pt-2 flex-center">
          {/* Community info */}
          <div className="relative flex items-center w-full h-24 ">
            <Image
              src={imgsrc}
              layout="fill"
              alt="spider"
              className="absolute top-0 bottom-0 left-0 right-0 object-cover h-full -z-10"
            />
            <div className="z-0 flex items-center w-full gap-2 mx-10 text-white cursor-pointer h-fit">
              <Image
                src={pp}
                height={(8 * 16) / 3}
                width={(8 * 16) / 3}
                alt="pp"
                className="object-cover rounded-full"
              />
              <span className="font-bold cursor-pointer">AskCommunity</span>
            </div>
          </div>

          <div className="flex-grow w-full bg-slate-300">
            <div className="container flex overflow-hidden">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};
