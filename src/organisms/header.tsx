import { Button } from "@/src/atoms";

export const Header = () => {
  return (
    <div className="flex flex-center fixed top-0 h-12 w-full border-b">
      <div className="flex justify-between items-center h-full w-[90%] ">
        <div>logo</div>
        <div>search</div>
        <div className="flex gap-3">
          <Button>log in</Button>
          <Button outline rounded>
            sign in
          </Button>
        </div>
      </div>
    </div>
  );
};
