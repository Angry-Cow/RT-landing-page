import { FooterColumns } from "@/sections/Footer/components/FooterColumns";
import { FooterMap } from "@/sections/Footer/components/FooterMap";
import { FooterBottom } from "@/sections/Footer/components/FooterBottom";

export const Footer = () => {
  return (
    <footer className="text-white bg-slate-900 box-border caret-transparent outline-[3px] pt-20">
      <div className="box-border caret-transparent max-w-none outline-[3px] w-full mx-auto px-6 md:max-w-screen-xl">
        <FooterColumns />
        <FooterMap />
        <FooterBottom />
      </div>
    </footer>
  );
};
