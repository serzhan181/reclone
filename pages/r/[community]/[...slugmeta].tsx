import { useRouter } from "next/router";
import type { PageWithLayout } from "@/pages/_app";
import { PostLayout } from "@/src/layouts";
import { ReactElement, useEffect } from "react";
import { ContentCard, WriteComment } from "@/src/molecules";

const Post: PageWithLayout = () => {
  const router = useRouter();
  // console.log(router);
  useEffect(() => {
    if (router.isReady) {
      const [id, slug] = router.query.slugmeta as string[];
      console.log("id", id);
      console.log("slug", slug);
    }
  }, [router.isReady, router.query.slugmeta]);

  return (
    <div className="flex flex-col w-full gap-2 mt-3 ">
      <div>
        {/* Post */}
        <ContentCard
          imgSrc="https://images.unsplash.com/photo-1543357480-c60d40007a3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZWRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          title="i like men"
        />
      </div>
      <div className="flex flex-center">
        <WriteComment />
      </div>
    </div>
  );
};

Post.getLayout = (page: ReactElement) => <PostLayout>{page}</PostLayout>;

export default Post;
