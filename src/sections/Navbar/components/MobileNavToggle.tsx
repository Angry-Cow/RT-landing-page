export const MobileNavToggle = () => {
  return (
    <button
      aria-label="Open menu"
      className="items-center bg-transparent caret-transparent gap-x-1.5 flex flex-col h-8 justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 text-center w-8 p-1 md:hidden md:min-h-0 md:min-w-0"
    >
      <span className="bg-gray-800 box-border caret-transparent block h-0.5 min-h-[auto] min-w-[auto] outline-[3px] w-6 rounded-bl rounded-br rounded-tl rounded-tr md:min-h-0 md:min-w-0"></span>
      <span className="bg-gray-800 box-border caret-transparent block h-0.5 min-h-[auto] min-w-[auto] outline-[3px] w-6 rounded-bl rounded-br rounded-tl rounded-tr md:min-h-0 md:min-w-0"></span>
      <span className="bg-gray-800 box-border caret-transparent block h-0.5 min-h-[auto] min-w-[auto] outline-[3px] w-6 rounded-bl rounded-br rounded-tl rounded-tr md:min-h-0 md:min-w-0"></span>
    </button>
  );
};
