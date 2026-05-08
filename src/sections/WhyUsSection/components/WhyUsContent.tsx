import { WhyUsFeature } from "@/sections/WhyUsSection/components/WhyUsFeature";

export const WhyUsContent = () => {
  return (
    <div className="box-border caret-transparent min-h-[auto] min-w-[auto] w-auto md:w-6/12">
      <h2 className="text-sky-900 text-sm font-bold box-border caret-transparent tracking-[2.8px] leading-5 uppercase mb-4">
        The Difference
      </h2>
      <p className="text-4xl font-bold box-border caret-transparent leading-10 mb-8 font-inter">
        Why Choose Safe and Secure Services?
      </p>
      <div className="box-border caret-transparent">
        <WhyUsFeature
          title="Safety-First Priorities"
          description="All training begins and ends with safety. Your competence and effectiveness with lifesaving skills or situational awareness relies on that."
        />
        <WhyUsFeature
          title="Small Classes & Hands-on Practice"
          description="Personalized instruction ensures you master every skill through practical application."
          className="mt-8"
        />
        <WhyUsFeature
          title="Certified by HSI, AHA, NSC and ECSI"
          description="Our 1st Aid, CPR and AED training is authorized through national recognized organizations"
          className="mt-8"
        />
        <WhyUsFeature
          title="Training at YOUR location or ours"
          description="In nearly all cases we can bring the training to you or your group, with the exception of actual range time. That needs to happen on a range."
          className="mt-8"
        />
      </div>
    </div>
  );
};
