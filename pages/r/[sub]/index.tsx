import { GET_SUB } from "@/src/graphql/api/subs.graphql";
import { request } from "@/src/graphql/custom-gql-fns";
import { GetPost, GetSub } from "@/src/types";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import { NoContainerLayout } from "@/src/layouts";
import { PostsSection } from "@/src/organisms";
import { GET_POSTS_BY_SUBNAME } from "@/src/graphql/api/posts.graphql";
import { NextSeo } from "next-seo";
import dayjs from "dayjs";
import { Button, SubscribeButton } from "@/src/atoms";

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
            <div className="flex flex-col basis-[100%]">
              {postsData?.postsBySubName.length ? (
                <PostsSection
                  queryIds={["posts", sub as string]}
                  posts={postsData.postsBySubName}
                />
              ) : (
                <div className="w-full border border-black border-dashed">
                  <p className="text-sm text-center">No posts yet</p>
                </div>
              )}
            </div>

            <div className="flex flex-col basis-[30%] flex-grow gap-2 ml-2 overflow-hidden bg-white border rounded-sm">
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

                {subsData && (
                  <>
                    <div className="flex p-2 flex-center">
                      <SubscribeButton
                        subName={sub as string}
                        isSubscribed={subsData.sub.isUserSubscribed}
                        queryIds={["sub", sub as string]}
                      />
                    </div>

                    <hr />

                    <div className="flex justify-center p-2">
                      <Button
                        onClick={() =>
                          router.push(
                            `/create/post?sub_name=${subsData?.sub.name}`
                          )
                        }
                        size="s"
                      >
                        Create post
                      </Button>
                    </div>
                  </>
                )}
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
