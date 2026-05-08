export const FloatingActionButton = () => {
  return (
    <div className="fixed items-end box-border caret-transparent gap-x-3 flex flex-col outline-[3px] gap-y-3 z-40 right-6 bottom-6 md:hidden">
      <button
        aria-label="Book a Course"
        className="text-white bg-amber-600 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(217,130,43,0.5)_0px_25px_50px_-12px] caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] text-center p-4 rounded-full md:inline-block md:min-h-0 md:min-w-0 hover:bg-amber-700"
      >
        <img
          src="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-15.svg"
          alt="Book a Course"
          className="box-border caret-transparent h-6 max-w-full outline-[3px] w-6"
        />
      </button>
    </div>
  );
};
