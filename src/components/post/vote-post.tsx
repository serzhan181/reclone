"use client";

import UpvoteIcon from "@heroicons/react/24/solid/ArrowSmallUpIcon";
import DownvoteIcon from "@heroicons/react/24/solid/ArrowSmallDownIcon";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { postsRequests } from "@/graphql/requests/post-requests";
import { qc } from "@/rq/client";
import { getTokenClient } from "@/utils/get-token-client";
import { authRequest } from "@/graphql/requests/auth-requests";
import { useModalStore } from "@/stores/modal-store";

interface VotePostProps {
  userVote?: number;
  voteScore: number;
  postId: string;
}

export const VotePost = ({ voteScore, userVote, postId }: VotePostProps) => {
  // ? These 2 needed for optimistic updates. (Usual optimistic updates dont suit very well with this problem imo.)
  const [localScore, setLocalScore] = useState(voteScore);
  const [localUserVote, setLocalUserVote] = useState(userVote);
  const setAuthModal = useModalStore((state) => state.setAuthModal);
  const token = getTokenClient();

  const { data: authData } = useQuery(
    ["authed", postId],
    authRequest.me.bind(undefined, { token })
  );

  const vote = useMutation(postsRequests.voteOnPost, {
    onSuccess(data) {
      console.log("SERVER", data.vote.userVote);
      console.log("CLIENT", localUserVote);
    },
  });

  const onUpvote = (value: 0 | 1) => {
    if (!authData?.me.authenticated) {
      setAuthModal(true);
      return;
    }

    setLocalUserVote(value);
    setLocalScore((ps) => {
      if (localUserVote === -1 && ps === -1 && value === 1) {
        return 1;
      }
      if (value === 0) {
        return ps - 1;
      }
      console.log("here");
      return ps + value;
    });

    vote.mutate({ postId, value, token });
  };

  const onDownvote = (value: 0 | -1) => {
    if (!authData?.me.authenticated) {
      setAuthModal(true);
      return;
    }

    setLocalUserVote(value);
    setLocalScore((ps) => {
      if (localUserVote === 1 && ps === 1 && value === -1) {
        return -1;
      }
      if (value === 0) {
        return ps + 1;
      }
      return ps + value;
    });

    vote.mutate({ postId, value, token });
  };

  return (
    <div className="flex flex-col items-center">
      <motion.button
        whileHover={{
          y: -3,
          scaleY: 1.05,
        }}
        whileTap={{
          y: 0,
          scaleY: 1,
        }}
        className="overflow-hidden rounded hover:bg-primary/20"
        onClick={() => onUpvote(localUserVote !== 1 ? 1 : 0)}
      >
        <UpvoteIcon
          className={classNames("w-8", {
            "scale-110 text-primary bg-primary/20": localUserVote === 1,
          })}
        />
      </motion.button>

      <AnimatePresence mode="popLayout">
        <motion.span
          key={localScore}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 5, opacity: 0, position: "absolute" }}
          className={classNames("text-xl select-none", {
            "text-primary": localUserVote === 1,
            "text-error": localUserVote === -1,
          })}
        >
          {localScore}
        </motion.span>
      </AnimatePresence>
      <motion.button
        whileHover={{
          y: 3,
          scaleY: 1.05,
        }}
        whileTap={{
          y: 0,
          scale: 1,
        }}
        className="overflow-hidden rounded hover:bg-error/20"
        onClick={() => onDownvote(localUserVote === -1 ? 0 : -1)}
      >
        <DownvoteIcon
          className={classNames("w-8", {
            "scale-110 text-error bg-error/20": localUserVote === -1,
          })}
        />
      </motion.button>
    </div>
  );
};
