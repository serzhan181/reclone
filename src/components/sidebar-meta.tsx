import { isAuthedServer } from "@/utils/is-authed";
import Link from "next/link";

export const SidebarMeta = async () => {
  const isAuthenticated = await isAuthedServer();

  return (
    <div className="basis-[15%] gap-5 flex flex-col">
      <div>
        {isAuthenticated && (
          <Link href="/submit/post" className="w-full btn btn-primary">
            Create a post
          </Link>
        )}
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
