import { Button, Input } from "@/src/atoms";
import { Search } from "react-feather";

export const Header = () => {
  return (
    <div className="fixed top-0 flex w-full h-12 bg-white border-b flex-center">
      <div className="flex justify-between items-center h-full w-[90%] ">
        <div>logo</div>
        <div className="flex gap-1 w-96">
          <Input placeholder="search reclone" />
          <Button size="s">
            <Search />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button uppercase>log in</Button>
          <Button uppercase outline rounded>
            sign in
          </Button>
        </div>
      </div>
    </div>
  );
};
