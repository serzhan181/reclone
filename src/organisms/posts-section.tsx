import { FC } from "react";
import { Post } from "@/src/molecules";
import { useUserStore } from "../store/user.store";
import { GetPost } from "../types";
import { useDeletePost } from "../hooks/useDeletePost";
import { useVoteOnPost } from "../hooks/useVote";

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
  const { onVotePost } = useVoteOnPost(queryIds);

  return (
    <div className="flex flex-col gap-2">
      {posts &&
        posts?.map((p) => (
          <Post
            key={p.id}
            isOwner={p.user.username === username}
            onDeletePost={onDeletePost}
            onVotePost={(value) => onVotePost({ value, postId: p.id })}
            {...p}
          />
        ))}
    </div>
  );
};
