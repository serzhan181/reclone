import { Post } from "@/components/post";
import { postsRequests } from "@/graphql/requests/post-requests";
import { getToken } from "@/utils/get-token";
import { Comment } from "./comment";
import { LocalComments } from "./local-comments";
import { SubmitComment } from "./submit-comment";

interface PostPageParams {
  params: { sub: string; post: [string, string] };
}

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: PostPageParams) {
  const [identifier, slug] = params.post;
  const token = getToken();

  const { post } = await postsRequests.getPost({ token, identifier, slug });
  const {
    post: { comments },
  } = await postsRequests.getPostComments({ token, identifier, slug });

  return (
    <div className="flex flex-col w-full gap-3">
      <Post
        id={post.id}
        key={post.id}
        href={`/r/${post.subName}/${post.identifier}/${post.slug}`}
        title={post.title}
        voteScore={post.voteScore}
        subName={post.subName}
        authorName={post.user.username}
        createdAt={post.createdAt}
        commentCount={post.commentCount}
        subImg={post.subImgUrl}
        body={post.body}
        userVote={post.userVote}
      />

      <SubmitComment
        identifier={post.identifier}
        slug={post.slug}
        postId={post.id}
      />

      <div className="flex flex-col gap-3">
        {/* If user adds a new comment, it needs to be responsive and happen immediately */}
        <LocalComments />
        {comments.map((c) => (
          <Comment
            key={c.id}
            body={c.body}
            createdAt={c.createdAt}
            username={c.user.username}
            userImg={c.user.profile_picture_urn}
          />
        ))}
      </div>
    </div>
  );
}
