export const SafetyPolicy = () => {
  return (
    <div className="bg-rose-100 box-border caret-transparent outline-[3px] border border-amber-600/10 mt-10 p-8 rounded-3xl border-solid">
      <div className="items-center box-border caret-transparent gap-x-3 flex outline-[3px] gap-y-3 mb-4">
        <img
          src="https://c.animaapp.com/moua5fr1i7rxTv/assets/icon-14.svg"
          alt="Icon"
          className="text-amber-600 box-border caret-transparent h-6 max-w-full min-h-[auto] min-w-[auto] outline-[3px] w-6"
        />
        <h4 className="text-xl font-bold box-border caret-transparent leading-7 min-h-[auto] min-w-[auto] outline-[3px]">
          Safety First Policy
        </h4>
      </div>
      <p className="text-gray-500 box-border caret-transparent leading-[26px] outline-[3px]">
        All training requires strict adherence to safety protocols. We reserve
        the right to remove any participant who compromises the safety of the
        class.
      </p>
    </div>
  );
};
