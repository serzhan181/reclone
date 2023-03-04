import { AUTH_ME } from "@/graphql/api/auth-graphql";
import { request } from "@/graphql/client";
import { IMe } from "@/types";
import UserIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { AuthButtons } from "./auth-buttons";
import { cookies } from "next/headers";
import Image from "next/image";

async function getMe(): Promise<{ me: IMe }> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(
      process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string
    );
    const data = await request<{ me: IMe }>(AUTH_ME, undefined, token?.value);

    return data;
  } catch (error) {
    return {
      me: {
        authenticated: false,
      },
    };
  }
}

export const Header = async () => {
  const { me } = await getMe();
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
              {me.user?.profile_picture_urn ? (
                <Image
                  src={me.user.profile_picture_urn}
                  alt={me.user.username}
                  fill
                />
              ) : (
                <UserIcon />
              )}
            </div>
          </button>
        ) : (
          <AuthButtons />
        )}
      </div>
    </header>
  );
};
