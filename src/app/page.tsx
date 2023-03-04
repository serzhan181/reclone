import { Post } from "@/components/post";
import { postsRequests } from "@/graphql/requests/post-requests";
import { getToken } from "@/utils/get-token";

export const dynamic = "force-dynamic";

export default async function Home() {
  const token = getToken();
  const { posts } = await postsRequests.getPosts({ token });

  return (
    <div className="flex flex-col gap-8">
      {posts.map((p) => (
        <Post
          key={p.id}
          href={`/r/${p.subName}/${p.identifier}/${p.slug}`}
          title={p.title}
          voteScore={p.voteScore}
          userVote={p.userVote}
          subName={p.subName}
          authorName={p.user.username}
          createdAt={p.createdAt}
          commentCount={p.commentCount}
          subImg={p.subImgUrl}
          id={p.id}
        />
      ))}
    </div>
  );
}
