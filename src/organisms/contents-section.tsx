import { FC } from "react";
import { ContentCard } from "../molecules";
import { IPostMinimal } from "../types";

export const ContentsSection: FC<{ posts: IPostMinimal[] }> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-2">
      {posts?.map((p) => (
        <ContentCard key={p.identifier} imgSrc={p.postImgUrn} title={p.title} />
      ))}
    </div>
  );
};
