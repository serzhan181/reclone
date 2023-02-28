import UpvoteIcon from "@heroicons/react/24/solid/ArrowSmallUpIcon";
import DownvoteIcon from "@heroicons/react/24/solid/ArrowSmallDownIcon";
import GroupIcon from "@heroicons/react/24/outline/UsersIcon";
import Image from "next/image";
import Link from "next/link";
import CommentIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon";
import { fromNow } from "@/utils/from-now";

// ! This is not yet fully implemented. I left like that so it has nice ui for now.

interface PostProps {
  title: string;
  href: string;
  voteScore: number;
  subName: string;
  authorName: string;
  createdAt: string;
  commentCount: number;
  subImg: string | null;
}

export const Post = ({
  title,
  voteScore,
  href,
  subName,
  authorName,
  createdAt,
  commentCount,
  subImg,
}: PostProps) => {
  return (
    <div className="flex w-full gap-5 p-5 rounded-lg shadow-md bg-primary/5">
      {/* Votes */}
      <div className="flex flex-col items-center">
        <button className="rounded hover:bg-primary/20">
          <UpvoteIcon className="w-8 scale-110 text-primary" />
        </button>
        <span className="text-xl text-primary">{voteScore}</span>
        <DownvoteIcon className="w-8 font-semibold hover:scale-110" />
      </div>

      <div className="flex flex-col w-full gap-4">
        <div>
          <Link href={href} className="text-2xl font-semibold">
            {title}
          </Link>
        </div>
        <hr className="border-[1.5px] border-primary/10" />
        {/* Fake data for now */}
        <PostFooter
          subImg={subImg}
          authorName={authorName}
          commentCount={commentCount}
          createdAt={fromNow(createdAt)}
          href={href}
          subName={subName}
        />
      </div>
    </div>
  );
};

interface PostFooterProps {
  subImg: string | null;
  authorName: string;
  createdAt: string;
  commentCount: number;
  href: string;
  subName: string;
}

const PostFooter = ({
  subImg,
  authorName,
  commentCount,
  createdAt,
  href,
  subName,
}: PostFooterProps) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <Link href={`/r/${subName}`} className="avatar">
          <div className="relative w-8 rounded-full">
            {subImg ? (
              <Image alt="user" src={subImg} fill />
            ) : (
              <GroupIcon className="inset-0 aboslute" />
            )}
          </div>
        </Link>

        <span className="flex items-center gap-2 text-base-content/50">
          <Link href="/" className=" text-primary underline-offset-4">
            r/{subName}
          </Link>
        </span>

        <span className="flex items-center gap-2 text-base-content/50">
          posted by{" "}
          <Link
            href={`/u/${authorName}`}
            className=" text-primary underline-offset-4"
          >
            {authorName}
          </Link>
        </span>

        <span className="flex items-center text-base-content/50">&#8226;</span>

        <p className="text-xs text-base-content/50">{createdAt}</p>
      </div>
      <Link
        href={href}
        className="flex items-center gap-2 p-1 rounded text-base-content/50 hover:bg-neutral"
      >
        <CommentIcon className="w-6" />
        <span className="h-full">{commentCount}</span>
      </Link>
    </div>
  );
};
