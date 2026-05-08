import { HeroBadge } from "@/sections/Hero/components/HeroBadge";
import { HeroActions } from "@/sections/Hero/components/HeroActions";

export const Hero = () => {
  return (
    <section className="box-border caret-transparent outline-[3px]">
      <section className="relative items-center bg-[url('https://c.animaapp.com/mnhhfa3v5Jwbmd/img/uploaded-asset-1775135956981-0.jpeg')] bg-no-repeat bg-cover box-border caret-transparent flex h-[1000px] min-h-[700px] outline-[3px] overflow-hidden bg-center">
        <div className="absolute box-border caret-transparent outline-[3px] z-0 inset-0">
          <div className="absolute bg-[linear-gradient(rgba(11,74,111,0.4),rgba(11,74,111,0.6),rgba(11,74,111,0.8))] box-border caret-transparent outline-[3px] inset-0"></div>
        </div>
        <div className="relative box-border caret-transparent max-w-none min-h-[auto] min-w-[auto] outline-[3px] w-full z-10 mx-auto px-6 md:max-w-screen-xl">
          <div className="box-border caret-transparent max-w-screen-md outline-[3px]">
            <HeroBadge />
            <h1 className="text-white text-2xl font-bold box-border caret-transparent leading-[26.4px] outline-[3px] mb-6 md:text-3xl md:leading-9">
              <span className="text-2xl box-border caret-transparent leading-[26.4px] outline-[3px] md:text-3xl md:leading-9">
                Be Aware.
              </span>
              <br className="text-2xl box-border caret-transparent leading-[26.4px] outline-[3px] md:text-3xl md:leading-9" />
              <span className="text-orange-300 text-2xl box-border caret-transparent leading-[26.4px] outline-[3px] md:text-3xl md:leading-9">
                Be Benchmarked.
              </span>
              <br className="text-2xl box-border caret-transparent leading-[26.4px] outline-[3px] md:text-3xl md:leading-9" />
              <span className="text-amber-600 text-2xl box-border caret-transparent leading-[26.4px] outline-[3px] md:text-3xl md:leading-9">
                Be Committed.
              </span>
            </h1>
            <p className="text-white/90 text-xl box-border caret-transparent leading-[32.5px] max-w-2xl outline-[3px] mb-10 font-roboto">
              <span className="box-border caret-transparent outline-[3px]">
                T.O.L.R.
                <sup className="relative text-[15px] box-border caret-transparent leading-[0px] outline-[3px] top-[-7.5px] align-baseline">
                  ™
                </sup>
                = Tools Of Last Resort: T.O.L.R.
                <sup className="relative text-[15px] box-border caret-transparent leading-[0px] outline-[3px] top-[-7.5px] align-baseline">
                  ™
                </sup>
                are firearms. When nothing else will work - When we are
                presented with deadly force - When it is either you, your
                family, or the &quot;bad guy&quot;. T.O.L.R.
                <sup className="relative text-[15px] box-border caret-transparent leading-[0px] outline-[3px] top-[-7.5px] align-baseline">
                  ™
                </sup>
                will prepare you to act confidently.
              </span>
            </p>
            <HeroActions />
          </div>
        </div>
        <div className="absolute text-white/50 box-border caret-transparent outline-[3px] translate-x-[-50.0%] left-2/4 bottom-10">
          <img
            src="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-5.svg"
            alt="Icon"
            className="box-border caret-transparent h-8 max-w-full outline-[3px] rotate-90 w-8"
          />
        </div>
      </section>
    </section>
  );
};
