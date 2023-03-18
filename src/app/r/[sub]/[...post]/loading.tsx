export default function PostPageLoading() {
  return (
    <div className="w-full p-4 rounded-md shadow">
      <div className="flex space-x-4 animate-pulse">
        <div className="flex flex-col w-10 gap-2 overflow-hidden rounded-md bg-slate-700">
          <div className="w-full h-5 overflow-hidden"></div>
          <div className="w-full h-5 overflow-hidden"></div>
          <div className="w-full h-5 overflow-hidden"></div>
        </div>
        <div className="flex-1 py-1 space-y-6">
          <div className="h-2 rounded bg-slate-700"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 col-span-2 rounded bg-slate-700"></div>
              <div className="h-2 col-span-1 rounded bg-slate-700"></div>
            </div>
            <div className="h-2 rounded bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
