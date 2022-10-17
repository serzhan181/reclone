import { ThumbsUp, ThumbsDown } from "react-feather";

// TODO: Find a way to replace <img /> to <Image /> (next/image)

export const ContentCard = () => {
  return (
    <div className="flex w-full overflow-hidden rounded border-slate-700">
      <div className="w-full p-2 bg-white">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-semibold cursor-pointer">Title</h2>
          </div>

          <div className="flex gap-2 text-gray-600 select-none">
            <div className="flex justify-between gap-2">
              <p className="text-sm">69</p>
              <ThumbsUp className="w-4 duration-200 cursor-pointer active:stroke-red-800 hover:stroke-red-400" />
            </div>
            <div className="flex justify-between gap-2">
              <ThumbsDown className="w-4 duration-200 cursor-pointer active:stroke-green-800 hover:stroke-green-400" />
              <p className="text-sm">667</p>
            </div>
          </div>
        </div>

        <div className="w-full ">
          <img
            src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlZWRvbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="hello"
            className="max-h-[460px] min-h-[100px] w-full object-contain"
          />
        </div>

        <div>comments</div>
      </div>
    </div>
  );
};
