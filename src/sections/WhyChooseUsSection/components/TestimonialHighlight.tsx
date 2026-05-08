export const TestimonialHighlight = () => {
  return (
    <div className="relative box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] w-auto md:w-6/12">
      <div className="relative bg-white shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.25)_0px_25px_50px_-12px] box-border caret-transparent flex flex-col justify-between min-h-[400px] outline-[3px] z-10 p-10 rounded-[40px]">
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
          <div className="box-border caret-transparent flex justify-center outline-[3px] w-full mb-6 pb-1.5">
            <video
              controls=""
              preload="metadata"
              className="aspect-square shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0.1)_0px_4px_6px_-1px,rgba(0,0,0,0.1)_0px_2px_4px_-2px] box-border caret-transparent max-w-full min-h-[auto] min-w-[auto] object-cover outline-[3px] w-[33.33%] border border-gray-100 rounded-xl border-solid"
            >
              <source
                src="https://heyboss.heeyo.ai/user-assets/mnhhfa3v5Jwbmd/why-us-video.mp4"
                type="video/mp4"
                className="text-black box-border caret-transparent leading-[normal] outline-[3px] font-times_new_roman"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="relative box-border caret-transparent outline-[3px] overflow-hidden">
            <div className="relative box-border caret-transparent outline-[3px]">
              <p className="text-2xl italic box-border caret-transparent leading-[39px] outline-[3px] mb-8 font-roboto">
                <span className="box-border caret-transparent outline-[3px]">
                  &quot;I would personally like to thank you for considering
                  Safe and Secure Services for your personal protection, defense
                  and safety needs.&quot;
                </span>
              </p>
              <div className="items-center box-border caret-transparent gap-x-4 flex outline-[3px] gap-y-4">
                <div className="text-white text-xl font-bold items-center bg-sky-900 box-border caret-transparent flex h-14 justify-center leading-7 min-h-[auto] min-w-[auto] outline-[3px] w-14 rounded-full">
                  L
                </div>
                <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px]">
                  <p className="text-lg font-bold box-border caret-transparent leading-7 outline-[3px]">
                    <span className="box-border caret-transparent outline-[3px]">
                      Larry
                    </span>
                  </p>
                  <p className="text-gray-500 text-sm box-border caret-transparent leading-5 outline-[3px]">
                    <span className="box-border caret-transparent outline-[3px]">
                      Owner &amp; Lead Instructor
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-sky-900/10 box-border caret-transparent blur-3xl h-64 outline-[3px] w-64 rounded-full -right-10 -top-10"></div>
      <div className="absolute bg-amber-600/10 box-border caret-transparent blur-3xl h-64 outline-[3px] w-64 rounded-full -left-10 -bottom-10"></div>
    </div>
  );
};
