import {
  GET_SUB,
  SUBSCRIBE_TO_SUB,
  UNSUBSCRIBE_FROM_SUB,
} from "@/src/graphql/api/subs.graphql";
import { request } from "@/src/graphql/custom-gql-fns";
import { GetPost, GetSub } from "@/src/types";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useMutation, useQuery } from "react-query";
import Image from "next/image";
import { NoContainerLayout } from "@/src/layouts";
import { PostsSection } from "@/src/organisms";
import { GET_POSTS_BY_SUBNAME } from "@/src/graphql/api/posts.graphql";
import { NextSeo } from "next-seo";
import dayjs from "dayjs";
import { Button } from "@/src/atoms";
import { useAuthStore } from "@/src/store/auth.store";
import toast from "react-hot-toast";
import { qc } from "@/src/react-query/setup";

export default function SubPage() {
  const router = useRouter();
  const { sub } = router.query;

  const { data: subsData } = useQuery(["sub", sub], async () =>
    request<{ sub: GetSub }>(GET_SUB, { name: sub })
  );
  const { data: postsData } = useQuery(["posts", sub], async () =>
    request<{ postsBySubName: GetPost[] }>(GET_POSTS_BY_SUBNAME, {
      subName: sub,
    })
  );

  const joinSub = useMutation(
    async (subName: string) => await request(SUBSCRIBE_TO_SUB, { subName })
  );
  const leaveSub = useMutation(
    async (subName: string) => await request(UNSUBSCRIBE_FROM_SUB, { subName })
  );

  const authenticated = useAuthStore((state) => state.authenticated);

  const onJoinSub = (subName: string, action: "join" | "leave") => {
    if (!authenticated) {
      toast.error("You have to be logged in to join any community!");
      return;
    }

    if (action === "join") {
      joinSub.mutate(subName, {
        onSuccess() {
          toast.success("You have joined the sub!");
          qc.invalidateQueries(["sub", sub]);
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
          qc.invalidateQueries(["sub", sub]);
        },
        onError(errMsg) {
          toast.error(errMsg as string);
        },
      });
    }
    return;
  };

  return (
    <>
      <NextSeo title={subsData?.sub.title} />
      {subsData?.sub.bannerUrn && (
        <div className="relative flex items-center w-full py-6">
          <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_SERVE_ENDPOINT}/subs/${subsData.sub.bannerUrn}`}
            layout="fill"
            className="absolute inset-0 object-cover"
            alt="sub banner"
          />

          <div className="container z-10 flex flex-col items-center justify-center w-full gap-2 h-fit">
            <Image
              src={`${process.env.NEXT_PUBLIC_STATIC_SERVE_ENDPOINT}/subs/${subsData.sub.subImgUrn}`}
              alt="sub img"
              height={(8 * 22) / 3}
              width={(8 * 22) / 3}
              className="object-cover rounded-full"
            />
            <div className="p-1 rounded-sm bg-slate-200 h-fit">
              <h1 className="text-sm font-semibold text-center">
                {subsData.sub.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white ">
        <div className="container">
          <div className="flex gap-2 py-2">
            {subsData?.sub.subImgUrn && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STATIC_SERVE_ENDPOINT}/subs/${subsData.sub.subImgUrn}`}
                alt={subsData.sub.name}
                height={(8 * 22) / 3}
                width={(8 * 22) / 3}
                className="object-cover rounded-full"
              />
            )}
            <div className="self-end">
              <h1 className="text-xl font-semibold">{subsData?.sub.title}</h1>
              <h4 className="text-xs text-gray-500">r/{subsData?.sub.name}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full bg-white h-7">
        <div className="container flex items-center h-full">
          <ul className="flex h-full gap-1">
            <li className="h-full cursor-pointer">
              <p className="h-full px-1 text-sm font-semibold border-b-2 border-blue-700">
                posts
              </p>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="container mt-3">
          <div className="flex w-full">
            <div className="flex flex-col basis-[70%]">
              {postsData && (
                <PostsSection
                  queryIds={["posts", sub as string]}
                  posts={postsData.postsBySubName}
                />
              )}
            </div>

            <div className="flex flex-col flex-grow gap-2 ml-2 overflow-hidden bg-white border rounded-sm">
              <div>
                <div className="p-2 bg-blue-500">
                  <h1 className="text-lg font-semibold text-white">
                    About community
                  </h1>
                </div>

                <div className="p-2">
                  <p>{subsData?.sub.description}</p>
                </div>

                <div className="flex items-center p-2">
                  <Image
                    alt="birthday"
                    src="/icons/piece-of-cake.svg"
                    width={20}
                    height={20}
                  />

                  <p className="ml-2 text-sm text-gray-500">
                    Created{" "}
                    {dayjs(subsData?.sub.createdAt).format("MMM D, YYYY")}
                  </p>
                </div>

                <hr />

                <div className="flex flex-col p-2 flex-center">
                  <p className="text-lg font-semibold">
                    {subsData?.sub.subsribersCount}
                  </p>
                  <p className="text-sm text-gray-500">followers</p>
                </div>

                <div className="flex p-2 flex-center">
                  <Button
                    outline={subsData?.sub.isUserSubscribed}
                    onClick={() =>
                      onJoinSub(
                        sub as string,
                        subsData?.sub.isUserSubscribed ? "leave" : "join"
                      )
                    }
                  >
                    {subsData?.sub.isUserSubscribed ? "Joined" : "Join"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

SubPage.getLayout = (page: ReactElement) => {
  return <NoContainerLayout> {page} </NoContainerLayout>;
};
