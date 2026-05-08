import { ICON_3, ICON_4 } from "@/assets";

export const HeroContent = () => {
  return (
    <div className="box-border caret-transparent max-w-screen-md">
      <div className="items-center backdrop-blur-md bg-white/10 box-border caret-transparent gap-x-2 inline-flex gap-y-2 border mb-6 px-4 py-2 rounded-full border-solid border-white/20">
        <div className="text-amber-600 box-border caret-transparent flex min-h-[auto] min-w-[auto]">
          {[0,1,2,3,4].map((i) => (
            <img key={i} src={ICON_3} alt="Star" className="box-border caret-transparent h-3.5 w-3.5" />
          ))}
        </div>
        <span className="text-white text-xs font-bold box-border caret-transparent block tracking-[0.6px] leading-4 min-h-[auto] min-w-[auto] uppercase">
          Training available at your location or ours
        </span>
      </div>
      <h1 className="text-white text-2xl font-bold box-border caret-transparent leading-[26.4px] mb-6 font-inter md:text-3xl md:leading-9">
        <span className="text-2xl box-border caret-transparent leading-[26.4px] md:text-3xl md:leading-9">
          Be Aware.
        </span>
        <br className="text-2xl box-border caret-transparent leading-[26.4px] md:text-3xl md:leading-9" />
        <span className="text-orange-300 text-2xl box-border caret-transparent leading-[26.4px] md:text-3xl md:leading-9">
          Be Benchmarked.
        </span>
        <br className="text-2xl box-border caret-transparent leading-[26.4px] md:text-3xl md:leading-9" />
        <span className="text-amber-600 text-2xl box-border caret-transparent leading-[26.4px] md:text-3xl md:leading-9">
          Be Committed.
        </span>
      </h1>
      <p className="text-white/90 text-xl box-border caret-transparent leading-[32.5px] max-w-2xl mb-10 font-roboto">
        <span className="box-border caret-transparent">
          First Aid, CPR, AED Training. BLS certification for Professional
          Responders. Refuse To Be A Victim, Situational Awareness, and
          Deescalation training. Less Lethal Personal Defense - Pepper Spray and
          Conducted Energy Device use for civilians. Safety instruction for
          confident living.
        </span>
      </p>
      <div className="box-border caret-transparent gap-x-4 flex flex-col gap-y-4 md:flex-row">
        <button
          onClick={() => {
            const el = document.getElementById("booking-form");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          data-testid="hero-btn-book-course"
          className="text-white text-lg font-bold items-center bg-amber-600 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(217,130,43,0.3)_0px_20px_25px_-5px,rgba(217,130,43,0.3)_0px_8px_10px_-6px] caret-transparent gap-x-2 flex justify-center leading-7 min-h-[auto] min-w-[auto] gap-y-2 text-center px-10 py-4 rounded-full hover:bg-amber-600/90 transition-colors"
        >
          <span className="box-border caret-transparent block min-h-[auto] min-w-[auto]">
            Book a Course
          </span>
          <img
            src={ICON_4}
            alt="Icon"
            className="box-border caret-transparent h-5 w-5"
          />
        </button>
        <button
          onClick={() => {
            const el = document.getElementById("courses");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          data-testid="hero-btn-view-courses"
          className="text-white text-lg font-bold backdrop-blur-md bg-white/10 box-border caret-transparent leading-7 min-h-[auto] min-w-[auto] text-center border px-10 py-4 rounded-full border-solid border-white/30 hover:bg-white/20 transition-colors"
        >
          <span className="box-border caret-transparent">View Courses</span>
        </button>
      </div>
    </div>
  );
};
