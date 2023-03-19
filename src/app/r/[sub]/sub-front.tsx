"use client";

import { authRequest } from "@/graphql/requests/auth-requests";
import { subsRequests } from "@/graphql/requests/subs-requests";
import { RoundedImage } from "@/shared/ui/rounded-image";
import { getTokenClient } from "@/utils/get-token-client";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

interface SubFront {
  bgImg?: string;
  subImg?: string;
  subDisplayName: string;
  isUserSubscribed: boolean;
  subName: string;
}

export const SubFront = ({
  subDisplayName,
  bgImg,
  subImg,
  isUserSubscribed: isUserSubscribedProp,
  subName,
}: SubFront) => {
  const token = getTokenClient();
  const { data: authData } = useQuery(
    ["authed"],
    authRequest.me.bind(undefined, { token }),
    { retry: false, refetchOnWindowFocus: false }
  );
  const joinSub = useMutation(subsRequests.joinSub);
  const leaveSub = useMutation(subsRequests.leaveSub);
  const isLoading = joinSub.isLoading || leaveSub.isLoading;

  const [isUserSubscribed, setIsUserSubscribed] =
    useState(isUserSubscribedProp);

  const onSubJoinOrLeave = (action: "leave" | "join") => {
    if (!authData?.me.authenticated) return;

    if (action === "leave") {
      leaveSub.mutate(
        { token, subName },
        {
          onSuccess() {
            setIsUserSubscribed((p) => !p);
          },
        }
      );
    }

    if (action === "join") {
      joinSub.mutate(
        { token, subName },
        {
          onSuccess() {
            setIsUserSubscribed((p) => !p);
          },
        }
      );
    }
  };

  return (
    <div className="relative rounded-t-md">
      {bgImg && <BackgroundImage src={bgImg} />}
      <div
        className={classNames("flex justify-between w-full px-8 bg-primary/5", {
          "absolute -bottom-16 rounded-b-md pb-3": bgImg,
          "items-center rounded-md ring": !bgImg,
        })}
      >
        <div className="flex gap-3">
          <RoundedImage
            src={subImg || ""}
            alt="hello"
            size="lg"
            className="z-20 cursor-pointer hover:ring"
          />
          <div
            className={classNames({
              "self-center": !bgImg,
              "self-end": bgImg,
            })}
          >
            <p className="text-xl font-semibold">{subDisplayName}</p>
          </div>
        </div>

        {authData?.me.authenticated && (
          <div
            className={classNames({
              flex: bgImg,
            })}
          >
            <button
              className={classNames("btn btn-primary btn-sm", {
                "self-end": bgImg,
                "btn-ghost": isUserSubscribed,
                "loading btn-disabled": isLoading,
              })}
              disabled={isLoading}
              onClick={() =>
                onSubJoinOrLeave(isUserSubscribed ? "leave" : "join")
              }
            >
              {isUserSubscribed ? "Joined" : "Join"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const BackgroundImage = ({ src }: { src: string }) => {
  return (
    <div className="relative z-10 w-full overflow-hidden cursor-pointer rounded-t-md h-52 hover:ring">
      {src ? (
        <Image src={src} alt="test" fill style={{ objectFit: "cover" }} />
      ) : (
        <>nothing yeat</>
      )}
    </div>
  );
};
