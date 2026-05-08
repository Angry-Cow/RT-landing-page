export const Brand = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-4 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-4">
      <div className="items-center box-border caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3">
        <img
          src="https://c.animaapp.com/moua5fr1i7rxTv/assets/uploaded-asset-1775135956982-1.png"
          alt="T.O.L.R. - Tools Of Last Resort"
          className="box-border caret-transparent h-20 max-w-full min-h-[auto] min-w-[auto] outline-[3px]"
        />
      </div>
      <div className="box-border caret-transparent hidden flex-col justify-center leading-[22px] min-h-0 min-w-0 outline-[3px] md:flex md:min-h-[auto] md:min-w-[auto]">
        <span className="text-amber-600 text-3xl font-bold box-border caret-transparent inline tracking-[0.75px] leading-9 min-h-0 min-w-0 outline-[3px] md:text-4xl md:block md:tracking-[0.9px] md:leading-10 md:min-h-[auto] md:min-w-[auto]">
          T.O.L.R.
          <sup className="relative text-lg box-border caret-transparent tracking-[0.75px] leading-7 outline-[3px] top-[-9px] align-baseline md:text-xl md:tracking-[0.9px] md:-top-2.5">
            ™
          </sup>
        </span>
        <span className="text-amber-600 text-sm font-semibold box-border caret-transparent inline tracking-[1.4px] leading-5 min-h-0 min-w-0 outline-[3px] uppercase md:text-base md:block md:tracking-[1.6px] md:leading-6 md:min-h-[auto] md:min-w-[auto]">
          Tools Of Last Resort
        </span>
      </div>
    </div>
  );
};
