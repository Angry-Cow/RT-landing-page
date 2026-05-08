import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/sections/ExpertiseSection/components/ServiceCard";

export const ExpertiseSection = () => {
  return (
    <section className="box-border caret-transparent outline-[3px]">
      <section className="bg-white box-border caret-transparent outline-[3px] py-24">
        <div className="box-border caret-transparent max-w-none outline-[3px] w-full mx-auto px-6 md:max-w-screen-xl">
          <SectionHeader
            containerClassName="box-border caret-transparent outline-[3px] text-center mb-16"
            eyebrowText="Our Expertise"
            eyebrowAs="p"
            title="Comprehensive Firearms Training"
            titleClassName="text-4xl font-bold box-border caret-transparent leading-[45px] outline-[3px] mb-4 md:text-5xl md:leading-[48px]"
            descriptionClassName="text-gray-500 text-lg box-border caret-transparent leading-[29.25px] max-w-screen-md outline-[3px] mx-auto"
            description={
              <>
                If you are new to firearms, or just considering if it is for you
                - T.O.L.R.
                <sup className="relative text-[13.5px] box-border caret-transparent leading-[0px] outline-[3px] top-[-6.75px] align-baseline">
                  ™
                </sup>{" "}
                will work with you from the beginning to see if it fits you. If
                it does, we help build you into a Safe, Confident, and Effective
                Defender of yourself and your family.
                <br className="box-border caret-transparent outline-[3px]" />
                <br className="box-border caret-transparent outline-[3px]" />
                If you are not new, but maybe returning or reconsidering
                firearms as a tool of last resort, T.O.L.R.
                <sup className="relative text-[13.5px] box-border caret-transparent leading-[0px] outline-[3px] top-[-6.75px] align-baseline">
                  ™
                </sup>{" "}
                will work to bring you back up to speed with the skills and
                information you need.
              </>
            }
          />
          <div className="box-border caret-transparent gap-x-8 grid grid-cols-[repeat(1,minmax(0px,1fr))] outline-[3px] gap-y-8 md:grid-cols-[repeat(4,minmax(0px,1fr))]">
            <ServiceCard
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-10.svg"
              iconAlt="Icon"
              title="Handgun Safety"
              description="T.O.L.R. = Tools of Last Resort.   What are the T.O.L.R.?  Firearms.   Handguns for self defense and protection of others"
              items={[
                "Entry Level Pistol",
                "NRA Basic Pistol",
                "Defensive Pistol",
                "NJ State Permit to Carry",
              ]}
              buttonText="Learn More"
              buttonIconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-7.svg"
              buttonIconAlt="Icon"
              imageSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/image-1.png"
              imageAlt="T.O.L.R - Tools of Last Resort"
            />
            <ServiceCard
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-6.svg"
              iconAlt="Icon"
              title="First Aid, CPR & Bleeding Control"
              description="Hands-on training for life-saving emergencies. Learn by doing. You will be ready to act quickly when every second counts."
              items={[
                "1st Aid and CPR",
                "Tourniquet Use",
                "Bleeding Control",
                "BLS Certification",
              ]}
              buttonText="Learn More"
              buttonIconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-7.svg"
              buttonIconAlt="Icon"
              imageSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/service-first-aid.png"
              imageAlt="CPR Training"
            />
            <ServiceCard
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-8.svg"
              iconAlt="Icon"
              title="Situational Awareness and Deescalation"
              description="Personal defense using escape and evasion and/or less lethal options. We have all heard Run, Hide, Fight. We must also understand the Flight, Fight, Freeze"
              items={[
                "Refuse to be a Victim",
                "Situational Awareness",
                "Realistic Deescalation",
                "For Civilians and L.E.O.",
              ]}
              buttonText="Learn More"
              buttonIconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-7.svg"
              buttonIconAlt="Icon"
              imageSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/service-awareness.png"
              imageAlt="Safe and Secure Facility"
            />
            <ServiceCard
              iconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-9.svg"
              iconAlt="Icon"
              title="Personal Protection"
              description={`Personal defense using escape and evasion and/or less lethal options. We must understand our body's "Flight, Fight, Freeze" response and learn to manage it.`}
              items={[
                "Active Shooter Response",
                "Basic Defense and Escape",
                "O.C., Sprays for Civilians",
                "Conducted Energy Devices (stun guns) for Civilians",
              ]}
              buttonText="Learn More"
              buttonIconSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-7.svg"
              buttonIconAlt="Icon"
              imageSrc="https://c.animaapp.com/moua5fr1i7rxTv/assets/service-protection.jpg"
              imageAlt="Less-Lethal Personal Defense"
            />
          </div>
        </div>
      </section>
    </section>
  );
};
