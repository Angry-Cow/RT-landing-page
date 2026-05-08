export const MobileNavMenu = () => {
  return (
    <div className="bg-white box-border caret-transparent block max-h-0 opacity-0 outline-[3px] border-gray-100 overflow-hidden border-t border-solid md:hidden">
      <div className="box-border caret-transparent gap-x-4 flex flex-col outline-[3px] gap-y-4 px-6 py-4">
        <button className="text-amber-600 text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-left px-0 py-1 md:min-h-0 md:min-w-0">
          Services
        </button>
        <button className="text-gray-800 text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-left px-0 py-1 md:min-h-0 md:min-w-0 hover:text-amber-600">
          Why Us
        </button>
        <button className="text-gray-800 text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-left px-0 py-1 md:min-h-0 md:min-w-0 hover:text-amber-600">
          Courses
        </button>
        <button className="text-gray-800 text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-left px-0 py-1 md:min-h-0 md:min-w-0 hover:text-amber-600">
          Pricing
        </button>
        <button className="text-gray-800 text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-left px-0 py-1 md:min-h-0 md:min-w-0 hover:text-amber-600">
          FAQ
        </button>
        <button className="text-gray-800 text-sm font-semibold bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-left px-0 py-1 md:min-h-0 md:min-w-0 hover:text-amber-600">
          Contact
        </button>
        <button className="text-white text-sm font-bold bg-amber-600 caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center mt-2 px-6 py-2.5 rounded-full md:min-h-0 md:min-w-0 hover:bg-amber-600/90">
          Book a Course
        </button>
      </div>
    </div>
  );
};
