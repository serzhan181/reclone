import { FC } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Share } from "react-feather";

// TODO: Find a way to replace <img /> to <Image /> (next/image)
// TODO: Find a way to replace bottom sections of the content-card with links (<a>, <Link />)

interface IContentCard {
  title: string;
  imgSrc?: string;
}

export const ContentCard: FC<IContentCard> = ({ title, imgSrc }) => {
  return (
    <div className="flex w-full overflow-hidden rounded border-slate-700">
      <div className="w-full px-3 bg-white">
        <div className="flex justify-between my-2">
          <div>
            <h2 className="text-xl font-semibold cursor-pointer">{title}</h2>
          </div>

          <div className="flex gap-2 text-gray-600 select-none">
            <div className="flex justify-between gap-2">
              <p className="text-sm">69</p>
              <ThumbsUp className="w-4 duration-200 cursor-pointer active:stroke-red-800 hover:stroke-red-400" />
            </div>
            <div className="flex justify-between gap-2">
              <ThumbsDown className="w-4 duration-200 cursor-pointer active:stroke-green-800 hover:stroke-green-400" />
              <p className="text-sm">667</p>
            </div>
          </div>
        </div>

        <div className="w-full ">
          <img
            src={imgSrc}
            alt="hello"
            className="max-h-[460px] min-h-[100px] w-full object-cover"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex gap-1 px-1 py-2 text-sm cursor-pointer select-none hover:bg-gray-300">
            <MessageSquare />
            <p>178 comments</p>
          </div>

          <div className="flex gap-1 px-1 py-2 text-sm cursor-pointer select-none hover:bg-gray-300">
            <Share />
            <p>Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};
