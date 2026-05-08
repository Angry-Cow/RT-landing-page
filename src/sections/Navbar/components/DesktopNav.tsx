export const DesktopNav = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-8 hidden min-h-0 min-w-0 outline-[3px] gap-y-8 md:flex md:min-h-[auto] md:min-w-[auto]">
      <button className="relative text-amber-600 text-sm font-semibold bg-transparent caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] text-center p-0 md:block md:min-h-[auto] md:min-w-[auto]">
        Services
        <span className="absolute bg-amber-600 box-border caret-transparent block h-0.5 outline-[3px] rounded-full -bottom-1 inset-x-0"></span>
      </button>
      <button className="relative text-gray-800 text-sm font-semibold bg-transparent caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] text-center p-0 md:block md:min-h-[auto] md:min-w-[auto] hover:text-amber-600">
        Why Us
      </button>
      <button className="relative text-gray-800 text-sm font-semibold bg-transparent caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] text-center p-0 md:block md:min-h-[auto] md:min-w-[auto] hover:text-amber-600">
        Courses
      </button>
      <button className="relative text-gray-800 text-sm font-semibold bg-transparent caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] text-center p-0 md:block md:min-h-[auto] md:min-w-[auto] hover:text-amber-600">
        Pricing
      </button>
      <button className="relative text-gray-800 text-sm font-semibold bg-transparent caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] text-center p-0 md:block md:min-h-[auto] md:min-w-[auto] hover:text-amber-600">
        FAQ
      </button>
      <button className="relative text-gray-800 text-sm font-semibold bg-transparent caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] text-center p-0 md:block md:min-h-[auto] md:min-w-[auto] hover:text-amber-600">
        Contact
      </button>
      <button className="text-white text-sm font-bold bg-sky-900 caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] text-center px-5 py-2 rounded-full md:block md:min-h-[auto] md:min-w-[auto] hover:bg-sky-950">
        Book Now
      </button>
    </div>
  );
};
