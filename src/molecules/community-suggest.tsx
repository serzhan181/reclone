import { Button, SubscribeButton } from "@/src/atoms";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ICommunitySuggest {
  avatarUrl: string;
  name: string;
  isSubscribed: boolean;
  queryIds: string | string[];
}

export const CommunitySuggest: FC<ICommunitySuggest> = ({
  avatarUrl,
  name,
  isSubscribed,
  queryIds,
}) => {
  return (
    <div className="flex w-full h-12 overflow-hidden cursor-pointer flex-center">
      <div className="flex items-center justify-between w-full h-full m-2">
        <div className="relative flex w-8 h-8 bg-gray-200 rounded-full flex-center">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              className="rounded-full"
              alt="Avatar"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <span>{name[0].toUpperCase()}</span>
          )}
        </div>
        <div className="flex">
          <Link
            href={`${process.env.NEXT_PUBLIC_URL}/r/${name}`}
            target="_blank"
          >
            <p className="text-sm font-semibold tracking-wide">/r/{name}</p>
          </Link>
        </div>
        <div>
          <SubscribeButton
            isSubscribed={isSubscribed}
            queryIds={queryIds}
            subName={name}
            size="s"
          />
        </div>
      </div>
    </div>
  );
};
