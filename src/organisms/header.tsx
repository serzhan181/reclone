import { Button, Input } from "@/src/atoms";
import { Search } from "react-feather";
import Link from "next/link";
import { AuthSection, Dropdown } from "@/src/molecules";
import { useAuthStore } from "@/src/store/auth.store";
import { useUserStore } from "../store/user.store";

export const Header = () => {
  const { user } = useUserStore();
  const auth = useAuthStore();

  const MOCK_OPTIONS = [
    { actionTitle: "logout", href: "/", onClick: () => auth.logout() },
  ];

  return (
    <div className="fixed top-0 z-50 flex w-full h-12 bg-white border-b flex-center">
      <div className="flex justify-between items-center h-full w-[90%] ">
        <div>
          <Link href="/">logo</Link>
        </div>
        <div className="flex gap-1 w-96">
          <Input placeholder="search reclone" />
          <Button size="s">
            <Search />
          </Button>
        </div>
        <div className="flex gap-3">
          {auth?.authenticated ? (
            <Dropdown title={user?.username || ""} options={MOCK_OPTIONS} />
          ) : (
            <AuthSection />
          )}
        </div>
      </div>
    </div>
  );
};
