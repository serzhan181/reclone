import { Post } from "@/components/post";
import { postsRequests } from "@/graphql/requests/post-requests";

export default async function Home() {
  const { posts } = await postsRequests.getPosts();

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
