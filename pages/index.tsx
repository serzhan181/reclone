import type { NextPage } from "next";
import {
  TrendingRow,
  PopularCommunities,
  Categories,
  ContentsSection,
} from "@/src/organisms";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex w-full mb-5">
          <TrendingRow />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col basis-[70%]">
            <ContentsSection />
          </div>

          <div className="flex flex-col flex-grow gap-2 pl-2">
            <PopularCommunities />

            <Categories />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
