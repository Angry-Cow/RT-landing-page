export const FooterBrand = () => {
  return (
    <div className="box-border caret-transparent col-end-auto col-start-auto min-h-[auto] min-w-[auto] outline-[3px] md:col-end-[span_2] md:col-start-[span_2]">
      <div className="items-center box-border caret-transparent gap-x-3 flex outline-[3px] gap-y-3 mb-6">
        <img
          src="https://c.animaapp.com/moua5fr1i7rxTv/assets/uploaded-asset-1775135956982-1.png"
          alt="TOLR — Tools Of Last Resort"
          className="box-border caret-transparent h-20 max-w-full min-h-[auto] min-w-[auto] object-contain outline-[3px]"
        />
        <div className="box-border caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px]">
          <span className="text-2xl font-bold box-border caret-transparent block tracking-[2.4px] leading-[30px] min-h-[auto] min-w-[auto] outline-[3px]">
            T.O.L.R.
            <sup className="relative text-sm box-border caret-transparent leading-5 outline-[3px] top-[-7px] align-baseline">
              ™
            </sup>
          </span>
          <span className="text-white/70 text-sm box-border caret-transparent block leading-[19.25px] min-h-[auto] min-w-[auto] outline-[3px]">
            Tools Of Last Resort
          </span>
        </div>
      </div>
      <p className="text-white/50 box-border caret-transparent leading-[26px] max-w-md outline-[3px]">
        <span className="box-border caret-transparent outline-[3px]">
          Providing personal awareness and defense, NJ CCW, and life-saving
          medical training in South Plainfield, NJ. Our mission is to empower
          the community through safety-first instruction.
        </span>
      </p>
    </div>
  );
};
