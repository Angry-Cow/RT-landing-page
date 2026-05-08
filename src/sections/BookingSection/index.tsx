import { PricingList } from "@/sections/BookingSection/components/PricingList";
import { BookingForm } from "@/sections/BookingSection/components/BookingForm";
import { SafetyPolicy } from "@/sections/BookingSection/components/SafetyPolicy";

export const BookingSection = () => {
  return (
    <section className="box-border caret-transparent outline-[3px]">
      <section className="bg-white box-border caret-transparent outline-[3px] py-24">
        <div className="box-border caret-transparent max-w-none outline-[3px] w-full mx-auto px-6 md:max-w-screen-xl">
          <div className="box-border caret-transparent gap-x-16 grid grid-cols-[repeat(1,minmax(0px,1fr))] outline-[3px] gap-y-16 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
            <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
              <h2 className="text-sky-900 text-sm font-bold box-border caret-transparent tracking-[2.8px] leading-5 outline-[3px] uppercase mb-4">
                Course Investment
              </h2>
              <p className="text-4xl font-bold box-border caret-transparent leading-10 outline-[3px] mb-8">
                Ready to Start Your Training?
              </p>
              <PricingList />
            </div>
            <div className="bg-slate-50 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_20px_25px_-5px,rgba(0,0,0,0.1)_0px_8px_10px_-6px] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] border border-gray-100 p-8 rounded-[40px] border-solid md:p-12">
              <div className="box-border caret-transparent outline-[3px] mb-8">
                <h3 className="text-3xl font-bold box-border caret-transparent leading-9 outline-[3px] mb-2">
                  Book Your Course
                </h3>
                <p className="text-gray-500 box-border caret-transparent outline-[3px]">
                  Fill out the form below and we&#39;ll get back to you within
                  24 hours.
                </p>
              </div>
              <BookingForm />
              <SafetyPolicy />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
