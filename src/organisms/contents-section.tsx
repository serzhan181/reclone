import { FC, useCallback } from "react";
import { useMutation } from "react-query";
import { DELETE_POST } from "../graphql/api/posts.graphql";
import { request } from "../graphql/custom-gql-fns";
import { ContentCard } from "../molecules";
import { qc } from "@/src/react-query/setup";
import { useUserStore } from "../store/user.store";
import { IPostMinimal } from "../types";

export const ContentsSection: FC<{ posts: IPostMinimal[] }> = ({ posts }) => {
  const username = useUserStore((state) => state.user?.username);
  const deletePostMutation = useMutation(async (identifier: string) => {
    return request(DELETE_POST, { identifier });
  });

  const onDeletePost = useCallback(
    (identifier: string) => {
      deletePostMutation.mutate(identifier, {
        onSuccess() {
          qc.invalidateQueries("posts");
        },

        onError(err) {
          console.log(err);
        },
      });
    },
    [deletePostMutation]
  );

  return (
    <div className="flex flex-col gap-2">
      {posts &&
        posts?.map((p) => (
          <ContentCard
            key={p.identifier}
            isOwner={p.user.username === username}
            onDeletePost={() => onDeletePost(p.identifier)}
            {...p}
          />
        ))}
    </div>
  );
};
