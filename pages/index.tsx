import type { NextPage } from "next";
import { ContentCard } from "@/src/molecules";
import { TrendingRow, PopularCommunities, Categories } from "@/src/organisms";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex flex-col gap-2">
          <div className="flex mb-5">
            <TrendingRow />
          </div>

          <div className="flex">
            <div className="flex flex-col gap-2 w-[70%]">
              <ContentCard />
              <ContentCard />
            </div>

            <div className="flex gap-2 flex-col w-[30%] pl-2">
              <PopularCommunities />

              {/* categories */}
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
