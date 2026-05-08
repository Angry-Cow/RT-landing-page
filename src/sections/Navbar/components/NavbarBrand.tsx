import { LOGO_URL } from "@/assets";

export const NavbarBrand = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] gap-y-3">
      <img
        src={LOGO_URL}
        alt="Safe and Secure Services"
        className="box-border caret-transparent h-20 max-w-full min-h-[auto] min-w-[auto]"
      />
      <span className="font-bold box-border caret-transparent block min-h-[auto] min-w-[auto]">
        Safe and Secure Services
      </span>
    </div>
  );
};
