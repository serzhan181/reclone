import { FC } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Share } from "react-feather";
import Image from "next/image";
import { IPostMinimal } from "../types";
import { fromNow } from "@/src/utils/fromNow";

export const ContentCard: FC<IPostMinimal> = ({
  title,
  postImgUrn,
  createdAt,
  user: { username },
}) => {
  return (
    <div className="w-full p-2 text-black bg-white rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <div className="relative w-8 h-8">
            <Image
              alt="avatar"
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              className="absolute object-cover w-full h-full rounded-full "
              layout="fill"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="text-sm">community</h2>
              <div className="text-xs text-slate-400">posted by {username}</div>
            </div>
            <p className="text-xs text-slate-400">{fromNow(createdAt)}</p>
          </div>
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

      {/* Content */}
      <div className="flex flex-col gap-2 pt-2">
        <div>
          <p className="text-black ">{title}</p>
        </div>

        <div>
          {postImgUrn && (
            <div className="w-full h-[460px] relative">
              <Image
                src={process.env.NEXT_PUBLIC_STATIC_SERVE_ENDPOINT + postImgUrn}
                alt="hello"
                layout="fill"
                className="absolute object-contain w-full h-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex pt-2">
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
