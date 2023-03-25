import GroupIcon from "@heroicons/react/24/outline/UsersIcon";
import Image from "next/image";
import Link from "next/link";
import CommentIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon";
import { fromNow } from "@/utils/from-now";
import { VotePost } from "./vote-post";
import { PostActions } from "./post-actions";
import { Editor } from "@/shared/form/editor";

interface PostProps {
  id: string;
  title: string;
  href: string;
  voteScore: number;
  subName: string;
  authorName: string;
  createdAt: string;
  commentCount: number;
  subImg: string | null;
  body?: string;
  userVote?: number;
  postImg?: string;
}

export const Post = ({
  id,
  title,
  voteScore,
  href,
  subName,
  authorName,
  createdAt,
  commentCount,
  subImg,
  body,
  userVote,
  postImg,
}: PostProps) => {
  return (
    <div className="flex w-full gap-5 p-5 shadow-md md:rounded-md bg-primary/5">
      {/* Votes */}
      <div className="flex flex-col justify-between">
        <VotePost voteScore={voteScore} userVote={userVote} postId={id} />
        <div className="flex justify-center">
          <PostActions postId={id} postOwnerUsername={authorName} />
        </div>
      </div>

      <div className="flex flex-col w-full gap-4">
        <PostBody href={href} title={title} body={body} postImg={postImg} />

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

interface PostBodyProps {
  href: string;
  title: string;
  body?: string;
  postImg?: string;
}
const PostBody = ({ href, title, body, postImg }: PostBodyProps) => {
  return (
    <>
      <div>
        <Link href={href} className="text-2xl font-semibold">
          {title}
        </Link>
      </div>
      {body && (
        <Editor
          preview
          previewOnly
          value={body}
          style={{
            backgroundColor: "transparent",
          }}
        />
      )}
      {postImg && (
        <>
          <hr className="border-[1.5px] border-primary/10" />
          <div className="flex items-center justify-center">
            <Image
              src={postImg}
              alt="post image"
              width={350}
              height={215}
              className="object-contain rounded-md"
            />
          </div>
        </>
      )}
    </>
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
    <div className="flex items-center justify-between text-xs md:text-sm">
      <div className="flex items-center gap-2">
        <Link
          href={`/r/${subName}`}
          className="hidden md:inline-block md:avatar"
        >
          <div className="relative w-8 rounded-full">
            {subImg ? (
              <Image alt="user" src={subImg} fill />
            ) : (
              <GroupIcon className="inset-0 aboslute" />
            )}
          </div>
        </Link>

        <span className="flex items-center gap-2 text-base-content/50">
          <Link
            href={`/r/${subName}`}
            className=" text-primary underline-offset-4"
          >
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
        <CommentIcon className="w-3 md:w-6" />
        <span className="h-full">{commentCount}</span>
      </Link>
    </div>
  );
};
