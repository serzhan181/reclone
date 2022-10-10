import type { NextPage } from "next";
import { TrendingRow, PopularCommunities } from "@/src/organisms";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full">
        <TrendingRow />
        <PopularCommunities />
        <div className=" border p-6 mt-2 basis-[70%]">Future content</div>
      </div>
    </>
  );
};

export default Home;
