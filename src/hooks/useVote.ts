import { useCallback } from "react";
import { useMutation } from "react-query";
import { VOTE_ON_COMMENT, VOTE_ON_POST } from "../graphql/api/votes.graphql";
import { request } from "../graphql/custom-gql-fns";
import { qc } from "../react-query/setup";

interface VoteOnPost {
  value: -1 | 0 | 1;
  postId: number;
}

interface VoteOnComment extends VoteOnPost {
  commentId: number;
}

export const useVoteOnPost = (queryIds: string | string[]) => {
  const { mutate } = useMutation(async ({ postId, value }: VoteOnPost) => {
    return request(VOTE_ON_POST, { postId, value });
  });

  const onVotePost = useCallback(
    (voteOnPost: VoteOnPost) => {
      mutate(voteOnPost, {
        onSuccess() {
          qc.invalidateQueries(queryIds);
        },

        onError(err) {
          console.log("Error voting on post", err);
        },
      });
    },
    [mutate, queryIds]
  );

  return { onVotePost };
};

export const useVoteOnComment = (queryIds: string | string[]) => {
  const { mutate } = useMutation(
    async ({ value, commentId, postId }: VoteOnComment) => {
      return request(VOTE_ON_COMMENT, { postId, commentId, value });
    }
  );

  const onVoteComment = useCallback(
    (voteOnComment: VoteOnComment) => {
      mutate(voteOnComment, {
        onSuccess() {
          qc.invalidateQueries(queryIds);
        },

        onError(err) {
          console.error("Error voting on comment", err);
        },
      });
    },
    [mutate, queryIds]
  );

  return { onVoteComment };
};
