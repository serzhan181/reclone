import { AUTH_ME } from "@/graphql/api/auth-graphql";
import { request } from "@/graphql/client";
import { IMe } from "@/types";
import UserIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { AuthButtons } from "./auth-buttons";

async function getMe(): Promise<{ data: { me: IMe } }> {
  try {
    const data = await request<{ data: { me: IMe } }>(AUTH_ME);
    return data;
  } catch (error) {
    return {
      data: {
        me: {
          authenticated: false,
        },
      },
    };
  }
}

export const Header = async () => {
  const {
    data: { me },
  } = await getMe();
  return (
    <header className="fixed top-0 flex items-center justify-between w-full h-20 px-5 rounded-b shadow-md bg-primary">
      {/* Logo */}
      <div>YOUR LOGO HERE</div>
      <div className="w-[625px]">
        <input
          type="text"
          placeholder="Search for topics"
          className="w-full input input-info"
        />
      </div>
      <div>
        {me.authenticated ? (
          <button className="avatar">
            <div className="relative rounded-full w-14">
              <UserIcon />
            </div>
          </button>
        ) : (
          <AuthButtons />
        )}
      </div>
    </header>
  );
};
