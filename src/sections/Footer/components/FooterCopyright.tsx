export const FooterCopyright = () => {
  return (
    <div className="text-white/40 text-sm items-center box-border caret-transparent gap-x-6 flex flex-col justify-between leading-5 gap-y-6 pt-8 border-t border-solid border-white/10 md:flex-row">
      <p className="box-border caret-transparent min-h-[auto] min-w-[auto]">
        &copy; {new Date().getFullYear()} Safe and Secure Services. All rights reserved.
      </p>
    </div>
  );
};
