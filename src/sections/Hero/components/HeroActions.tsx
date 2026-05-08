export const HeroActions = () => {
  return (
    <div className="box-border caret-transparent gap-x-4 flex flex-col outline-[3px] gap-y-4 md:flex-row">
      <button className="text-white text-lg font-bold items-center bg-amber-600 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(217,130,43,0.3)_0px_20px_25px_-5px,rgba(217,130,43,0.3)_0px_8px_10px_-6px] caret-transparent gap-x-2 flex justify-center leading-7 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-center px-10 py-4 rounded-full hover:bg-amber-600/90">
        <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px]">
          Book a Course
        </span>
        <img
          src="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-4.svg"
          alt="Icon"
          className="box-border caret-transparent h-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] w-5"
        />
      </button>
      <button className="text-white text-lg font-bold backdrop-blur-md bg-white/10 caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-center border px-10 py-4 rounded-full border-white/30 hover:bg-white/20">
        <span className="box-border caret-transparent outline-[3px]">
          View Courses
        </span>
      </button>
    </div>
  );
};
