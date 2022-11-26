import { CommunitySuggest } from "@/src/molecules";
import { Button } from "../atoms";

export const PopularCommunities = () => {
  return (
    <div className="flex flex-col w-full gap-1">
      {/* Title */}
      <h3 className="text-sm font-semibold">Popular communities</h3>

      <div className="py-2 bg-white rounded">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <CommunitySuggest
            key={i}
            avatarUrl="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            title="ornot?"
          />
        ))}

        <div className="flex mt-3 flex-center">
          <div className="w-full px-2">
            <Button full>View all</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
