export const CourseFilters = () => {
  return (
    <div className="box-border caret-transparent gap-x-3 flex flex-wrap justify-center outline-[3px] gap-y-3 mb-12">
      <button className="text-white text-sm font-semibold items-center bg-sky-900 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.1)_0px_2px_4px_-2px] caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center border border-sky-900 px-5 py-2.5 rounded-full scale-105">
        All
        <span className="text-xs font-bold items-center bg-amber-500 box-border caret-transparent flex h-5 justify-center leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-5 rounded-full">
          8
        </span>
      </button>
      <button className="text-sky-900 text-sm font-semibold items-center bg-white caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center border border-gray-200 px-5 py-2.5 rounded-full hover:bg-sky-50 hover:border-sky-900">
        First Aid
        <span className="text-gray-500 text-xs font-bold items-center bg-slate-100 box-border caret-transparent flex h-5 justify-center leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-5 rounded-full">
          0
        </span>
      </button>
      <button className="text-sky-900 text-sm font-semibold items-center bg-white caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center border border-gray-200 px-5 py-2.5 rounded-full hover:bg-sky-50 hover:border-sky-900">
        Personal Defense
        <span className="text-gray-500 text-xs font-bold items-center bg-slate-100 box-border caret-transparent flex h-5 justify-center leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-5 rounded-full">
          2
        </span>
      </button>
      <button className="text-sky-900 text-sm font-semibold items-center bg-white caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center border border-gray-200 px-5 py-2.5 rounded-full hover:bg-sky-50 hover:border-sky-900">
        Personal Awareness
        <span className="text-gray-500 text-xs font-bold items-center bg-slate-100 box-border caret-transparent flex h-5 justify-center leading-4 min-h-[auto] min-w-[auto] outline-[3px] w-5 rounded-full">
          0
        </span>
      </button>
    </div>
  );
};
