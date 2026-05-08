import { FeatureList } from "@/sections/WhyChooseUsSection/components/FeatureList";
import { TestimonialHighlight } from "@/sections/WhyChooseUsSection/components/TestimonialHighlight";

export const WhyChooseUsSection = () => {
  return (
    <section className="box-border caret-transparent outline-[3px]">
      <section className="bg-slate-50 box-border caret-transparent outline-[3px] overflow-hidden py-24">
        <div className="box-border caret-transparent max-w-none outline-[3px] w-full mx-auto px-6 md:max-w-screen-xl">
          <div className="items-center box-border caret-transparent gap-x-16 flex flex-col outline-[3px] gap-y-16 md:flex-row">
            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-auto md:w-6/12">
              <h2 className="text-sky-900 text-sm font-bold box-border caret-transparent tracking-[2.8px] leading-5 outline-[3px] uppercase mb-4">
                The Difference
              </h2>
              <p className="text-4xl font-bold box-border caret-transparent leading-10 outline-[3px] mb-8">
                Why Choose T.O.L.R.
                <sup className="relative text-[27px] box-border caret-transparent leading-[0px] outline-[3px] top-[-13.5px] align-baseline">
                  ™
                </sup>
                ?
              </p>
              <FeatureList />
            </div>
            <TestimonialHighlight />
          </div>
        </div>
      </section>
    </section>
  );
};
