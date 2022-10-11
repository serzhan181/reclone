import type { NextPage } from "next";
import { TrendingRow, PopularCommunities, Accordion } from "@/src/organisms";
import { accordion_data } from "@/public/constants";

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
          <Accordion options={accordion_data}>
            {(option) => <p>{option.description}</p>}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Home;
