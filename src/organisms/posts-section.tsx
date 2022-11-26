import { FC } from "react";
import { Post } from "@/src/molecules";
import { useUserStore } from "../store/user.store";
import { GetPost } from "../types";
import { useDeletePost } from "../hooks/useDeletePost";
import Image from "next/image";

interface IPostsSection {
  posts: GetPost[];
  queryIds?: string | string[];
  isLoading?: boolean;
}

export const PostsSection: FC<IPostsSection> = ({
  posts,
  queryIds = "posts",
  isLoading = false,
}) => {
  const username = useUserStore((state) => state.user?.username);
  const { onDeletePost } = useDeletePost(queryIds);

  if (isLoading) {
    return (
      <div className="flex mt-2 flex-center">
        <Image src={"/loading.svg"} alt="loading" width={130} height={30} />{" "}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {posts.length &&
        posts.map((p) => (
          <Post
            {...p}
            key={p.id}
            userVote={p.userVote}
            voteScore={p.voteScore}
            isOwner={p.user.username === username}
            onDeletePost={onDeletePost}
          />
        ))}
    </div>
  );
};
