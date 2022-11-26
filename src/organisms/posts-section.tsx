import { FC } from "react";
import { Post } from "@/src/molecules";
import { useUserStore } from "../store/user.store";
import { GetPost } from "../types";
import { useDeletePost } from "../hooks/useDeletePost";

interface IPostsSection {
  posts: GetPost[];
  queryIds?: string | string[];
}

export const PostsSection: FC<IPostsSection> = ({
  posts,
  queryIds = "posts",
}) => {
  const username = useUserStore((state) => state.user?.username);
  const { onDeletePost } = useDeletePost(queryIds);

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
