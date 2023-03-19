import { subsRequests } from "@/graphql/requests/subs-requests";
import { RoundedImage } from "@/shared/ui/rounded-image";
import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import CakeIcon from "@heroicons/react/24/outline/CakeIcon";
import { getToken } from "@/utils/get-token";
import { postsRequests } from "@/graphql/requests/post-requests";
import { Post } from "@/components/post";
import { Metadata } from "next";
import { SubFront } from "./sub-front";

interface SubPageParams {
  params: { sub: string };
}

const getSubAndPosts = async ({ params }: SubPageParams) => {
  const token = getToken();
  const { sub } = await subsRequests.getSub({ name: params.sub, token });
  const { postsBySubName } = await postsRequests.getPostsBySubname({
    subName: params.sub,
    token,
  });

  return {
    sub,
    postsBySubName,
  };
};

export async function generateMetadata({
  params,
}: SubPageParams): Promise<Metadata> {
  const { sub } = await getSubAndPosts({ params });
  return {
    title: sub.title,
    description: sub.description,
    authors: [{ name: sub.creator_name }],
    openGraph:
      sub.bannerImgUrl || sub.subImgUrl
        ? {
            images: [
              {
                url: sub.bannerImgUrl,
              },
              {
                url: sub.subImgUrl,
              },
            ],
          }
        : {},
  };
}
const SubPage = async ({ params }: SubPageParams) => {
  const { postsBySubName, sub } = await getSubAndPosts({ params });

  return (
    <div className="flex gap-5">
      <div className="flex flex-col gap-5 md:basis-[75%]">
        {/* header */}
        <SubFront
          subName={sub.name}
          subDisplayName={sub.title}
          bgImg={sub.bannerImgUrl}
          subImg={sub.subImgUrl}
          isUserSubscribed={sub.isUserSubscribed}
        />

        {/* Community posts */}
        <div
          className={classNames("flex flex-col gap-5", {
            "mt-16": sub.bannerImgUrl,
          })}
        >
          {postsBySubName.map((p) => (
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
              postImg={p.postImgUrl}
              id={p.id}
            />
          ))}
        </div>
      </div>

      {/* About */}
      <div className="hidden md:block md:grow">
        <AboutCard
          createdAt={sub.createdAt}
          description={sub.description}
          subsCount={sub.subsribersCount}
        />
      </div>
    </div>
  );
};

// Sidebar related
interface AboutCardProps {
  description: string;
  subsCount: number;
  createdAt: string;
}

const AboutCard = ({ description, subsCount, createdAt }: AboutCardProps) => {
  return (
    <div className="overflow-hidden rounded-md bg-primary/20">
      <div className="p-3 bg-primary">
        <h1 className="text-lg font-semibold text-white">About community</h1>
      </div>

      <div className="flex flex-col gap-3 p-3">
        <div>
          <p>{description}</p>
        </div>

        <div className="flex items-center">
          <CakeIcon className="w-6" />

          <p className="ml-2 text-sm text-gray-500">
            Created {dayjs(createdAt).format("MMM D, YYYY")}
          </p>
        </div>

        <div className="flex flex-col flex-center">
          <p className="text-lg font-semibold">{subsCount}</p>
          <p className="text-sm text-gray-500">followers</p>
        </div>
      </div>
    </div>
  );
};

export default SubPage;
