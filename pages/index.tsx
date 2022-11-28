import type { GetStaticProps, NextPage } from "next";
import { PopularCommunities, PostsSection } from "@/src/organisms";
import { GET_POSTS } from "@/src/graphql/api/posts.graphql";
import { GetPost } from "@/src/types";
import { useQuery } from "react-query";
import { request } from "@/src/graphql/custom-gql-fns";
import { NextSeo } from "next-seo";
import { Tabs } from "@/src/molecules";
import { useAuthStore } from "@/src/store/auth.store";
import { Button } from "@/src/atoms";
import { useRouter } from "next/router";

const Home: NextPage<{ posts: GetPost[] }> = (props) => {
  const {
    data,
    isLoading,
    refetch: refetchPosts,
  } = useQuery<{ posts: GetPost[] }>(
    ["posts"],
    async () => await request(GET_POSTS),
    {
      initialData: { posts: props.posts },
    }
  );

  const authenticated = useAuthStore((state) => state.authenticated);

  const tabs = ["home"];
  if (authenticated) tabs.push("feed");

  // Fetch communities posts to which user subscribed
  const {
    data: dataForMe,
    refetch,
    isLoading: isLoadingForMe,
  } = useQuery<{ posts: GetPost[] }>(
    ["posts", "for_me"],
    async () => await request(GET_POSTS, { forUserSubscribed: true }),
    { refetchOnMount: false, refetchOnWindowFocus: false, enabled: false }
  );

  const router = useRouter();

  return (
    <>
      <NextSeo title="Reclone" />
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex w-full">
          {/* Main content */}
          <div className="flex flex-col basis-[70%]">
            {data && (
              <Tabs
                tabs={tabs}
                onTabChange={(i) => {
                  // index of array (in this case tabs on line 22)
                  if (tabs[i] === "feed") refetch();
                  if (tabs[i] === "home") refetchPosts();
                }}
                contents={[
                  {
                    id: 0,
                    content: (
                      <PostsSection
                        isLoading={isLoading}
                        posts={data?.posts || []}
                      />
                    ),
                  },
                  {
                    id: 1,
                    content: (
                      <PostsSection
                        isLoading={isLoadingForMe}
                        posts={dataForMe?.posts || []}
                        queryIds={["posts", "for_me"]}
                      />
                    ),
                  },
                ]}
              />
            )}
          </div>

          <div className="flex flex-col basis-[30%] gap-2 pl-2">
            <PopularCommunities />
            <Button onClick={() => router.push("/create/post")}>
              Create post
            </Button>
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
