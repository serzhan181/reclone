import { fromNow } from "@/utils/from-now";
import UserIcon from "@heroicons/react/24/outline/UserCircleIcon";
import Image from "next/image";
import Link from "next/link";

interface CommentProps {
  username: string;
  body: string;
  userImg: string | null | undefined;
  createdAt: string;
}

export const Comment = ({
  body,
  createdAt,
  username,
  userImg,
}: CommentProps) => {
  return (
    <div className="w-full p-3 rounded-lg shadow-md bg-primary/5">
      <div className="flex gap-3">
        <div className="flex items-center">
          <Link href="/" className="avatar">
            <div className="relative w-8 rounded-full">
              {userImg ? (
                <Image alt="user" src={"/"} fill />
              ) : (
                <UserIcon className="inset-0 aboslute" />
              )}
            </div>
          </Link>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Link href="/" className="text-sm font-semibold">
              {username}
            </Link>
            <span>&#8226;</span>
            <p className="text-sm text-base-content/50">{fromNow(createdAt)}</p>
          </div>
          <div>{body}</div>
        </div>
      </div>
    </div>
  );
};
