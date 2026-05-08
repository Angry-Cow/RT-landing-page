import { FooterBrand } from "@/sections/Footer/components/FooterBrand";
import { FooterLinksColumn } from "@/sections/Footer/components/FooterLinksColumn";

export const FooterColumns = () => {
  return (
    <div className="box-border caret-transparent gap-x-12 grid grid-cols-[repeat(1,minmax(0px,1fr))] outline-[3px] gap-y-12 mb-16 md:grid-cols-[repeat(4,minmax(0px,1fr))]">
      <FooterBrand />
      <FooterLinksColumn
        title="Quick Links"
        titleAsSpan
        listClassName="text-white/60"
        itemType="link"
        items={[
          { text: "Home", href: "#home" },
          { text: "Services", href: "#services" },
          { text: "Courses", href: "#courses" },
          { text: "Pricing", href: "#pricing" },
          { text: "Contact", href: "#contact" },
        ]}
      />
      <FooterLinksColumn
        title="Legal"
        titleAsSpan
        listClassName="text-white/60"
        itemType="button"
        items={[
          { text: "Privacy Policy" },
          { text: "Terms of Service" },
          { text: "Accessibility" },
        ]}
      />
      <FooterLinksColumn
        title="Contact Us"
        listClassName="box-border caret-transparent gap-x-4 flex flex-col list-none outline-[3px] gap-y-4 pl-0"
        itemType="icon"
        items={[
          {
            text: "South Plainfield, NJ",
            iconSrc:
              "https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-4-1.svg",
            iconAlt: "Icon",
            itemClassName:
              "text-white/60 text-sm items-start box-border caret-transparent gap-x-3 flex leading-[22.75px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-3",
          },
          {
            text: "(908) 758-4894",
            href: "tel://+19087584894",
            iconSrc:
              "https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-5-1.svg",
            iconAlt: "Icon",
            itemClassName:
              "text-white/60 text-sm items-start box-border caret-transparent gap-x-3 flex leading-[22.75px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-3",
          },
          {
            text: "info@tolr.net",
            href: "mailto://info@tolr.net",
            iconSrc:
              "https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-6-1.svg",
            iconAlt: "Icon",
            itemClassName:
              "text-white/60 text-sm items-start box-border caret-transparent gap-x-3 flex leading-[22.75px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-3",
          },
          {
            text: "Mon–Sat: 8am – 7pm",
            iconSrc:
              "https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-7-1.svg",
            iconAlt: "Icon",
            itemClassName:
              "text-white/60 text-sm items-start box-border caret-transparent gap-x-3 flex leading-[22.75px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-3",
          },
        ]}
      />
    </div>
  );
};
