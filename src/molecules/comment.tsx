import Image from "next/image";
import { FC } from "react";
import { ArrowDown, ArrowUp } from "react-feather";
import { fromNow } from "../utils/fromNow";
import parse from "html-react-parser";

interface IComment {
  username: string;
  createdAt: string;
  body: string;
  userVote: number;
  voteScore: number;
  isOwner: boolean;
  onVote: (value: 1 | 0 | -1) => void;
}

export const Comment: FC<IComment> = ({
  username,
  createdAt,
  body,
  userVote,
  voteScore,
  isOwner,
  onVote,
}) => {
  return (
    <div className="flex flex-col p-1 mb-2 bg-white">
      {/* Comment Meta */}
      <div className="flex items-center gap-2 h-fit">
        <div className="relative w-6 h-6">
          <Image
            alt="avatar"
            src="https://www.gravatar.com/avatar/?d=mp&f=y"
            className="absolute object-cover w-full h-full rounded-full "
            layout="fill"
          />
        </div>
        <div className="flex items-center gap-1 h-fit">
          <div className="flex items-center">
            <h2 className="text-xs">{username}</h2>
          </div>
          <span className="text-slate-500">·</span>
          <p className="text-xs text-slate-400">{fromNow(createdAt)}</p>
          {isOwner && <p className="text-xs font-bold text-red-500">OP</p>}
        </div>
      </div>

      {/* Comment body */}
      <div className="mt-1">
        <div className="text-sm">{parse(body)}</div>
      </div>

      {/* Vote Actions */}
      <div className="mt-1">
        <div className="flex items-center gap-2 text-gray-600 select-none">
          <div
            onClick={() => onVote(1)}
            className={`p-1 rounded-sm cursor-pointer hover:bg-gray-400 ${
              userVote === 1 && "text-green-600"
            }`}
          >
            <ArrowUp size={16} />
          </div>
          <div className="text-xs">{voteScore}</div>
          <div
            onClick={() => onVote(-1)}
            className={`p-1 rounded-sm cursor-pointer hover:bg-gray-400 ${
              userVote === -1 && "text-red-600"
            }`}
          >
            <ArrowDown size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};
