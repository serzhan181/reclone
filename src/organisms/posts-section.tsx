import { FC } from "react";
import { Post } from "@/src/molecules";
import { useUserStore } from "../store/user.store";
import { GetPost } from "../types";
import { useDeletePost } from "../hooks/useDeletePost";
import { useVoteOnPost } from "../hooks/useVote";

export const PostsSection: FC<{ posts: GetPost[] }> = ({ posts }) => {
  const username = useUserStore((state) => state.user?.username);
  const { onDeletePost } = useDeletePost("posts");
  const { onVotePost } = useVoteOnPost("posts");

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
