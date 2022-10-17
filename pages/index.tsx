import type { NextPage } from "next";
import { ContentCard } from "@/src/molecules";
import { TrendingRow, PopularCommunities, Categories } from "@/src/organisms";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-wrap w-full flex-center">
        <div className="flex w-full mb-5">
          <TrendingRow />
        </div>

        <div className="flex w-full">
          <div className="flex flex-col gap-2 w-[70%]">
            <ContentCard
              imgSrc="https://images.unsplash.com/photo-1543357480-c60d40007a3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZWRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              title="i like men"
            />

            <ContentCard
              imgSrc="https://images.unsplash.com/photo-1665994658139-ba312e2bf060?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              title="KKK meeting. where and when"
            />
          </div>

          <div className="flex gap-2 flex-col w-[30%] pl-2">
            <PopularCommunities />

            {/* categories */}
            <Categories />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
