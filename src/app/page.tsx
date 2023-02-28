import { Post } from "@/components/post";
import { gqlClient } from "@/graphql/setup";
import { GetPost } from "@/types";
import { gql } from "graphql-request";

async function getPosts() {
  const POSTS = gql`
    query Posts($forUserSubscribed: Boolean) {
      posts(forUserSubscribed: $forUserSubscribed) {
        id
        identifier
        slug
        title
        subName
        voteScore
        commentCount
        userVote

        postImgUrl
        subImgUrl

        createdAt
        user {
          username
        }
      }
    }
  `;

  const data = await gqlClient.request<{ posts: GetPost[] }>(POSTS);

  return data;
}

export default async function Home() {
  const { posts } = await getPosts();

  return (
    <div className="flex flex-col gap-8">
      {posts.map((p) => (
        <Post
          key={p.id}
          href={`/${p.identifier}/${p.slug}`}
          title={p.title}
          voteScore={p.voteScore}
          subName={p.subName}
          authorName={p.user.username}
          createdAt={p.createdAt}
          commentCount={p.commentCount}
          subImg={p.subImgUrl}
        />
      ))}
    </div>
  );
}
