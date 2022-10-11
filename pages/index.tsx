import type { NextPage } from "next";
import { TrendingRow, PopularCommunities, Accordion } from "@/src/organisms";

// TODO: Create accordion for categories

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col gap-2 w-[70%]">
          <TrendingRow />

          <div className="flex border">future contento</div>
        </div>

        <div className="flex gap-2 flex-col w-[30%] pl-2">
          <PopularCommunities />

          {/* categories */}
          <Accordion />
        </div>
      </div>
    </>
  );
};

export default Home;
