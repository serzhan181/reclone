import type { NextPage } from "next";
import {
  TrendingRow,
  PopularCommunities,
  Categories,
  ContentMainPage,
} from "@/src/organisms";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex w-full mb-5">
          <TrendingRow />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col w-[70%]">
            <ContentMainPage />
          </div>

          <div className="flex gap-2 flex-col w-[30%] pl-2">
            <PopularCommunities />

            <Categories />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
