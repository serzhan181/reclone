import Image from "next/image";
import { FC } from "react";

interface ITrendingCard {
  title: string;
  description: string;
  imgSrc: string;
}

export const TrendingCard: FC<ITrendingCard> = ({
  title,
  description,
  imgSrc,
}) => {
  return (
    <div className="relative flex cursor-pointer">
      <div
        className={`overflow-hidden flex w-64 h-56 p-6 rounded-lg bg-black bg-opacity-50`}
      >
        <Image
          src={imgSrc}
          layout="fill"
          className="absolute top-0 bottom-0 left-0 right-0 object-cover h-full rounded-lg -z-10"
          alt="s"
        />
        <div className="flex flex-col justify-end h-full overflow-hidden">
          <h5 className="mb-2 text-xl font-semibold text-white capitalize">
            {title}
          </h5>
          <p className="overflow-hidden text-base text-white text-ellipsis whitespace-nowrap">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
