import type { NextPage } from "next";
import { TrendingCard } from "@/src/molecules";

const Home: NextPage = () => {
  return (
    <div className="flex pt-2 flex-center">
      <div className="container flex gap-2 overflow-hidden border-x">
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
      </div>
    </div>
  );
};

export default Home;
