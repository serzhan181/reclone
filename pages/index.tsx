import type { NextPage } from "next";
import { TrendingRow, PopularCommunities, Accordion } from "@/src/organisms";
import { accordion_data } from "@/public/constants";
import { Button } from "@/src/atoms";

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
            {(option) => (
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 ml-3">
                  {option.communities.map((c) => (
                    <a
                      key={c}
                      className="text-sm font-semibold text-slate-800 hover:underline"
                      href="/"
                    >
                      {c}
                    </a>
                  ))}
                </div>
                <div>
                  <Button size="s" transparent uppercase rounded>
                    Show more
                  </Button>
                </div>
              </div>
            )}
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Home;
