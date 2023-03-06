"use client";

import { useLocalComments } from "@/stores/comments-store";
import { AnimatePresence, motion } from "framer-motion";
import { Comment } from "./comment";

export const LocalComments = () => {
  const comments = useLocalComments((state) => state.messages);

  return (
    <AnimatePresence>
      {comments?.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: -50, dur: 500 }}
          animate={{ opacity: 1, y: 0, dur: 500 }}
        >
          <Comment
            body={c.body}
            createdAt={c.createdAt}
            userImg={c.userImg}
            username={c.username}
          />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
