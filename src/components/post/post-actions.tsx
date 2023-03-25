"use client";

import { postsRequests } from "@/graphql/requests/post-requests";
import { useMutation } from "react-query";
import type { Option } from "@/types";
import { getTokenClient } from "@/utils/get-token-client";
import { promiseToast } from "@/utils/promise-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user-store";
import dynamic from "next/dynamic";

const Dropdown = dynamic(() =>
  import("@/shared/ui/dropdown").then((c) => c.Dropdown)
);

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

  const handleClickOption = (value: PostActionOption["value"]) => {
    if (username !== postOwnerUsername) return;
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
