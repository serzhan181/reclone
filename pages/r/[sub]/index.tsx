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
      <div className="relative flex items-center w-full py-6">
        <Image
          src={`${process.env.NEXT_PUBLIC_STATIC_SERVE_ENDPOINT}/subs/${subsData?.sub.bannerUrn}`}
          layout="fill"
          className="absolute inset-0 object-cover"
          alt="sub banner"
        />

        <div className="container z-10 flex flex-col items-center justify-center w-full gap-2 h-fit">
          <Image
            src={`${process.env.NEXT_PUBLIC_STATIC_SERVE_ENDPOINT}/subs/${subsData?.sub.subImgUrn}`}
            alt="sub img"
            height={(8 * 22) / 3}
            width={(8 * 22) / 3}
            className="object-cover rounded-full"
          />
          <div className="p-1 rounded-sm bg-slate-200 h-fit">
            <h1 className="text-sm font-semibold text-center">
              {subsData?.sub.title}
            </h1>
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
          {postsData && (
            <PostsSection
              queryIds={["posts", sub as string]}
              posts={postsData.postsBySubName}
            />
          )}
        </div>
      </div>
    </>
  );
}

SubPage.getLayout = (page: ReactElement) => {
  return <NoContainerLayout> {page} </NoContainerLayout>;
};
