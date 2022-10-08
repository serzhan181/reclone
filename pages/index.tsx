import type { NextPage } from "next";
import { TrendingRow } from "@/src/organisms";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full">
        <TrendingRow />
        <div className="basis-[30%] border p-6">
          Popular communities, popular forums
        </div>
        <div className=" border p-6 mt-2 basis-[70%]">Future content</div>
      </div>
    </>
  );
};

export default Home;
