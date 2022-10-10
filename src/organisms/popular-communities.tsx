import { CommunitySuggest } from "@/src/molecules";

export const PopularCommunities = () => {
  return (
    <div className="flex flex-col pl-2 gap-1 basis-[30%]">
      {/* Title */}
      <h3 className="text-sm font-semibold">Popular communities</h3>

      <div className="bg-white rounded">
        <CommunitySuggest
          avatarUrl="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          title="ilikemen"
        />
        <CommunitySuggest
          avatarUrl="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          title="nahimjustkidding"
        />
        <CommunitySuggest
          avatarUrl="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          title="ornot?"
        />
      </div>
    </div>
  );
};
