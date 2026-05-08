export const CtaSection = () => {
  return (
    <section className="relative box-border caret-transparent outline-[3px] overflow-hidden py-32">
      <div className="absolute box-border caret-transparent outline-[3px] z-0 inset-0">
        <img
          src="https://c.animaapp.com/moua5fr1i7rxTv/assets/cta-bg.png"
          alt="Medical Gear"
          className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] w-full"
        />
        <div className="absolute bg-sky-900/90 box-border caret-transparent outline-[3px] inset-0"></div>
      </div>
      <div className="relative box-border caret-transparent max-w-none outline-[3px] text-center w-full z-10 mx-auto px-6 md:max-w-screen-xl">
        <h2 className="text-white text-4xl font-bold box-border caret-transparent leading-10 max-w-4xl outline-[3px] mb-8 mx-auto md:text-6xl md:leading-[60px]">
          <span className="text-4xl box-border caret-transparent leading-10 outline-[3px] md:text-6xl md:leading-[60px]">
            Empower Yourself with Life‑Saving Skills Today.
          </span>
        </h2>
        <p className="text-white/70 text-xl box-border caret-transparent leading-7 max-w-2xl outline-[3px] mb-12 mx-auto">
          <span className="box-border caret-transparent outline-[3px]">
            Don&#39;t wait for an emergency to realize you&#39;re unprepared.
            Join our next training session and gain the confidence to protect
            yourself and others.
          </span>
        </p>
        <button className="text-white text-xl font-bold bg-amber-600 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(217,130,43,0.4)_0px_25px_50px_-12px] caret-transparent leading-7 outline-[3px] px-12 py-5 rounded-full hover:bg-amber-600/90">
          Book Your Course Now
        </button>
      </div>
    </section>
  );
};
