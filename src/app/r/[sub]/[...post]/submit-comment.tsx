"use client";

import { postsRequests } from "@/graphql/requests/post-requests";
import { useLocalComments } from "@/stores/comments-store";
import { useUserStore } from "@/stores/user-store";
import { getTokenClient } from "@/utils/get-token-client";
import SendIcon from "@heroicons/react/24/outline/PaperAirplaneIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { uid } from "uid";
import { z } from "zod";

interface SubmitCommentProps {
  postId: string;
  identifier: string;
  slug: string;
}

const Schema = z.object({
  body: z.string(),
});

type SubmitCommentType = z.infer<typeof Schema>;

export const SubmitComment = ({
  postId,
  identifier,
  slug,
}: SubmitCommentProps) => {
  // Handle mutation
  const token = getTokenClient();
  const createComment = useMutation(
    ["comment", postId],
    postsRequests.createComment,
    {
      onError(err) {
        console.error("Something went wrong!", err);
      },
    }
  );
  // --- Handle mutation

  const { register, handleSubmit, reset } = useForm<SubmitCommentType>({
    resolver: zodResolver(Schema),
  });
  const addComment = useLocalComments((state) => state.addComment);
  const user = useUserStore((state) => state.user);

  const onSubmit = (data: SubmitCommentType) => {
    addComment({
      body: data.body,
      createdAt: new Date().toString(),
      id: uid(7),
      userImg: user?.profile_picture_urn,
      username: user?.username || "unknown",
    });
    reset();

    createComment.mutate({ body: data.body, identifier, slug, token });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col w-full gap-2 p-3 rounded-lg shadow-md bg-primary/5">
        <textarea
          {...register("body")}
          placeholder="What are your thoughts?"
          className="w-full textarea textarea-bordered textarea-sm"
        />
        <div className="self-end">
          <button
            type="submit"
            disabled={createComment.isLoading}
            className={classNames("btn btn-primary btn-sm", {
              "btn-disabled loading": createComment.isLoading,
            })}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
};
