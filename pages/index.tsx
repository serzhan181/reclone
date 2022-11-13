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

const Home: NextPage<{ posts: IPostMinimal[] }> = ({ posts }) => {
  return (
    <>
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex w-full mb-5">
          <TrendingRow />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col basis-[70%]">
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
