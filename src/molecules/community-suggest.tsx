import { Button } from "@/src/atoms";
import Image from "next/image";
import { FC } from "react";

interface ICommunitySuggest {
  avatarUrl: string;
  title: string;
}

export const CommunitySuggest: FC<ICommunitySuggest> = ({
  avatarUrl,
  title,
}) => {
  return (
    <div className="flex w-full h-12 overflow-hidden flex-center">
      <div className="flex items-center justify-between w-full h-full m-2">
        <div className="flex">
          <Image
            src={avatarUrl}
            className="rounded-full"
            alt="Avatar"
            width={32}
            height={32}
            objectFit="cover"
          />
        </div>
        <div className="flex">
          <p className="text-sm font-semibold tracking-wide">/{title}</p>
        </div>
        <div>
          <Button rounded size="s">
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};
