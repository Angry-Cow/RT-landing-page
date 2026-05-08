export const FooterMap = () => {
  return (
    <div className="box-border caret-transparent outline-[3px]">
      <h5 className="text-amber-600 font-bold box-border caret-transparent outline-[3px] mb-4">
        Find Us
      </h5>
      <div className="box-border caret-transparent h-[280px] outline-[3px] w-full border overflow-hidden rounded-2xl border-solid border-white/10">
        <iframe
          title="Safe and Secure Services location — South Plainfield, NJ"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.6783241944!2d-74.41338172347483!3d40.57760897143824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b3e7e3f5dceb%3A0x4b6ff7f3b0e5a3c4!2sSouth%20Plainfield%2C%20NJ!5e0!3m2!1sen!2sus!4v1711379200000!5m2!1sen!2sus"
          className="box-border caret-transparent invert-[0.9] hue-rotate-180 h-full outline-[3px] w-full"
        ></iframe>
      </div>
      <p className="text-white/40 text-xs box-border caret-transparent leading-4 outline-[3px] mt-2">
        Serving South Plainfield, NJ and surrounding communities. In-person and
        on-location training available.
      </p>
    </div>
  );
};
