import { SectionHeader } from "@/components/SectionHeader";
import { FaqItem } from "@/sections/FaqSection/components/FaqItem";

export const FaqSection = () => {
  return (
    <section className="box-border caret-transparent outline-[3px]">
      <section className="bg-slate-50 box-border caret-transparent outline-[3px] py-20 md:py-28">
        <div className="box-border caret-transparent max-w-screen-md outline-[3px] mx-auto px-6">
          <SectionHeader
            containerClassName="box-border caret-transparent opacity-0 outline-[3px] text-center translate-y-6 mb-12"
            eyebrowText="Got Questions?"
            eyebrowAs="span"
            title="Frequently Asked Questions"
            titleClassName="text-sky-900 text-3xl font-bold box-border caret-transparent leading-[37.5px] outline-[3px] mb-4 md:text-4xl md:leading-10"
            descriptionClassName="text-slate-500 box-border caret-transparent max-w-xl outline-[3px] mx-auto"
            description="Everything you need to know before you book. Can't find your answer here?"
            ctaText="Reach out directly."
            ctaButtonClassName="text-amber-600 font-semibold bg-transparent caret-transparent outline-[3px] underline-offset-2 p-0 hover:underline"
          />
          <div className="shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent outline-[3px] border border-slate-200 overflow-hidden rounded-2xl border-solid">
            <FaqItem
              question="Do I need a permit or ID to take a firearms safety course?"
              answer="No permit is required to enroll in our NJ Firearms Safety courses. However, per New Jersey law, a valid government-issued photo ID is required on the day of class. If you plan to apply for a Firearms Purchaser ID Card or a Permit to Purchase a Handgun after completing the course, we can walk you through exactly what documentation the NJ State Police require — just ask at check-in."
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-3-1.svg"
              iconAlt="Icon"
            />
            <FaqItem
              question="How large are your classes?"
              answer="T.O.L.R. training class sizes range from private - one on one - to group classes. We keep class sizes intentionally small — typically 6 to 12 participants — so every student gets hands-on attention from the instructor. Larger groups can be accommodated for corporate or group bookings; contact us to discuss a private session."
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-3-1.svg"
              iconAlt="Icon"
            />
            <FaqItem
              question="How long is my certification valid?"
              answer="The training itself doesn't expire in most cases. If you will be applying for a NJ Permit To Carry (PTC) you will have to take re-qualification training and re-qualify on the range every 2 years."
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-3-1.svg"
              iconAlt="Icon"
            />
            <FaqItem
              question="Are your courses accepted by the NJ State Police?"
              answer="Yes. Our NJ Permit To Carry (PTC) training course satisfies the safety-training requirement for the NJ Permit To Carry requirements set out by the state and more.  Completion certificates are issued after class via email and all necessary paperwork is provided."
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-3-1.svg"
              iconAlt="Icon"
            />
            <FaqItem
              question="What should I bring to class?"
              answer="Bring a valid photo ID, comfortable clothing you can move in, and a notepad to take notes. All training materials are provided. All training props for the hands on practical training are Non Firing - Non Handgun training replicas. There are no functional firearms or live ammunition allowed in the class room or training area at any time."
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-3-1.svg"
              iconAlt="Icon"
            />
            <FaqItem
              question="Do you offer private or corporate group training?"
              answer="Absolutely. We offer on-site and facility-based private sessions for individuals and businesses, security teams, schools, and community organizations throughout New Jersey. Group rates are available. Use the booking form above or call us directly to discuss your training or event needs, scheduling and pricing for your group."
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-3-1.svg"
              iconAlt="Icon"
            />
            <FaqItem
              question="What is your cancellation and refund policy?"
              answer="Cancellations made at least 72 hours before your scheduled class receive a full refund or free reschedule. Cancellations within 72 hours may be rescheduled once at no charge. No-shows forfeit their seat. If we ever need to cancel a class due to low enrollment or circumstances beyond our control, you'll receive a full refund and priority re-enrollment."
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-3-1.svg"
              iconAlt="Icon"
            />
          </div>
        </div>
      </section>
    </section>
  );
};
