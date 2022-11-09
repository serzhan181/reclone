import { Button } from "@/src/atoms";
import { Send } from "react-feather";

export const WriteComment = () => {
  return (
    <form className="flex w-full h-full overflow-hidden rounded">
      <textarea
        name="comment_body"
        placeholder="What are your thoughts?"
        className="w-full p-1 min-h-[100px]"
      />
      <div className="self-center h-full w-fit">
        <Button full noRound>
          <Send />
        </Button>
      </div>
    </form>
  );
};
