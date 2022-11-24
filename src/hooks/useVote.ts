import { toast } from "react-hot-toast";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { VOTE_ON_COMMENT, VOTE_ON_POST } from "../graphql/api/votes.graphql";
import { request } from "../graphql/custom-gql-fns";

interface VoteOnPost {
  value: -1 | 0 | 1;
  postId: number;
}

interface VoteResponse {
  userVote: number;
  voteScore: number;
}

interface VoteOnComment extends VoteOnPost {
  commentId: number;
}

export const useVoteOnPost = (initialVote: VoteResponse) => {
  const { mutate } = useMutation(async ({ postId, value }: VoteOnPost) => {
    return request<{ vote: VoteResponse }>(VOTE_ON_POST, { postId, value });
  });

  const [vote, setVote] = useState<VoteResponse>(initialVote);

  const onVotePost = useCallback(
    (voteOnPost: VoteOnPost) => {
      mutate(voteOnPost, {
        onSuccess(data) {
          setVote(data.vote);
        },

        onError(err) {
          console.log("Error voting on post", err);
        },
      });
    },
    [mutate]
  );

  return { onVotePost, vote, setVote };
};

export const useVoteOnComment = (initialVote: VoteResponse) => {
  const { mutate } = useMutation(
    async ({ value, commentId, postId }: VoteOnComment) => {
      return request<{ vote: { comments: VoteResponse[] } }>(VOTE_ON_COMMENT, {
        postId,
        commentId,
        value,
      });
    }
  );

  const [vote, setVote] = useState<VoteResponse>(initialVote);

  const onVoteComment = useCallback(
    (voteOnComment: VoteOnComment) => {
      mutate(voteOnComment, {
        onSuccess(data) {
          console.log("COMMENT", data.vote);
          setVote(data.vote.comments[0]);
        },

        onError(err) {
          console.error("Error voting on comment", err);
          toast.error(err as string);
        },
      });
    },
    [mutate]
  );

  return { onVoteComment, vote };
};
