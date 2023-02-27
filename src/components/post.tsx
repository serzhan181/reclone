import UpvoteIcon from "@heroicons/react/24/solid/ArrowSmallUpIcon";
import DownvoteIcon from "@heroicons/react/24/solid/ArrowSmallDownIcon";
import Image from "next/image";
import Link from "next/link";
import CommentIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterTextIcon";

// ! This is not yet fully implemented. I left like that so it has nice ui for now.

interface PostProps {
  title: string;
  shortBody: string;
  href: string;
  voteCount: number;
}

const SRC =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fuser-avatars-2%2F300%2F10-1024.png&f=1&nofb=1&ipt=47d99b48731f06d11b1d84cac677c01b78d5e91947ce73c81bc3be983dfb7210&ipo=images";

export const Post = ({ title, shortBody, voteCount, href }: PostProps) => {
  return (
    <div className="flex w-full gap-5 p-5 rounded-lg shadow-md bg-primary/5">
      {/* Votes */}
      <div className="flex flex-col items-center">
        <button className="rounded hover:bg-primary/20">
          <UpvoteIcon className="w-8 scale-110 text-primary" />
        </button>
        <span className="text-xl text-primary">{voteCount}</span>
        <DownvoteIcon className="w-8 font-semibold hover:scale-110" />
      </div>

      <div className="flex flex-col w-full gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <div>
          <p className="text-base-content">{shortBody}</p>
        </div>
        <hr className="border-[1.5px] border-primary/10" />
        {/* Fake data for now */}
        <PostFooter
          authorImage={SRC}
          authorName="Michael"
          commentCount={69}
          createdAt="5 days ago"
          href={href}
        />
      </div>
    </div>
  );
};

interface PostFooterProps {
  authorImage: string;
  authorName: string;
  createdAt: string;
  commentCount: number;
  href: string;
}

const PostFooter = ({
  authorImage,
  authorName,
  commentCount,
  createdAt,
  href,
}: PostFooterProps) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <Link href={`/u/${authorName}`} className="avatar">
          <div className="relative w-8 rounded-full">
            <Image alt="user" src={authorImage} fill />
          </div>
        </Link>

        <span className="flex items-center gap-2 text-base-content/50">
          posted by{" "}
          <Link href="/" className=" text-primary underline-offset-4">
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
