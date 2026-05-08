import { SectionHeader } from "@/components/SectionHeader";
import { TestimonialCard } from "@/sections/TestimonialsSection/components/TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section className="bg-white box-border caret-transparent outline-[3px] py-24">
      <div className="box-border caret-transparent max-w-none outline-[3px] w-full mx-auto px-6 md:max-w-screen-xl">
        <SectionHeader
          containerClassName="box-border caret-transparent outline-[3px] text-center mb-16"
          eyebrowText="Student Experiences"
          eyebrowAs="p"
          title="What Our Students Say"
          titleClassName="text-4xl font-bold box-border caret-transparent leading-[45px] outline-[3px] mb-4 md:text-5xl md:leading-[48px]"
          descriptionClassName="text-gray-500 text-lg box-border caret-transparent leading-[29.25px] max-w-2xl outline-[3px] mx-auto"
          description="Real feedback from real people who trained with us. Safety skills change lives — here's proof."
        />
        <div className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] outline-[3px] gap-y-6 md:grid-cols-[repeat(3,minmax(0px,1fr))]">
          <TestimonialCard
            testimonial="“The Stop The Bleed course was eye-opening. The instructor was calm, clear, and made every skill feel achievable. I feel genuinely prepared now — not just like I sat through a class.”"
            name="Maria S."
            subtitle="South Plainfield, NJ"
            initials="MS"
            initialsVariant="text-sky-800 bg-sky-100"
            starIconUrl="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-1.svg"
            starAlt="Icon"
            rating="5"
          />
          <TestimonialCard
            testimonial="“I'd taken firearm courses elsewhere, but nothing compared to the level of detail and safety emphasis here. The NRA RSO course was thorough, practical, and worth every penny.”"
            name="James T."
            subtitle="Certified NRA Range Safety Officer"
            initials="JT"
            initialsVariant="text-amber-800 bg-amber-100"
            starIconUrl="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-1.svg"
            starAlt="Icon"
            rating="5"
          />
          <TestimonialCard
            testimonial="“We brought Safe & Secure Services in for a workplace CPR/AED training. The whole team was engaged the entire time. Three months later, they're still talking about it.”"
            name="Rachel M."
            subtitle="HR Manager, Local Business"
            initials="RM"
            initialsVariant="text-green-800 bg-green-100"
            starIconUrl="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-1.svg"
            starAlt="Icon"
            rating="5"
          />
          <TestimonialCard
            testimonial="“The NJ Permit to Carry course covered everything — use of force law, safety, range qualification. I walked out confident and fully prepared for the process. Highly recommend.”"
            name="Dave K."
            subtitle="NJ Permit to Carry Holder"
            initials="DK"
            initialsVariant="text-violet-800 bg-violet-100"
            starIconUrl="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-1.svg"
            starAlt="Icon"
            rating="5"
          />
          <TestimonialCard
            testimonial="“I took the Refuse to Be a Victim seminar with my daughter. The situational awareness skills we learned have genuinely changed how we move through the world. Invaluable.”"
            name="Linda P."
            subtitle="Parent & Community Member"
            initials="LP"
            initialsVariant="text-rose-800 text-sm font-bold items-center bg-rose-100 box-border caret-transparent flex shrink-0 h-10 justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-10 rounded-full"
            starIconUrl="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-1.svg"
            starAlt="Icon"
            rating="5"
          />
          <TestimonialCard
            testimonial="“The de-escalation training was the most realistic and scenario-based I've attended outside of the academy. Real-world situations, real techniques, real results.”"
            name="Officer C. Torres"
            subtitle="Local Law Enforcement"
            initials="CT"
            initialsVariant="text-sky-800 bg-sky-100"
            starIconUrl="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-1.svg"
            starAlt="Icon"
            rating="5"
          />
        </div>
      </div>
    </section>
  );
};
