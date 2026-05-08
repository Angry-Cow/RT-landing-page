export const BookingForm = () => {
  return (
    <form className="box-border caret-transparent outline-[3px]">
      <div className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] outline-[3px] gap-y-5 md:grid-cols-[repeat(2,minmax(0px,1fr))]">
        <div className="box-border caret-transparent col-end-auto col-start-auto min-h-[auto] min-w-[auto] outline-[3px] md:col-end-[span_1] md:col-start-[span_1]">
          <label className="text-sm font-semibold box-border caret-transparent block leading-5 outline-[3px] mb-2">
            Full Name{" "}
            <span className="text-amber-600 box-border caret-transparent outline-[3px]">
              *
            </span>
          </label>
          <input
            type="text"
            name="full_name"
            placeholder="John Doe"
            value=""
            className="text-sm box-border caret-transparent h-12 leading-5 outline-transparent outline-offset-2 outline outline-2 w-full border border-gray-200 px-4 py-2 border-solid"
          />
        </div>
        <div className="box-border caret-transparent col-end-auto col-start-auto min-h-[auto] min-w-[auto] outline-[3px] md:col-end-[span_1] md:col-start-[span_1]">
          <label className="text-sm font-semibold box-border caret-transparent block leading-5 outline-[3px] mb-2">
            Email Address{" "}
            <span className="text-amber-600 box-border caret-transparent outline-[3px]">
              *
            </span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value=""
            className="text-sm box-border caret-transparent h-12 leading-5 outline-transparent outline-offset-2 outline outline-2 w-full border border-gray-200 px-4 py-2 border-solid"
          />
        </div>
        <div className="box-border caret-transparent col-end-auto col-start-auto min-h-[auto] min-w-[auto] outline-[3px] md:col-end-[span_2] md:col-start-[span_2]">
          <label className="text-sm font-semibold box-border caret-transparent block leading-5 outline-[3px] mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="(609) 000-0000"
            value=""
            className="text-sm box-border caret-transparent h-12 leading-5 outline-transparent outline-offset-2 outline outline-2 w-full border border-gray-200 px-4 py-2 border-solid"
          />
        </div>
        <div className="box-border caret-transparent col-end-auto col-start-auto min-h-[auto] min-w-[auto] outline-[3px] md:col-end-[span_2] md:col-start-[span_2]">
          <label className="text-sm font-semibold box-border caret-transparent block leading-5 outline-[3px] mb-2">
            Select Course{" "}
            <span className="text-amber-600 box-border caret-transparent outline-[3px]">
              *
            </span>
          </label>
          <div className="relative box-border caret-transparent outline-[3px]">
            <select
              name="course"
              className="appearance-none text-sm caret-transparent h-12 leading-5 outline-transparent outline-offset-2 outline outline-2 w-full border-gray-200 px-4 py-2"
            >
              <option
                value=""
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                Select a course…
              </option>
              <option
                value="Basic Handgun Introduction"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                Basic Handgun Introduction — $350
              </option>
              <option
                value="NJ Compliant (PTC) Permit To Carry"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                NJ Compliant (PTC) Permit To Carry — $600
              </option>
              <option
                value="Situational Awareness Lvl 1"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                Situational Awareness Lvl 1 — $95
              </option>
              <option
                value="De-escalation That Works"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                De-escalation That Works — $95
              </option>
              <option
                value="MACE Personal Defense Spray"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                MACE Personal Defense Spray — $125
              </option>
              <option
                value="Conducted Energy Devices"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                Conducted Energy Devices — $125
              </option>
              <option
                value="Stop The Bleed"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                Stop The Bleed — $250
              </option>
              <option
                value="ETCC Emergency Tactical Casualty Control"
                className="items-center box-border caret-transparent gap-x-[7px] min-h-6 min-w-6 outline-[3px] gap-y-[7px]"
              >
                ETCC Emergency Tactical Casualty Control — $350
              </option>
            </select>
            <img
              src="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-2.svg"
              alt="Icon"
              className="absolute text-gray-400 box-border caret-transparent h-4 outline-[3px] pointer-events-none translate-y-[-50.0%] w-4 right-3 top-2/4"
            />
          </div>
        </div>
        <div className="box-border caret-transparent col-end-auto col-start-auto min-h-[auto] min-w-[auto] outline-[3px] md:col-end-[span_2] md:col-start-[span_2]">
          <label className="text-sm font-semibold box-border caret-transparent block leading-5 outline-[3px] mb-2">
            Preferred Date
          </label>
          <textarea
            name="preferred_date"
            placeholder="Enter your preferred date(s) here"
            className="text-sm box-border caret-transparent leading-5 min-h-[100px] outline-transparent outline-offset-2 outline outline-2 resize-none w-full border-gray-200 px-4 py-3"
          ></textarea>
        </div>
        <div className="box-border caret-transparent col-end-auto col-start-auto min-h-[auto] min-w-[auto] outline-[3px] md:col-end-[span_2] md:col-start-[span_2]">
          <label className="text-sm font-semibold box-border caret-transparent block leading-5 outline-[3px] mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            placeholder="Any specific requirements or questions?"
            className="text-sm box-border caret-transparent leading-5 min-h-[100px] outline-transparent outline-offset-2 outline outline-2 resize-none w-full border-gray-200 px-4 py-3"
          ></textarea>
        </div>
      </div>
      <div className="box-border caret-transparent gap-x-3 flex justify-end outline-[3px] gap-y-3 border-gray-100 mt-6 pt-6 border-t border-solid">
        <button
          type="submit"
          className="text-white text-sm font-bold items-center bg-sky-900 shadow-[rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(0,0,0,0)_0px_0px_0px_0px,rgba(11,74,111,0.2)_0px_10px_15px_-3px,rgba(11,74,111,0.2)_0px_4px_6px_-4px] caret-transparent gap-x-2 flex h-10 justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center text-nowrap px-8 py-3 rounded-full hover:bg-sky-950"
        >
          Request Booking
        </button>
        <button
          type="button"
          className="text-gray-500 text-sm font-semibold bg-transparent caret-transparent block h-10 leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center text-nowrap border border-gray-200 px-8 py-3 rounded-full hover:text-gray-900 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
