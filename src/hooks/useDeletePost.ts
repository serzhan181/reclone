import { qc } from "@/src/react-query/setup";
import { useCallback } from "react";
import { useMutation } from "react-query";
import { DELETE_POST } from "../graphql/api/posts.graphql";
import { request } from "../graphql/custom-gql-fns";

export const useDeletePost = (queryIds: string[] | string) => {
  const { mutate } = useMutation(async (postId: number) => {
    return request(DELETE_POST, { postId });
  });

  const onDeletePost = useCallback(
    (postId: number) => {
      mutate(postId, {
        onSuccess() {
          qc.invalidateQueries(queryIds);
        },

        onError(err) {
          console.error("Error deleteing post:", err);
        },
      });
    },
    [mutate, queryIds]
  );

  return { onDeletePost };
};
