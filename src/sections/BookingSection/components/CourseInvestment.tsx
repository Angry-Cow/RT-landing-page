import { CourseInvestmentList } from "@/sections/BookingSection/components/CourseInvestmentList";

export const CourseInvestment = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto]">
      <h2 className="text-sky-900 text-sm font-bold box-border caret-transparent tracking-[2.8px] leading-5 uppercase mb-4">
        Course Investment
      </h2>
      <p className="text-4xl font-bold box-border caret-transparent leading-10 mb-8 font-inter">
        Ready to Start Your Training?
      </p>
      <CourseInvestmentList />
    </div>
  );
};
