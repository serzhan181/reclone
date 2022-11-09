import { Button, Input } from "@/src/atoms";
import { Search } from "react-feather";
import Link from "next/link";
import { AuthButtons } from "@/src/molecules/auth-buttons";

export const Header = () => {
  return (
    <>
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
            <AuthButtons />
          </div>
        </div>
      </div>
    </>
  );
};
