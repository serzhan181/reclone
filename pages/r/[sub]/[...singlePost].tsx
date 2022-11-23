import { Button } from "@/src/atoms";
import { COMMENT_ON_POST } from "@/src/graphql/api/posts.graphql";
import { request } from "@/src/graphql/custom-gql-fns";
import { postsRequests } from "@/src/graphql/requests/posts.requests";
import { useDeletePost } from "@/src/hooks/useDeletePost";
import { Post, Comment, Editor } from "@/src/molecules";
import { qc } from "@/src/react-query/setup";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "@/src/store/user.store";
import { CreateCommentOnPost } from "@/src/types";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

export default function SinglePost() {
  // General
  const router = useRouter();
  const [identifier, slug] = router.query.singlePost as string[];
  const username = useUserStore((state) => state.user?.username);
  const authenticated = useAuthStore((state) => state.authenticated);

  // Posts
  const { data, isLoading } = useQuery(
    ["post", identifier],
    async () => await postsRequests.getPostDetailed({ identifier, slug })
  );

  const { onDeletePost } = useDeletePost(["post", identifier]);

  // Comments
  const { data: postComments } = useQuery(
    ["comment", identifier],
    async () => await postsRequests.getPostComments({ identifier, slug })
  );

  const createComment = useMutation(
    async (createComment: CreateCommentOnPost) => {
      return request(COMMENT_ON_POST, createComment);
    }
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ body: string }>();

  const onCommentSubmit = (data: { body: string }) => {
    if (!data.body.trim()) return;

    createComment.mutate(
      { body: data.body, identifier, slug },
      {
        onSuccess(data) {
          console.log("success", data);
          reset();
          qc.invalidateQueries(["comment", identifier]);
        },
        onError(err) {
          console.log("Error creating comment", err);
        },
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col w-full">
          {data && (
            <Post
              {...data.post}
              isOwner={data.post.user.username === username}
              onDeletePost={onDeletePost}
              body={data.post.body}
            />
          )}

          {/* Create comment */}
          <form onSubmit={handleSubmit(onCommentSubmit)} className="mt-2">
            <Controller
              name="body"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Editor
                  placeholder="What are your thoughts?"
                  value={field.value}
                  onChange={(text) => {
                    field.onChange(text);
                  }}
                />
              )}
            />

            <Button
              disabled={authenticated && Boolean(errors.body)}
              type="submit"
              rounded
              size="s"
            >
              comment
            </Button>
          </form>

          {/* Comments */}
          {data && (
            <div className="w-full p-2 mt-2 rounded-sm">
              {/* Each comment */}
              {postComments?.post &&
                postComments.post.comments.map((c) => (
                  <Comment
                    key={c.id}
                    {...c}
                    userVote={c.userVote}
                    voteScore={c.voteScore}
                    postId={data.post.id}
                    id={c.id}
                    isOwner={data.post.user.username === c.username}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}