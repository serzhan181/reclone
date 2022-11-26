import { CommunitySuggest } from "@/src/molecules";
import { useQuery } from "react-query";
import { Button } from "../atoms";
import { GET_SUBS_POPULAR } from "../graphql/api/subs.graphql";
import { request } from "../graphql/custom-gql-fns";
import { GetSubsPopular } from "../types";

export const PopularCommunities = () => {
  const { data } = useQuery(
    ["subs", "popular"],
    async () =>
      await request<{ subsPopular: GetSubsPopular[] }>(GET_SUBS_POPULAR)
  );

  return (
    <div className="flex flex-col w-full gap-1">
      {/* Title */}
      <h3 className="text-sm font-semibold">Popular communities</h3>

      <div className="py-2 bg-white rounded">
        {data?.subsPopular &&
          data.subsPopular.map((s) => (
            <CommunitySuggest
              key={s.id}
              name={s.name}
              avatarUrl={s.subImgUrl}
              isSubscribed={s.isUserSubscribed}
              queryIds={["subs", "popular"]}
            />
          ))}
      </div>
    </div>
  );
};
