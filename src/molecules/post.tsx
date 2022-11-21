import { FC } from "react";
import {
  MessageSquare,
  Share,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "react-feather";
import Image from "next/image";
import { GetPost } from "../types";
import { fromNow } from "@/src/utils/fromNow";
import Link from "next/link";
import { copyToClipboard } from "../utils/copyToClipboard";
import parse from "html-react-parser";

interface IPost {
  isOwner: boolean;
  onDeletePost: (postId: number) => void;
  onVotePost: (value: -1 | 0 | 1) => void;
  body?: string;
}

export const Post: FC<IPost & GetPost> = ({
  title,
  createdAt,
  user: { username },
  isOwner,
  onDeletePost,
  commentCount,
  subName,
  voteScore,
  userVote,
  slug,
  identifier,
  onVotePost,
  id,

  subImgUrl,
  postImgUrl,

  body,
}) => {
  return (
    <div className="w-full px-2 text-black bg-white rounded-sm">
      <div className="flex justify-between mt-2">
        <PostMeta
          subImgUrl={subImgUrl}
          createdAt={createdAt}
          subName={subName}
          username={username}
        />
        <VoteActions
          onVotePost={onVotePost}
          userVote={userVote}
          voteScore={voteScore}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 pt-2 cursor-pointer">
        <div>
          <Link href={`/r/${subName}/${identifier}/${slug}`}>
            <p className="font-semibold text-black">{title}</p>
          </Link>

          {body && <div className="mt-2 text-sm">{parse(body)}</div>}
        </div>

        <div>
          {postImgUrl && (
            <div className="w-full h-[460px] relative">
              <Image
                src={postImgUrl}
                alt="hello"
                layout="fill"
                className="absolute object-contain w-full h-full"
              />
            </div>
          )}
        </div>
      </div>

      <Actions
        commentCount={commentCount}
        isOwner={isOwner}
        postId={id}
        onDeletePost={onDeletePost}
        linkToPost={`${process.env.NEXT_PUBLIC_URL}/r/${subName}/${identifier}/${slug}`}
      />
    </div>
  );
};

interface IPostMeta {
  subName: string;
  username: string;
  createdAt: string;
  subImgUrl: string;
}

interface IVoteActions {
  userVote: number;
  voteScore: number;
  onVotePost: (value: -1 | 0 | 1) => void;
}

interface IActions {
  commentCount: number;
  isOwner: boolean;
  postId: number;
  onDeletePost: (postId: number) => void;
  linkToPost: string;
}

function PostMeta({ subName, username, createdAt, subImgUrl }: IPostMeta) {
  return (
    <div className="flex gap-3 h-fit">
      <div className="relative w-8 h-8">
        <Image
          alt="avatar"
          src={subImgUrl}
          className="absolute object-cover w-full h-full rounded-full "
          layout="fill"
        />
      </div>
      <div className="flex flex-col justify-between h-fit">
        <div className="flex items-center space-x-2">
          <Link href={`/r/${subName}`}>
            <h2 className="text-sm cursor-pointer hover:underline">
              r/{subName}
            </h2>
          </Link>
          <div className="text-xs text-slate-400">posted by {username}</div>
        </div>
        <p className="text-xs text-slate-400">{fromNow(createdAt)}</p>
      </div>
    </div>
  );
}

function VoteActions({ userVote, voteScore, onVotePost }: IVoteActions) {
  return (
    <div className="flex items-center gap-2 text-gray-600 select-none">
      <div
        onClick={() => onVotePost(userVote === 1 ? 0 : 1)}
        className={`p-1 rounded-sm cursor-pointer hover:bg-gray-400 ${
          userVote === 1 && "text-green-600"
        }`}
      >
        <ArrowUp size={18} />
      </div>
      <div>{voteScore}</div>
      <div
        onClick={() => onVotePost(userVote === -1 ? 0 : -1)}
        className={`p-1 rounded-sm cursor-pointer hover:bg-gray-400 ${
          userVote === -1 && "text-red-600"
        }`}
      >
        <ArrowDown size={18} />
      </div>
    </div>
  );
}

function Actions({
  commentCount,
  isOwner,
  onDeletePost,
  postId,
  linkToPost,
}: IActions) {
  return (
    <div className="flex">
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-3">
          <Link href={linkToPost} target="_blank">
            <div className="flex gap-1 px-1 py-2 text-sm cursor-pointer select-none hover:bg-gray-300">
              <MessageSquare />
              <p>{commentCount} comments</p>
            </div>
          </Link>
          <div
            onClick={copyToClipboard(linkToPost)}
            className="flex gap-1 px-1 py-2 text-sm cursor-pointer select-none hover:bg-gray-300"
          >
            <Share />
            <p>Share</p>
          </div>
        </div>

        {isOwner && (
          <div
            onClick={() => onDeletePost(postId)}
            className="flex gap-1 px-1 py-2 text-sm cursor-pointer select-none hover:bg-red-300"
          >
            <Trash2 size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
