import type { NextPage } from "next";
import { TrendingRow, PopularCommunities } from "@/src/organisms";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full">
        <div className="flex w-[70%]">
          <TrendingRow />
        </div>

        <div className="flex w-[30%]">
          <PopularCommunities />
        </div>
      </div>
    </>
  );
};

export default Home;
