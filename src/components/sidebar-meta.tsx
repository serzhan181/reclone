import Link from "next/link";

export const SidebarMeta = () => {
  return (
    <div className="basis-[15%] gap-5 flex flex-col">
      <div>
        <button className="w-full btn btn-primary">Create a post</button>
      </div>

      <div className="flex flex-col gap-3 p-3 rounded shadow-md bg-primary">
        <h2 className="font-semibold">Popular communities</h2>

        <ul className="flex flex-col gap-2">
          <li className="flex justify-between w-full">
            <Link href="/">r/69</Link>
            <span>69</span>
          </li>

          <li className="flex justify-between">
            <Link href="/">r/community</Link>
            <span>69</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
