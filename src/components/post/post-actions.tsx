"use client";

import { postsRequests } from "@/graphql/requests/post-requests";
import { Dropdown } from "@/shared/ui/dropdown";
import { useMutation } from "react-query";
import type { Option } from "@/types";
import { getTokenClient } from "@/utils/get-token-client";
import { promiseToast } from "@/utils/promise-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";

interface PostActionsProps {
  postId: string;
  postOwnerUsername: string;
}

// TODO: Implement edit
type PostActionTypes = "delete" | "edit";

interface PostActionOption extends Omit<Option, "value"> {
  value: PostActionTypes;
}

const postActionOptions: PostActionOption[] = [
  { id: "1", value: "delete", label: "Delete" },
];

export const PostActions = ({
  postId,
  postOwnerUsername,
}: PostActionsProps) => {
  const token = getTokenClient();
  const deletePost = useMutation(postsRequests.deletePost);
  const router = useRouter();
  const username = useUserStore((state) => state.user?.username);

  if (username !== postOwnerUsername) {
    return null;
  }

  const handleClickOption = (value: PostActionOption["value"]) => {
    switch (value) {
      case "delete":
        onDelete();
        break;

      default:
        break;
    }
  };

  const onDelete = () => {
    const { successToast, errorToast } = promiseToast("Deleting...");
    deletePost.mutate(
      { postId, token },
      {
        onSuccess() {
          router.refresh();
          successToast("Deleted!");
        },
        onError() {
          errorToast("Couldn't delete the post :(");
        },
      }
    );
  };

  return (
    <Dropdown
      options={postActionOptions}
      onClick={(value) => handleClickOption(value as PostActionOption["value"])}
    />
  );
};
