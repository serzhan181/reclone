import { FC } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import {
  SUBSCRIBE_TO_SUB,
  UNSUBSCRIBE_FROM_SUB,
} from "../graphql/api/subs.graphql";
import { request } from "../graphql/custom-gql-fns";
import { qc } from "../react-query/setup";
import { useAuthStore } from "../store/auth.store";
import { Button } from "./button";

interface ISubscribeButton {
  subName: string;
  queryIds: string | string[];
  isSubscribed: boolean;
  size?: "s" | "m" | "l";
}

export const SubscribeButton: FC<ISubscribeButton> = ({
  subName,
  queryIds,
  isSubscribed,
  size = "m",
}) => {
  const authenticated = useAuthStore((state) => state.authenticated);

  const joinSub = useMutation(
    async (subName: string) => await request(SUBSCRIBE_TO_SUB, { subName })
  );
  const leaveSub = useMutation(
    async (subName: string) => await request(UNSUBSCRIBE_FROM_SUB, { subName })
  );

  const onJoinSub = (subName: string, action: "join" | "leave") => {
    if (!authenticated) {
      toast.error("You have to be logged in to join any community!");
      return;
    }

    if (action === "join") {
      joinSub.mutate(subName, {
        onSuccess() {
          toast.success("You have joined the sub!");
          qc.invalidateQueries(queryIds);
        },
        onError(errMsg) {
          toast.error(errMsg as string);
        },
      });
    }

    if (action === "leave") {
      leaveSub.mutate(subName, {
        onSuccess() {
          toast.success("You left the sub!");
          qc.invalidateQueries(queryIds);
        },
        onError(errMsg) {
          toast.error(errMsg as string);
        },
      });
    }
    return;
  };

  return (
    <Button
      outline={isSubscribed}
      onClick={() => onJoinSub(subName, isSubscribed ? "leave" : "join")}
      size={size}
    >
      {isSubscribed ? "Joined" : "Join"}
    </Button>
  );
};
