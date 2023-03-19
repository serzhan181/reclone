import { IMe } from "@/types";
import UserIcon from "@heroicons/react/24/outline/UserCircleIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { AuthButtons } from "./auth-buttons";
import Image from "next/image";
import { getToken } from "@/utils/get-token";
import { authRequest } from "@/graphql/requests/auth-requests";
import { MeSet } from "./me-set";
import Link from "next/link";

async function getMe(): Promise<{ me: IMe }> {
  try {
    const token = getToken();
    const data = await authRequest.me({ token });

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
    <MeSet user={me.user}>
      <header className="fixed top-0 z-50 flex items-center justify-between w-full h-20 px-5 rounded-b shadow-md bg-primary">
        {/* Logo */}
        <div>YOUR LOGO HERE</div>
        <div className="w-[625px]">
          <input
            type="text"
            placeholder="Search for topics"
            className="hidden w-full md:block input input-info"
          />
        </div>
        <div>
          {me.authenticated ? (
            <div className="flex items-center gap-2">
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

              <Link href="/submit/post" className="btn btn-primary">
                <PlusIcon className="w-8" />
              </Link>
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>
      </header>
    </MeSet>
  );
};
