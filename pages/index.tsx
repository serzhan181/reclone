import type { GetStaticProps, NextPage } from "next";
import { TrendingRow, PopularCommunities, PostsSection } from "@/src/organisms";
import { GET_POSTS } from "@/src/graphql/api/posts.graphql";
import { GetPost } from "@/src/types";
import { useQuery } from "react-query";
import { request } from "@/src/graphql/custom-gql-fns";
import { NextSeo } from "next-seo";

const Home: NextPage<{ posts: GetPost[] }> = (props) => {
  const { data } = useQuery<{ posts: GetPost[] }>(
    "posts",
    async () => await request(GET_POSTS),
    {
      initialData: { posts: props.posts },
    }
  );

  return (
    <>
      <NextSeo title="Reclone" />
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex w-full mb-5">
          <TrendingRow />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col basis-[70%]">
            {data && <PostsSection posts={data.posts} />}
          </div>

          <div className="flex flex-col flex-grow gap-2 pl-2">
            <PopularCommunities />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = await request(GET_POSTS);

  return {
    props: {
      posts: data?.posts || [],
    },
    revalidate: 10,
  };
};

export default Home;
