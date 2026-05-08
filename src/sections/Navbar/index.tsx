import { Brand } from "@/sections/Navbar/components/Brand";
import { DesktopNav } from "@/sections/Navbar/components/DesktopNav";
import { MobileNavToggle } from "@/sections/Navbar/components/MobileNavToggle";
import { MobileNavMenu } from "@/sections/Navbar/components/MobileNavMenu";

export const Navbar = () => {
  return (
    <nav className="fixed bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.05)_0px_1px_2px_0px] box-border caret-transparent outline-[3px] w-full z-50 top-0">
      <div className="items-center box-border caret-transparent flex justify-between max-w-none outline-[3px] w-full mx-auto px-6 md:max-w-screen-xl">
        <Brand />
        <DesktopNav />
        <MobileNavToggle />
      </div>
      <MobileNavMenu />
    </nav>
  );
};
