import type { NextPage } from "next";
import {
  TrendingRow,
  PopularCommunities,
  Categories,
  ContentsSection,
} from "@/src/organisms";
import { gqlClient } from "@/src/graphql/setup";
import { GET_POSTS_MINIMAL } from "@/src/graphql/api/posts.graphql";
import { IPostMinimal } from "@/src/types";
import Link from "next/link";
import { useAuthStore } from "@/src/store/auth.store";

const Home: NextPage<{ posts: IPostMinimal[] }> = ({ posts }) => {
  const authenticated = useAuthStore((state) => state.authenticated);

  return (
    <>
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex w-full mb-5">
          <TrendingRow />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col basis-[70%]">
            {/* Post creation */}
            {authenticated && (
              <div className="p-1 mb-2 border-2 border-gray-500 rounded bg-slate-100">
                <h1 className="text-lg font-semibold text-gray-900 underline">
                  <Link className="w-full" href="/create-post">
                    Create post
                  </Link>
                </h1>
              </div>
            )}

            <ContentsSection posts={posts} />
          </div>

          <div className="flex flex-col flex-grow gap-2 pl-2">
            <PopularCommunities />

            <Categories />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const data = await gqlClient.request(GET_POSTS_MINIMAL);

  return {
    props: {
      posts: data?.posts || [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export default Home;
